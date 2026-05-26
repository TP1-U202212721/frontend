import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";

export class AuthRepositoryImpl implements IAuthRepository {
  login(email: string, password: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "1", email, name: "Usuario Prueba" });
      }, 500);
    });
  }
  async loginWithGoogle(email: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "1", email, name: "Usuario Prueba" });
      }, 500);
    });
  }

  async register(email: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "3", email, name: "Nuevo Usuario" });
      }, 500);
    });
  }

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  async getCurrentUser(): Promise<User | null> {
    return null; // Por defecto no hay sesión
  }
}
