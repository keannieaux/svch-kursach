import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class CategoryService {
    static async createCategory(name, image) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        const response = await $api.post(API_ENDPOINTS.CATEGORY.CREATE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }

    static async getAllCategories() {
        const response = await $api.get(API_ENDPOINTS.CATEGORY.GET_ALL);
        console.log('Категории из сервиса:', response.data); // Логируем полученные данные
        return response.data;
    }

    static async getCategoryById(_id) {
        const response = await $api.get(API_ENDPOINTS.CATEGORY.GET_ONE(_id));
        return response.data;
    }

    static async updateCategory(_id, formData) {
        const response = await $api.put(API_ENDPOINTS.CATEGORY.UPDATE(_id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }

    static async deleteCategory(_id) {
        const response = await $api.delete(API_ENDPOINTS.CATEGORY.DELETE(_id));
        return response.data;
    }
}
