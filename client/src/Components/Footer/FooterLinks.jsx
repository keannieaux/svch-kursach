import React from 'react';
import './FooterLinks.css';

const FooterLinks = () => {
  const links = {
    'Main Links': ['Catalog', 'Categories', 'About YOUF', 'Cart'],
    'Legal': ['Terms of Sale', 'Terms of Use', 'YOUF Privacy Policy', 'CA Supply Chains Act']
  };

  return (
    <div className="footer-links">
      {Object.entries(links).map(([category, items]) => (
        <div key={category} className="link-category">
          {items.map((item) => (
            <a key={item} href="#" className="footer-link">
              {item}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;