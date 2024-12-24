import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../service/UserService';

export const getAllUsers = createAsyncThunk('user/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await UserService.getAllUsers();
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при получении пользователей");
  }
});

export const updateUserRole = createAsyncThunk('user/updateRole', async ({ userId, roleId }, { rejectWithValue }) => {
  try {
    const response = await UserService.updateUserRole(userId, roleId);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при обновлении роли пользователя");
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ userId, userData }, { rejectWithValue }) => {
  try {
    const response = await UserService.updateUser(userId, userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при обновлении информации о пользователе");
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: { rows: [], count: 0 },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.rows.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users.rows[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.rows.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users.rows[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;
