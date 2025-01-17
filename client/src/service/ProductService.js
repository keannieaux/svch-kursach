import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class ProductService {
  static async createProduct(productData) {
    const response = await $api.post(API_ENDPOINTS.PRODUCT.CREATE, productData);
    return response.data;
  }

  static async getAllProducts(page, limit, categoryId) {
    console.log('Fetching products with params:', { page, limit, categoryId });
    const response = await $api.get(API_ENDPOINTS.PRODUCT.GET_ALL, {
      params: { page, limit, categoryId }
    });
    console.log('Response data:', response.data);
    return response.data;
  }

  static async getProductById(_id) {
    console.log('Fetching product with ID:', _id); // Логирование ID продукта
    const response = await $api.get(API_ENDPOINTS.PRODUCT.GET_ONE(_id));
    console.log('Response data for product:', response.data); // Логирование ответа сервера
    return response.data;
  }

  static async updateProduct(_id, productData) {
    const response = await $api.put(API_ENDPOINTS.PRODUCT.UPDATE(_id), productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  }

  static async deleteProduct(_id) {
    const response = await $api.delete(API_ENDPOINTS.PRODUCT.DELETE(_id));
    return response.data;
  }
}
