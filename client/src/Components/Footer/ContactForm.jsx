import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="contact-form">
      <h2>Contact us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;