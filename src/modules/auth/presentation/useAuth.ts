"use client";

import { useState } from "react";
import { AuthRepositoryImpl } from "../infrastructure/AuthRepositoryImpl";
import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";

// Idealmente, esto se inyectaría usando un Contexto, pero para este módulo lo instanciamos directo o como singleton.
const authRepository: IAuthRepository = new AuthRepositoryImpl();

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await authRepository.login(email, password);
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      setError("Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const loginWithGoogle = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await authRepository.loginWithGoogle(email);
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      setError("Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const register = async (email: string) => {
    setLoading(true);
    try {
      const newUser = await authRepository.register(email);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError("Error al registrar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, loginWithGoogle, register, login };
}
