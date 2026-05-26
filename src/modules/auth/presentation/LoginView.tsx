"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { Mail } from "lucide-react";

export function LoginView() {
  const router = useRouter();
  const { loginWithGoogle, login, loading } = useAuth();

  const handleGoogleLogin = async () => {
    await loginWithGoogle("test@example.com");
    router.push("/");
  };

  const handleLogin = async () => {
    await login("test@example.com", "12345678");
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-blue-700 text-white rounded-[25px] shadow-2xl overflow-hidden p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[70vh]">

        <div className="z-10 text-center flex flex-col items-center max-w-md w-full mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Iniciar sesión
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 font-medium mb-12">
            Accede para gestionar tu historial y protegerte de estafas digitales
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-slate-600 rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-xl font-bold shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md mb-6 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
          >
            <Mail size={30} className="text-slate-600" />
            <span>Iniciar sesión con Google</span>
          </button>

          <div className="flex items-center w-full my-2">
            <div className="h-px bg-blue-400 flex-1"></div>
            <span className="px-4 text-blue-200 font-medium text-sm">O continúa con</span>
            <div className="h-px bg-blue-400 flex-1"></div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white font-bold text-md self-start">Email</label>
              <input
                placeholder="correo@ejemplo.com"
                type="email"
                className="w-full bg-white text-slate-800 rounded-xl flex items-center justify-center py-4 px-6 text-lg font-medium shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md mb-6 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white font-bold text-md self-start">Contraseña</label>
              <input
                placeholder="Contraseña"
                type="password"
                className="w-full bg-white text-slate-800 rounded-xl flex items-center justify-center py-4 px-6 text-lg font-medium shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md mb-6 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white rounded-xl flex items-center justify-center py-4 px-6 text-lg font-bold shadow-lg hover:cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md mb-5 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
          >
            <span>Iniciar sesión</span>
          </button>

          <button className="text-white hover:text-blue-200 font-bold text-lg mb-5 transition-colors" onClick={() => router.push("/forgot-password")}>
            ¿Olvidaste tu contraseña?
          </button>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg font-medium text-center mb-5 max-w-sm">
            Al continuar, aceptas nuestros{" "}
            <button onClick={() => router.push("/terms")} className="underline hover:text-white transition-colors text-lg">Términos de Servicio</button>
            {" "}y{" "}
            <button onClick={() => router.push("/terms")} className="underline hover:text-white transition-colors">Política de Privacidad</button>
          </p>

          <p className="text-blue-200 font-bold text-lg">
            ¿No tienes cuenta?{" "}
            <button onClick={() => router.push("/register")} className="text-white font-bold hover:text-blue-100 transition-colors text-lg">
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
