import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import categoryReducer from './slice/CategorySlice'; 
import productReducer from './slice/productSlice';
import cartReducer from './slice/cartSlice';
import favoriteReducer from './slice/favoriteSlice'; // Импортируем favoriteReducer
import orderReducer from './slice/orderSlice'
import userReducer from './slice/userSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer, 
        product: productReducer,
        cart: cartReducer, 
        favorite: favoriteReducer, // Добавляем favoriteReducer
        order: orderReducer, 
        user : userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
