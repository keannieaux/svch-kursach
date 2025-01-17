const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_ENDPOINTS = {
  USER: {
    LOGIN: `${API_BASE_URL}/api/users/login`,
    LOGOUT: `${API_BASE_URL}/api/users/logout`,
    REGISTRATION: `${API_BASE_URL}/api/users/registration`,
    REFRESH: `${API_BASE_URL}/api/users/refresh`,
    GET_USERS: `${API_BASE_URL}/api/users/`,
    UPDATE_ROLE: (_id) => `${API_BASE_URL}/api/users/role/${_id}`,
    UPDATE: (_id) => `${API_BASE_URL}/api/users/${_id}`, 
  },

    CATEGORY: {
        CREATE: `${API_BASE_URL}/api/categories`,
        GET_ALL: `${API_BASE_URL}/api/categories`,
        GET_ONE: (_id) => `${API_BASE_URL}/api/categories/${_id}`,
        UPDATE: (_id) => `${API_BASE_URL}/api/categories/${_id}`,
        DELETE: (_id) => `${API_BASE_URL}/api/categories/${_id}`,
    },
    PRODUCT: {
        CREATE: `${API_BASE_URL}/api/products`,
        GET_ALL: `${API_BASE_URL}/api/products`,
        GET_ONE: (_id) => `${API_BASE_URL}/api/products/${_id}`,
        UPDATE: (_id) => `${API_BASE_URL}/api/products/${_id}`,
        DELETE: (_id) => `${API_BASE_URL}/api/products/${_id}`,
    },
    CART: {
        ADD: `${API_BASE_URL}/api/carts`,
        GET_ALL: (userId) => `${API_BASE_URL}/api/carts/users/${userId}/cart`,
        REMOVE: (_id) => `${API_BASE_URL}/api/carts/${_id}`,
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
