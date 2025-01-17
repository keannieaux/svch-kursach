import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCartItems, addToCart, removeFromCart } from '../../store/slice/cartSlice';
import { addOrder } from '../../store/slice/orderSlice';
import CartProductCard from './CartProductCard';
import './CartPage.css'

const CartPage = ({ userId }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const cartStatus = useSelector((state) => state.cart.status);
    const cartError = useSelector((state) => state.cart.error);

    useEffect(() => {
        if (userId) {
            dispatch(getCartItems(userId));
        }
    }, [userId, dispatch]);

    const handleIncreaseQuantity = (productId) => {
        const item = cartItems.find((item) => item.productId === productId);
        if (item) {
            dispatch(addToCart({ userId, productId: item.productId, quantity: item.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (productId) => {
        const item = cartItems.find((item) => item.productId === productId);
        if (item && item.quantity > 1) {
            dispatch(addToCart({ userId, productId: item.productId, quantity: item.quantity - 1 }));
        }
    };

    const handleRemoveItem = (_id) => {
        console.log("Attempting to remove cart item with ID:", _id); // Логирование
        dispatch(removeFromCart(_id));
    };

    const handlePurchase = (_id) => {
        const item = cartItems.find((item) => item.id === _id);
        if (item) {
            const orderItems = [{
                productId: item.productId,
                quantity: item.quantity,
                size: item.size
            }];
            dispatch(addOrder({ userId, items: orderItems }));
            dispatch(removeFromCart(item.id));
            window.location.reload(); 
        }
    };

    const handleCheckout = () => {
        const orderItems = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size
        }));

        dispatch(addOrder({ userId, items: orderItems }));
        orderItems.forEach(item => dispatch(removeFromCart(item.id)));
    };

    if (cartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (cartStatus === 'failed') {
        return <div>Error: {cartError}</div>;
    }

    const total = cartItems.reduce((sum, item) => {
        const price = item.Product ? parseFloat(item.Product.price) : 0;
        return sum + price * item.quantity;
    }, 0);

    return (
        <div className='jopocent'>
            <h2 style={{width: "100%", fontWeight: "bold", marginTop: "300px",textAlign: "end", marginRight: "30px", fontSize: "62px"}}>Cart</h2>
            <div className='jopocent1'>
            <div className='contcart'>
            <Row className="mt-4">
                <Col>
                    <h4>Total:</h4>
                    <h4>{total.toFixed(2)} $</h4>
                </Col>
            </Row>
            </div>
            <Container style={{marginRight: "0", display: "flex", justifyContent: "center", alignItems: "end", flexDirection: "column"}}>
            {cartItems.length === 0 ? (
                <div>Cart is empty</div>
            ) : (
                cartItems.map((item) => (
                    <CartProductCard
                        key={item.id}
                        _id={item.id}
                        name={item.Product.name || "Нет названия"}
                        price={parseFloat(item.Product.price) || 0}
                        size={item.size}
                        quantity={item.quantity}
                        image={item.Product.ProductImages?.[0]?.url || ""}
                        onIncreaseQuantity={handleIncreaseQuantity}
                        onDecreaseQuantity={handleDecreaseQuantity}
                        onRemove={handleRemoveItem}
                        onPurchase={handlePurchase}
                    />
                ))
            )}
        </Container>
            </div>
        </div>
    );
};

export default CartPage;
