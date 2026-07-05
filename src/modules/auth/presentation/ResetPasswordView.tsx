"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";
import { Modal } from "@/modules/shared/presentation/Modal";
import { Loader } from "@/modules/shared/presentation/Loader";

export function ResetPasswordView() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { updatePassword } = useAuth();
  const { isModalOpen, setIsModalOpen, error, setError, setSuccess,success, loading } =
    useGlobalContext();

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsModalOpen(true);
      return;
    }

    const token = new URLSearchParams(window.location.search).get("token");

    const isSuccess = await updatePassword(token!, password);

    if (!isSuccess) return;

    setPassword("");
    setConfirmPassword("");

  };
  if (loading) return <div className="h-screen w-full"><Loader /></div>

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSuccess(null);
          setError(null);
          if (success) {
            router.push("/login");
          }
        }}
        title={error ? "Ocurrió un error al actualizar la contraseña" : success ? "Contraseña actualizada" : ""}
        description={error ? error : success ? success : ""}
      />

      <div className="max-w-2xl w-full bg-blue-700 text-white rounded-[25px] shadow-2xl p-8 sm:p-12 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center flex flex-col items-center max-w-md w-full">

          <ShieldCheck size={48} className="text-blue-200 mb-4" />

          <h1 className="text-4xl font-extrabold mb-4">
            Nueva contraseña
          </h1>

          <p className="text-lg text-blue-100 font-medium mb-8">
            Ingresa tu nueva contraseña para actualizar tu cuenta.
          </p>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-white font-bold text-md self-start">
              Nueva contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white mb-5"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-white font-bold text-md self-start">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white mb-5"
            />
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full bg-black text-white rounded-xl py-4 px-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Actualizar contraseña
          </button>
        </div>
      </div>
    </div>
  );
}