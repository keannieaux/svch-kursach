import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuestHeader from './guestheader';
import UserHeader from './userheader';
import AdminHeader from './adminheader';
import { checkAuth } from '../../store/slice/authSlice';
import './headerStyle.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();
    const { isAuth, user, isLoading } = useSelector(state => state.auth);

    // Добавьте соответствующие идентификаторы ролей
    const CUSTOMER_ROLE_ID = 1; // ID роли "customer"
    const ADMIN_ROLE_ID = 2;    // ID роли "ADMIN"

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth());
        }
    }, [dispatch]);

    useEffect(() => {
        console.log("Current user:", user);
        console.log("Is authenticated:", isAuth);
    }, [user, isAuth]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuth) {
        return <GuestHeader isOpen={isOpen} toggle={toggle} />;
    }

    return (
        <header className="header">
            {user.roleId === CUSTOMER_ROLE_ID && <UserHeader isOpen={isOpen} toggle={toggle} />}
            {user.roleId === ADMIN_ROLE_ID && <AdminHeader isOpen={isOpen} toggle={toggle} />}
        </header>
    );
};

export default Header;
