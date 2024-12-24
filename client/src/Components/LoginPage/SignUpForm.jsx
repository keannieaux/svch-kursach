import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registration } from '../../store/slice/authSlice';
import './AuthForms.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isRegistered } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    delivery_address: '',
    phone_number: ''
  });

  useEffect(() => {
    if (isRegistered) {
      navigate('/'); 
      window.location.reload(); 
    }
  }, [isRegistered, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registration(formData));

    if (registration.fulfilled.match(result)) {
      navigate('/'); 
      window.location.reload(); 
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className='jofix'>
        <div className="form-group">
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="delivery_address"
            placeholder="Delivery address"
            value={formData.delivery_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button1" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Create account'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </form>
  );
};

export default SignUpForm;
