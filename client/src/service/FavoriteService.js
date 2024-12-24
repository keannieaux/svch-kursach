import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

class FavoriteService {
  static async addToFavorites(userId, productId) {
    const response = await $api.post(API_ENDPOINTS.FAVORITES.ADD, { userId, productId });
    return response.data;
  }

  static async getFavorites(userId) {
    const response = await $api.get(API_ENDPOINTS.FAVORITES.GET_ALL(userId));
    return response.data;
  }

  static async removeFromFavorites(userId, productId) {
    const response = await $api.delete(API_ENDPOINTS.FAVORITES.REMOVE(userId, productId));
    return response.data;
  }
}

export default FavoriteService;
