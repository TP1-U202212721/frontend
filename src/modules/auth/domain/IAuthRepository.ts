
export interface IAuthRepository {
  loginWithGoogle(idToken: string): Promise<void>;
  login(email: string, password: string): Promise<any>;
  register(email: string, password: string, fullName: string): Promise<any>;
  changePasswordRequest(email: string): Promise<any>;
  updatePassword(token: string,password: string): Promise<any>;
}
