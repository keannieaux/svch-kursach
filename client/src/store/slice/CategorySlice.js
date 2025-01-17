import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from '../../service/CategoryService';

// Асинхронные действия
export const createCategory = createAsyncThunk('category/create', async ({ name, image }, { rejectWithValue }) => {
    try {
        const response = await CategoryService.createCategory(name, image);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при создании категории");
    }
});

export const getAllCategories = createAsyncThunk('category/getAll', async (_, { rejectWithValue }) => {
    try {
        const response = await CategoryService.getAllCategories();
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при получении категорий");
    }
});

export const getCategoryById = createAsyncThunk('category/getById', async (_id, { rejectWithValue }) => {
    try {
        const response = await CategoryService.getCategoryById(_id);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при получении категории");
    }
});

export const updateCategory = createAsyncThunk('category/update', async ({ _id, name, image }, { rejectWithValue }) => {
    try {
        const response = await CategoryService.updateCategory(_id, name, image);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при обновлении категории");
    }
});

export const deleteCategory = createAsyncThunk('category/delete', async (_id, { rejectWithValue }) => {
    try {
        const response = await CategoryService.deleteCategory(_id);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при удалении категории");
    }
});

// Слайсер для управления состоянием категорий
const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        category: null,
        selectedCategoryId: null, // Добавлено поле для хранения выбранной категории
        isLoading: false,
        error: null,
    },
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setSelectedCategoryId(state, action) {
            state.selectedCategoryId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories.push(action.payload);
                state.error = null;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.category = action.payload;
                state.error = null;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = state.categories.map(category =>
                    category._id === action.payload._id ? action.payload : category
                );
                state.error = null;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = state.categories.filter(category => category._id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setLoading, setError, setSelectedCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
