import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CartService from '../../service/CartService';

// Асинхронные действия (thunks) для работы с корзиной
export const addToCart = createAsyncThunk('cart/add', async ({ userId, productId, quantity, size }, { rejectWithValue }) => {
    try {
        const response = await CartService.addToCart(userId, productId, quantity, size);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при добавлении в корзину");
    }
});

export const getCartItems = createAsyncThunk('cart/getAll', async (userId, { rejectWithValue }) => {
    try {
        console.log('Fetching cart items for user:', userId); // Логирование
        const response = await CartService.getCartItems(userId);
        console.log('Fetched items:', response); // Логирование
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при получении корзины");
    }
});

export const removeFromCart = createAsyncThunk('cart/remove', async (_id, { rejectWithValue }) => {
    try {
        const response = await CartService.removeFromCart(_id);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при удалении из корзины");
    }
});

export const getAllCarts = createAsyncThunk('cart/getAllCarts', async (_, { rejectWithValue }) => {
    try {
        const response = await CartService.getAllCarts();
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при получении всех корзин");
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Обеспечим, что начальное состояние - массив
        isLoading: false,
        error: null,
    },
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                const existingItem = state.items.find(item => item._id === action.payload._id);
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity; // Обновляем количество
                } else {
                    state.items.push(action.payload); // Добавляем новый товар
                }
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = Array.isArray(action.payload.items) ? action.payload.items : []; // Извлечение массива
                state.error = null;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(item => item._id !== action.meta.arg);
                state.error = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllCarts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCarts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = Array.isArray(action.payload) ? action.payload : []; // Извлечение массива
                state.error = null;
            })
            .addCase(getAllCarts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setLoading, setError } = cartSlice.actions;

export default cartSlice.reducer;
