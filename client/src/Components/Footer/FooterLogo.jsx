import React from 'react';
import './FooterLogo.css';

const FooterLogo = ({ icon1, icon2, icon3 }) => {
  return (
    <div className="footer-logo">
      <h1 className="logo-text">YOUF!</h1>
      <div className="social-icons">
      <div className='ico'>
      <div className="social-icon">
          <img src={icon1} alt="Social Icon 1" />
        </div>
        <div className="social-icon">
          <img src={icon2} alt="Social Icon 2" />
        </div>
        <div className="social-icon">
          <img src={icon3} alt="Social Icon 3" />
        </div>
      </div>
      <p className="copyright">© 2024 YOUF, Inc. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default FooterLogo;
