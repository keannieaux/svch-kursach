import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './headerStyle.css';
import profileIcon from '../../img/user1.svg';

const AdminHeader = ({ isOpen, toggle }) => {
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
                    <div className="icon icon--profile">
                    <Link to="/profile">
                        <img src={profileIcon} alt="Profile" />
                        </Link>
                    </div>
                </div>
            </Collapse>
        </Navbar>
        </div>
    );
};

export default AdminHeader;
