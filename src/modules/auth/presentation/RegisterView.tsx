"use client";

import { useRouter } from "next/navigation";
import { Github, ShieldCheck, ArrowLeft } from "lucide-react";
import { useAuth } from "./useAuth";
import { useState } from "react";

export function RegisterView() {
  const router = useRouter();
  const { register, loginWithGithub, loading } = useAuth();
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    await register(email || "test@test.com");
    router.push("/");
  };

  const handleGithubRegister = async () => {
    await loginWithGithub();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-blue-700 text-white rounded-[25px] shadow-2xl overflow-hidden p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[70vh]">
        <button
          onClick={() => router.push("/login")}
          className="absolute top-8 left-8 p-2 hover:bg-blue-600 rounded-full transition-colors flex items-center gap-2"
          aria-label="Volver"
        >
          <ArrowLeft size={24} />
          <span className="hidden sm:inline font-medium">Volver</span>
        </button>

        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldCheck size={200} />
        </div>

        <div className="z-10 text-center flex flex-col items-center max-w-md w-full mx-auto mt-12 sm:mt-0">
          <div className="mb-6 flex items-center justify-center gap-3">
            <ShieldCheck size={48} className="text-blue-200" />
            <h2 className="text-3xl font-extrabold tracking-tight">ScamShield</h2>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Crear cuenta
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 font-medium mb-12">
            Únete a nosotros y protégete de estafas digitales.
          </p>

          <div className="w-full space-y-4 mb-6">
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-white text-slate-800 rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
          >
            <span>Registrarse</span>
          </button>

          <div className="flex items-center w-full my-6">
            <div className="h-px bg-blue-400 flex-1"></div>
            <span className="px-4 text-blue-200 font-medium text-sm">O regístrate con</span>
            <div className="h-px bg-blue-400 flex-1"></div>
          </div>

          <button
            onClick={handleGithubRegister}
            disabled={loading}
            className="w-full bg-white text-slate-800 rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md mb-10 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
          >
            <Github size={24} className="text-slate-900" />
            <span>Registrarse con GitHub</span>
          </button>

          <div className="mt-auto flex flex-col items-center">
            <p className="text-blue-100 text-sm sm:text-base font-medium text-center mb-8 max-w-sm">
              Al registrarte, aceptas nuestros{" "}
              <button onClick={() => router.push("/terms")} className="underline hover:text-white transition-colors">Términos de Servicio y Condiciones</button>
            </p>

            <p className="text-blue-200 font-medium text-lg">
              ¿Ya tienes cuenta?{" "}
              <button onClick={() => router.push("/login")} className="text-white font-bold underline hover:text-blue-100 transition-colors">
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
