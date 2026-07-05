import { api } from "@/modules/shared/infrastructure/api";
import { IAuthRepository } from "../domain/IAuthRepository";
import Cookies from "js-cookie";

export class AuthRepositoryImpl implements IAuthRepository {
  async changePasswordRequest(email: string): Promise<any> {
    const response = await api.post('/Auth/change-password', { email });
    if (!response.data.isSuccess || response.data.item === null) {
        throw new Error(response.data.message || "Error al solicitar el cambio de contraseña. Por favor, inténtalo de nuevo más tarde.");
    }
    return response.data.item;
  }
  async updatePassword(token: string, password: string): Promise<any> {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.post('/Auth/update-password', { token, password });
    if (!response.data.isSuccess || response.data.item === null) {
        throw new Error(response.data.message || "Error al actualizar la contraseña. Por favor, inténtalo de nuevo más tarde.");
    }
    return response.data.item;
  }
  async login(email: string, password: string): Promise<any> {
      const response = await api.post('/Auth/sign-in', { email, password });
        if (!response.data.isSuccess || response.data.item === null) {
            throw new Error(response.data.message || "Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
        }
        const token = response.data.item;
        Cookies.set("token", token);
  }
  async loginWithGoogle(email: string): Promise<any> {
    const response = await api.post('/Auth/sign-in-with-google', { email });
    if (!response.data.isSuccess || response.data.item === null) {
        throw new Error(response.data.message || "Error al iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.");
    }
    return response.data.item;
  }

  async register(email: string, password: string, fullName: string): Promise<any> {
    const response = await api.post('/Auth/sign-up', { email, password, fullName });
    if (!response.data.isSuccess || response.data.item === null) {
        throw new Error(response.data.message || "Error al registrarse. Por favor, inténtalo de nuevo más tarde.");
    }
    return response.data.item;
  }

}
