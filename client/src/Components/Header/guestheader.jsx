import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './headerStyle.css';

const GuestHeader = ({ isOpen, toggle }) => {
    return (
        <div className='navich'>
        <Navbar expand="md" className="navbar-dark">
            <NavbarBrand className="header__logo" href="/">
                YOUF!
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to="/catalog" className="nav-link font">Catalog</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/categories" className="nav-link font">Categories</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/about" className="nav-link font">About us</Link>
                    </NavItem>
                </Nav>
                <div className="header__actions">
                    <Link to="/login" className="btn btn-primary custom-button">Log in</Link>
                    <Link to="/registration" className="btn btn-primary custom-button regist">Registration</Link>
                </div>
            </Collapse>
        </Navbar>
        </div>
    );
};

export default GuestHeader;
