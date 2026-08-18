"use client";
import { AuthRepositoryImpl } from "../../infrastructure/AuthRepositoryImpl";
import { IAuthRepository } from "../../domain/IAuthRepository";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";
const authRepository: IAuthRepository = new AuthRepositoryImpl();

export function useAuth() {
  const { loading, setLoading, error, setError, setIsModalOpen, setSuccess } = useGlobalContext();

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      await authRepository.login(email, password);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setIsModalOpen(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (email: string) => {
    setLoading(true);
    try {
      const loggedUser = await authRepository.loginWithGoogle(email);
      return loggedUser;
    } catch (err: any) {
      setError(err.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const changePasswordRequest = async (email: string) => {
    setLoading(true);
    try {
      const response = await authRepository.changePasswordRequest(email);
      setSuccess(response);
      setIsModalOpen(true);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsModalOpen(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (token: string, password: string) => {
    setLoading(true);
    try {
      const response = await authRepository.updatePassword(token, password);
      setSuccess(response);
      setIsModalOpen(true);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsModalOpen(true);
      return false;
    } finally {
      setLoading(false);
    }
  };


  const register = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      await authRepository.register(email, password, fullName);
      setSuccess("Usuario registrado correctamente");
      setIsModalOpen(true);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsModalOpen(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginWithGoogle, register, login, changePasswordRequest, updatePassword };
}
