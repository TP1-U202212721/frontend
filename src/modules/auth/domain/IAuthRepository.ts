import { Login } from "./Login";
import { User } from "./User";

export interface IAuthRepository {
  loginWithGoogle(email: string): Promise<User>;
  login(email: string, password: string): Promise<User>;
  register(email: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
