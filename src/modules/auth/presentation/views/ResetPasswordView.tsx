"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";
import { Modal } from "@/modules/shared/presentation/Modal";
import { Loader } from "@/modules/shared/presentation/Loader";

export function ResetPasswordView() {
  const router = useRouter();
  const { isModalOpen, setIsModalOpen, error, setError, setSuccess, success, loading } = useGlobalContext();
  const { updatePassword } = useAuth();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .matches(/[@$!%*?&]/, "Debe contener al menos un carácter especial")
        .required("La contraseña es requerida"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Las contraseñas no coinciden")
        .required("Debes confirmar la contraseña"),
    }),
    onSubmit: async (values) => {
      const token = new URLSearchParams(window.location.search).get("token");

      const isSuccess = await updatePassword(token!, values.password);

      if (!isSuccess) return;

      formik.resetForm();
    },
  });
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
          <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-center">
            <div className="flex flex-col gap-2 w-full mb-5">
              <label className="text-white font-bold text-md self-start">
                Nueva contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white ${formik.touched.password && formik.errors.password ? 'border-2 border-red-400' : ''}`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-300 text-sm font-bold self-start">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 w-full mb-5">
              <label className="text-white font-bold text-md self-start">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-2 border-red-400' : ''}`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-300 text-sm font-bold self-start">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={loading || !formik.isValid}
              className="w-full bg-black text-white rounded-xl py-4 px-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              Actualizar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}