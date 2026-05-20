"use client";

import { useRouter } from "next/navigation";
import { Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function ForgotPasswordView() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

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
            Recuperar contraseña
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 font-medium mb-12">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {!emailSent ? (
            <>
              <div className="w-full space-y-4 mb-6">
                <input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none"
                />
              </div>

              <button 
                onClick={() => setEmailSent(true)}
                className="w-full bg-white text-slate-800 rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none"
              >
                <Mail size={24} className="text-slate-600" />
                <span>Enviar enlace de recuperación</span>
              </button>
            </>
          ) : (
            <div className="bg-white/10 p-8 rounded-2xl w-full border border-blue-400">
              <Mail size={48} className="mx-auto mb-4 text-blue-200" />
              <h3 className="text-2xl font-bold mb-2">¡Enlace enviado!</h3>
              <p className="text-blue-100 mb-6">Revisa tu bandeja de entrada o la carpeta de spam.</p>
              <button 
                onClick={() => router.push("/login")}
                className="w-full bg-white text-slate-800 rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:bg-slate-50 transition-all"
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center">
            <p className="text-blue-200 font-medium text-lg">
              ¿Recordaste tu contraseña?{" "}
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
