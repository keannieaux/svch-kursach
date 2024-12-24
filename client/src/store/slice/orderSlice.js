import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from '../../service/OrderService';

export const addOrder = createAsyncThunk('order/add', async ({ userId, items }, { rejectWithValue }) => {
  try {
    const response = await OrderService.addOrder(userId, items);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при добавлении заказа");
  }
});

export const getOrders = createAsyncThunk('order/getAll', async (userId, { rejectWithValue }) => {
  try {
    const response = await OrderService.getOrders(userId);
    console.log('Fetched orders:', response);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при получении заказов");
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;
