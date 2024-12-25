import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../../service/ProductService';

// Асинхронные действия
export const createProduct = createAsyncThunk('product/create', async (productData, { rejectWithValue }) => {
    try {
        const response = await ProductService.createProduct(productData);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при создании продукта");
    }
});

export const getAllProducts = createAsyncThunk('product/getAll', async ({ page, limit, categoryId }, { rejectWithValue }) => {
    try {
        const response = await ProductService.getAllProducts(page, limit, categoryId);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при получении продуктов");
    }
});

// Асинхронное действие для получения продукта по ID
export const getProductById = createAsyncThunk('product/getById', async (id, { rejectWithValue }) => {
  try {
    const response = await ProductService.getProductById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при получении продукта");
  }
});

export const updateProduct = createAsyncThunk('product/update', async ({ id, productData }, { rejectWithValue }) => {
    try {
        const response = await ProductService.updateProduct(id, productData);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при обновлении продукта");
    }
});

export const deleteProduct = createAsyncThunk('product/delete', async (id, { rejectWithValue }) => {
    try {
        const response = await ProductService.deleteProduct(id);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка при удалении продукта");
    }
});

// Слайсер для управления состоянием продуктов
const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: null,
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
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                );
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter(product => product.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setLoading, setError } = productSlice.actions;

export default productSlice.reducer;