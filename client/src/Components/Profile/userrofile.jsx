import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slice/authSlice';
import { updateUser } from '../../store/slice/userSlice';
import './UserProfile.css';
import profileIcon from '../../img/icon.png';
import box from '../../img/box.png';
import heart from '../../img/heart.png';
import userimg from '../../img/user.png';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [address, setAddress] = useState(user.delivery_address || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleUpdate = (field, value) => {
    const userData = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      delivery_address: field === 'delivery_address' ? value : address,
      phone_number: field === 'phone_number' ? value : phoneNumber
    };
    console.log(`Updating ${field} with value:`, userData);

    dispatch(updateUser({
      userId: user.id,
      userData
    }));
  };

  useEffect(() => {
    setAddress(user.delivery_address || '');
    setPhoneNumber(user.phone_number || '');
  }, [user.delivery_address, user.phone_number]);

  return (
    <div className='opt'>
      <div className="side-buttons">
        <button className="side-button" onClick={() => handleNavigation('/profile')}><img src={userimg} alt="Profile" /></button>
        {user.roleId === 1 && (
          <>
            <button className="side-button" onClick={() => handleNavigation('/favorites')}><img src={heart} alt="Favorites" /></button>
            <button className="side-button" onClick={() => handleNavigation('/orders')}><img src={box} alt="Orders" /></button>
          </>
        )}
        {user.roleId === 2 && (
          <button className="side-button" onClick={() => handleNavigation('/admin')}><img src={box} alt="Admin" /></button>
        )}
      </div>
      <div className="user-profile">
        <div className="profile-section">
          <div className='avatar-info'>
            <div className="avatar">
              <img src={profileIcon} alt="Profile" />
            </div>
            <div className="user-info">
              <p>{user.firstname} {user.lastname}</p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="input-fields">
            <label>
              Delivery address
              <div className='inputick'>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Write address here" 
                />
                <button className="checkmark" onClick={() => handleUpdate('delivery_address', address)}>✔️</button>
              </div>
            </label>
            <label>
              Phone number
              <div className='inputick'>
                <input 
                  type="text" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Write mobile number here" 
                />
                <button className="checkmark" onClick={() => handleUpdate('phone_number', phoneNumber)}>✔️</button>
              </div>
            </label>
          </div>
          <button className="logout-button" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
