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
        return response.data;
    }

    static async getCategoryById(id) {
        const response = await $api.get(API_ENDPOINTS.CATEGORY.GET_ONE(id));
        return response.data;
    }

    static async updateCategory(id, name, image) {
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        const response = await $api.put(API_ENDPOINTS.CATEGORY.UPDATE(id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }

    static async deleteCategory(id) {
        const response = await $api.delete(API_ENDPOINTS.CATEGORY.DELETE(id));
        return response.data;
    }
}
