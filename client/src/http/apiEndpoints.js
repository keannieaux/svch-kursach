const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_ENDPOINTS = {
  USER: {
    LOGIN: `${API_BASE_URL}/api/users/login`,
    LOGOUT: `${API_BASE_URL}/api/users/logout`,
    REGISTRATION: `${API_BASE_URL}/api/users/registration`,
    REFRESH: `${API_BASE_URL}/api/users/refresh`,
    GET_USERS: `${API_BASE_URL}/api/users/`,
    UPDATE_ROLE: (id) => `${API_BASE_URL}/api/users/role/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/api/users/${id}`, 
  },

    CATEGORY: {
        CREATE: `${API_BASE_URL}/api/categories`,
        GET_ALL: `${API_BASE_URL}/api/categories`,
        GET_ONE: (id) => `${API_BASE_URL}/api/categories/${id}`,
        UPDATE: (id) => `${API_BASE_URL}/api/categories/${id}`,
        DELETE: (id) => `${API_BASE_URL}/api/categories/${id}`,
    },
    PRODUCT: {
        CREATE: `${API_BASE_URL}/api/products`,
        GET_ALL: `${API_BASE_URL}/api/products`,
        GET_ONE: (id) => `${API_BASE_URL}/api/products/${id}`,
        UPDATE: (id) => `${API_BASE_URL}/api/products/${id}`,
        DELETE: (id) => `${API_BASE_URL}/api/products/${id}`,
    },
    CART: {
        ADD: `${API_BASE_URL}/api/carts`,
        GET_ALL: (userId) => `${API_BASE_URL}/api/carts/users/${userId}/cart`,
        REMOVE: (id) => `${API_BASE_URL}/api/carts/${id}`,
    },
    FAVORITES: {
        ADD: `${API_BASE_URL}/api/favorites`,
        GET_ALL: (userId) => `${API_BASE_URL}/api/favorites/users/${userId}/favorites`,
        REMOVE: (userId, productId) => `${API_BASE_URL}/api/favorites/users/${userId}/products/${productId}`,
    },
    ORDER: {
        CREATE: `${API_BASE_URL}/api/orders`,
        GET_ALL: (userId) => `${API_BASE_URL}/api/orders/users/${userId}/orders`,
    }
};
