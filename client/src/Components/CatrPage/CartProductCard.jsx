import React from 'react';
import './CartProductCard.css';
import imagerec from '../../img/Rectangle.png';
import { FaTrashAlt, FaChevronUp, FaChevronDown, FaShoppingCart } from 'react-icons/fa';

const CartProductCard = ({ id, name, price, size, quantity, image, onIncreaseQuantity, onDecreaseQuantity, onRemove, onPurchase }) => {
    const imageUrl = `${process.env.REACT_APP_API_BASE_URL}/static/${image}`;

    return (
        <div className="cart-product-card">
            <img src={imageUrl} alt={name} className="cart-product-image" />
            <div className='infoact'>
            <div className="cart-product-info">
                <h3 className="cart-product-name">{name}</h3>
                <img src={imagerec} alt={name} className="car-image" />
                <div className='sizezxc'>
                <p className="cart-product-size">Size:</p>
                <p className="cart-product-size">{size}</p>
                </div>
            </div>
            <div className="cart-product-actions">
            <p className="cart-product-price">{price.toFixed(2)} $</p>
                <div>
                <button className="cart-product-buy" onClick={() => onPurchase(id)}>
                    Quick Buy
                </button>
                <button className="cart-product-remove" onClick={() => onRemove(id)}>
                    <FaTrashAlt />
                </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CartProductCard;
