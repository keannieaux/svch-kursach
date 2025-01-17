import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class UserService {
  static async getAllUsers() {
    const response = await $api.get(API_ENDPOINTS.USER.GET_USERS);
    console.log('Received users:', response.data); // Логирование полученных данных
    return response.data;
  }

  static async updateUserRole(userId, roleId) {
    console.log(`Sending role update request for userId: ${userId} with roleId: ${roleId}`);
    const response = await $api.put(API_ENDPOINTS.USER.UPDATE_ROLE(userId), { roleId: String(roleId) });
    console.log('Role update response:', response.data);
    return response.data;
  }

  static async updateUser(userId, userData) {
    console.log("Sending data to server for updating user:", JSON.stringify(userData));
    const response = await $api.put(API_ENDPOINTS.USER.UPDATE(userId), userData);
    console.log('Update user response:', response.data);
    return response.data;
  }
}
