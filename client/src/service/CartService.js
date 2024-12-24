import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class CartService {
    static async addToCart(userId, productId, quantity, size) {
        const response = await $api.post(API_ENDPOINTS.CART.ADD, { userId, productId, quantity, size });
        return response.data;
    }

    static async getCartItems(userId) {
        console.log('Fetching cart items from API for user:', userId); // Логирование
        const response = await $api.get(API_ENDPOINTS.CART.GET_ALL(userId));
        console.log('Fetched cart items:', response.data); // Логирование
        return response.data;
    }

    static async removeFromCart(id) {
        const response = await $api.delete(API_ENDPOINTS.CART.REMOVE(id));
        return response.data;
    }
}
