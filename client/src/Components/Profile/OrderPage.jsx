import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';
import box from '../../img/box.png';
import heart from '../../img/heart.png';
import userimg from '../../img/user.png';
import OrderCard from './OrderCard';
import { getOrders } from '../../store/slice/orderSlice';

const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const orders = useSelector(state => state.order.orders);
  const orderError = useSelector(state => state.order.error);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getOrders(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Orders: ", orders);
  }, [orders]);

  useEffect(() => {
    console.error("Order fetch error: ", orderError);
  }, [orderError]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='opt'>
      <div className="side-buttons">
        <button className="side-button" onClick={() => handleNavigation('/profile')}><img src={userimg} alt="Profile" /></button>
        <button className="side-button" onClick={() => handleNavigation('/favorites')}><img src={heart} alt="Favorites" /></button>
        <button className="side-button" onClick={() => handleNavigation('/orders')}><img src={box} alt="Orders" /></button>
      </div>
      <div className="user-profileorder">
        <div className="profile-section">
          <div className="orders-grid">
            {orders && orders.length === 0 ? (
              <p>You have no orders.</p>
            ) : (
              orders && orders.map(order => (
                order.items.map(item => {
                  console.log("Order item data:", item);
                  return (
                    <div key={item.id} className="order-item">
                      <OrderCard
                        _id={order.id}
                        name={item.productName}
                        price={item.productPrice}
                        size={item.size || 'N/A'}
                        status={order.status}
                        images={item.productImages || []} // Проверка массива изображений
                      />
                    </div>
                  );
                })
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
