import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './AuthTabs.css';
import loginBackground from '../../img/women.png'; 
import signupBackground from '../../img/womenback.png'; 

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className='jodix'>
      <div className={`photich ${activeTab === 'signup' ? 'move-left' : ''}`} 
           style={{ backgroundImage: `url(${activeTab === 'login' ? loginBackground : signupBackground})` }}>
      </div>
      <div className={`auth-container ${activeTab === 'signup' ? 'move-right' : ''}`}>
        <div className="auth-tabs">
          <button 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Join us
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
