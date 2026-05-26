"use client";

import { useRouter } from "next/navigation";
import { Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function ForgotPasswordView() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-blue-700 text-white rounded-[25px] shadow-2xl overflow-hidden p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[70vh]">
        <div className="z-10 text-center flex flex-col items-center max-w-md w-full mx-auto mt-12 sm:mt-0">

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Recuperar contraseña
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 font-bold mb-5">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {!emailSent ? (
            <>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="email" className="text-white font-bold text-md self-start">Email</label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white mb-5"
                />
              </div>

              <button
                onClick={() => setEmailSent(true)}
                className="w-full bg-black text-white rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none mb-5"
              >
                <span>Solicitar recuperación</span>
              </button>
            </>
          ) : (
            <div className="bg-white/10 p-8 rounded-2xl w-full border border-blue-400">
              <Mail size={48} className="mx-auto mb-4 text-blue-200" />
              <h3 className="text-2xl font-bold mb-2">¡Enlace enviado!</h3>
              <p className="text-blue-100 mb-6">Revisa tu bandeja de entrada o la carpeta de spam.</p>
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-black text-white rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:cursor-pointer transition-all"
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}
          <h1 className="text-white hover:text-blue-200 font-bold text-lg mb-5 transition-colors mb-5">
            ¿Ya estás registrado?
          </h1>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-black text-white rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:cursor-pointer transition-all"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
