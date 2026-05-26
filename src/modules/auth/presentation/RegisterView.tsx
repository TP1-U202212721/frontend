"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { useState } from "react";

export function RegisterView() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    await register(email || "test@test.com");
    router.push("/");
  };


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-blue-700 text-white rounded-[25px] shadow-2xl overflow-hidden p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[70vh]">

        <div className="z-10 text-center flex flex-col items-center max-w-md w-full mx-auto mt-12 sm:mt-0">

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Registrate
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 font-medium mb-3">
            Accede para gestionar tu historial y protegerte de estafas digitales
          </p>

          <div className="w-full space-y-4 mb-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-white font-bold text-md self-start">Nombres</label>
              <input
                type="text"
                placeholder="Ingrese sus nombres"
                className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white font-bold text-md self-start">Email</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white font-bold text-md self-start">Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white"
              />
            </div>
          </div>
          <button className="text-white hover:text-blue-200 font-bold text-lg mb-5 transition-colors" onClick={() => router.push("/forgot-password")}>
            ¿Olvidaste tu contraseña?
          </button>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-black text-white rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 mb-5"
          >
            <span>Registrarse</span>
          </button>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg font-medium text-center mb-5 max-w-sm">
            Al continuar, aceptas nuestros{" "}
            <button onClick={() => router.push("/terms")} className="underline hover:text-white transition-colors text-lg">Términos de Servicio</button>
            {" "}y{" "}
            <button onClick={() => router.push("/terms")} className="underline hover:text-white transition-colors">Política de Privacidad</button>
          </p>
        </div>
      </div>
    </div>
  );
}
