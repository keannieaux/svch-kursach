import React from 'react';
import ContactForm from './ContactForm';
import FooterLinks from './FooterLinks';
import FooterLogo from './FooterLogo';
import './Footer.css';
import icon1 from '../../img/oreo.png'
import icon2 from '../../img/you.png'
import icon3 from '../../img/youf.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <ContactForm />
        </div>
        
        <div className="footer-section">
          <FooterLinks />
        </div>

        <div className="footer-bottom">
          <FooterLogo icon1={icon1} icon2={icon2} icon3={icon3} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
