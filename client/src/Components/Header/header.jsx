import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './headerStyle.scss';
import cartIcon from '../../img/basket1.svg'; // Replace with actual filename
import profileIcon from '../../img/user1.svg'; // Replace with actual filename

const Header = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <Navbar expand="md" className="navbar-dark">
        <NavbarBrand className="header__logo" href="/">
          YOUF!
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to="/catalog" className="nav-link">Catalog</Link>
            </NavItem>
            <NavItem>
              <Link to="/categories" className="nav-link">Categories</Link>
            </NavItem>
            <NavItem>
              <Link to="/about" className="nav-link">About us</Link>
            </NavItem>
          </Nav>
          <div className="header__actions">
            {userType === 'guest' && (
              <>
                <Link to="/login" className="btn btn-primary rounded">Log in</Link>
                <Link to="/register" className="btn btn-primary rounded">Registration</Link>
              </>
            )}
            {userType === 'user' && (
              <>
                <div className="icon icon--cart">
                  <img src={cartIcon} alt="Cart" />
                </div>
                <div className="icon icon--profile">
                  <img src={profileIcon} alt="Profile" />
                </div>
              </>
            )}
            {userType === 'admin' && (
              <div className="icon icon--profile">
                <img src={profileIcon} alt="Admin Profile" />
              </div>
            )}
          </div>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
