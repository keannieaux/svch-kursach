import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FavoriteService from '../../service/FavoriteService';

export const addToFavorites = createAsyncThunk('favorite/add', async ({ userId, productId }, { rejectWithValue }) => {
  try {
    const response = await FavoriteService.addToFavorites(userId, productId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при добавлении в избранное");
  }
});

export const getFavorites = createAsyncThunk('favorite/getAll', async (userId, { rejectWithValue }) => {
  try {
    const response = await FavoriteService.getFavorites(userId);
    return response.favorites;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при получении избранного");
  }
});

export const removeFromFavorites = createAsyncThunk('favorite/remove', async ({ userId, productId }, { rejectWithValue }) => {
  try {
    await FavoriteService.removeFromFavorites(userId, productId);
    return productId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при удалении из избранного");
  }
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    items: [],
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
      .addCase(addToFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.productId !== action.payload);
        state.error = null;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setLoading, setError } = favoriteSlice.actions;

export default favoriteSlice.reducer;
