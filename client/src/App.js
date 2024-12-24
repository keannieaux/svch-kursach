import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/header';
import { checkAuth } from "./store/slice/authSlice"; 
import Loading from "./Components/Loading/loading";
import LoginComponent from './Components/LoginPage/AuthTabs';
import RegistrationPage from './Components/LoginPage/AuthTabs';
import Main from './Components/Main/main';
import Catalog from './Components/Category/categoryproduct';
import MainSection from './Components/MainSection/Section';
import ProductGrid from './Components/Product/ProductGrid';
import ProductDetail from './Components/Product/ProductDetail';
import './App.css';
import CartPage from './Components/CatrPage/CartPage';
import Profile from './Components/Profile/userrofile';
import Favorite from './Components/Profile/Favorite';
import OrdersPage from './Components/Profile/OrderPage';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import ProductManagement from './Components/AdminPanel/ProductManagment';
import UserList from './Components/AdminPanel/UserList'
import CategoryManagement from './Components/AdminPanel/CategoryManagment';

const App = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.isLoading);
    const user = useSelector(state => state.auth.user); // Получаем пользователя из состояния
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth()).finally(() => {
                setIsInitialized(true);
            });
        } else {
            setIsInitialized(true);
        }
    }, [dispatch]);

    if (!isInitialized) {
        return <Loading />;
    }

    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/products" element={<ProductGrid />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about" element={<MainSection />} />
                    <Route path="/favorites" element={<Favorite />} />
                    <Route path="/orders" element={<OrdersPage userId={user.id}/>} />
                    <Route path="/cart" element={<CartPage userId={user.id} />} /> 
                    <Route path="/admin" element={<AdminPanel />} /> 
                    <Route path="/admin/users" element={<UserList />} />
                    <Route path="/admin/products" element={<ProductManagement />} />
                    <Route path="/admin/category" element={<CategoryManagement />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
