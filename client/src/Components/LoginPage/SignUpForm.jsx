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
    password: ''
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
      <div className='jofix1'>
        <div className="form-group">
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button1" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Create account'}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
