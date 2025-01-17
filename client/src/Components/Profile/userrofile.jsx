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
  const user = useSelector(state => state.auth.user); // Извлечение пользователя из Redux

  const [address, setAddress] = useState(user.delivery_address || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
  const [updateError, setUpdateError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

      // Добавьте соответствующие идентификаторы ролей
      const CUSTOMER_ROLE_ID = 1; // ID роли "customer"
      const ADMIN_ROLE_ID = 2;    // ID роли "ADMIN"

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const handleUpdate = (field, value) => {
    if (field === 'phone_number' && value && !validatePhoneNumber(value)) {
      setPhoneError('Phone number is invalid');
      return;
    } else {
      setPhoneError(null);
    }

    const userData = { [field]: value };
    console.log(`Updating ${field} with value:`, userData);

    dispatch(updateUser({
      userId: user._id,
      userData
    }))
    .unwrap()
    .then(response => {
      console.log('Update user response:', response);
    })
    .catch(err => {
      console.error('Error updating user:', err);
      setUpdateError(err.message);
    });
  };

  useEffect(() => {
    setAddress(user.delivery_address || '');
    setPhoneNumber(user.phone_number || '');
  }, [user.delivery_address, user.phone_number]);

  return (
    <div className='opt'>
      <div className="side-buttons">
        <button className="side-button" onClick={() => handleNavigation('/profile')}><img src={userimg} alt="Profile" /></button>
        {user.roleId === CUSTOMER_ROLE_ID && (
          <>
            <button className="side-button" onClick={() => handleNavigation('/favorites')}><img src={heart} alt="Favorites" /></button>
            <button className="side-button" onClick={() => handleNavigation('/orders')}><img src={box} alt="Orders" /></button>
          </>
        )}
        {user.roleId === ADMIN_ROLE_ID && (
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
                  placeholder={user.delivery_address || "Write address here"} 
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
                  placeholder={user.phone_number || "Write mobile number here"}
                />
                <button className="checkmark" onClick={() => handleUpdate('phone_number', phoneNumber)}>✔️</button>
              </div>
              {phoneError && <p className="error-message">{phoneError}</p>}
            </label>
          </div>
          {updateError && <p className="error-message">{updateError}</p>}
          <button className="logout-button" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
