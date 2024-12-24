import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

class OrderService {
  static async addOrder(userId, items) {
    const response = await $api.post(API_ENDPOINTS.ORDER.CREATE, { userId, items });
    return response.data;
  }

  static async getOrders(userId) {
    const response = await $api.get(API_ENDPOINTS.ORDER.GET_ALL(userId));
    return response.data;
  }
}

export default OrderService;
