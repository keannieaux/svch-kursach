import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import './AuthForms.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      navigate('/');
      window.location.reload(); 
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <div className='jofix1'>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button1" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
