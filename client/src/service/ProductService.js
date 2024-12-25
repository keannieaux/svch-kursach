import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class ProductService {
  static async createProduct(productData) {
    const response = await $api.post(API_ENDPOINTS.PRODUCT.CREATE, productData);
    return response.data;
  }

  static async getAllProducts(page, limit, categoryId) {
    const response = await $api.get(API_ENDPOINTS.PRODUCT.GET_ALL, {
      params: { page, limit, categoryId }
    });
    return response.data;
  }

  static async getProductById(id) {
    const response = await $api.get(API_ENDPOINTS.PRODUCT.GET_ONE(id));
    return response.data;
  }

    static async updateProduct(id, productData) {
      const response = await $api.put(API_ENDPOINTS.PRODUCT.UPDATE(id), productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    }
  

  static async deleteProduct(id) {
    const response = await $api.delete(API_ENDPOINTS.PRODUCT.DELETE(id));
    return response.data;
  }
}
