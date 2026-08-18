"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Modal } from "@/modules/shared/presentation/Modal";
import { Loader } from "@/modules/shared/presentation/Loader";
import { useAuth } from "../hooks/useAuth";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";

export function ForgotPasswordView() {
  const router = useRouter();
  const { isModalOpen, setIsModalOpen, error, setError, setSuccess, success, loading } = useGlobalContext();
  const { changePasswordRequest } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Correo inválido").required("El correo es requerido"),
    }),
    onSubmit: async (values) => {
      const isSuccess = await changePasswordRequest(values.email);

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
          setIsModalOpen(false)
          setSuccess(null);
          setError(null);
          if (success) {
            router.push("/login");
          }

        }}
        title={error ? "Ocurrió un error al solicitar el cambio de contraseña" : "Solicitud de cambio de contraseña exitosa"}
        description={error ? error : success ? success : ""}
      />
      <div className="max-w-2xl w-full bg-blue-700 text-white rounded-[25px] shadow-2xl overflow-hidden p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[70vh]">
        <div className="z-10 text-center flex flex-col items-center max-w-md w-full mx-auto mt-12 sm:mt-0">

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Recuperar contraseña
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 font-bold mb-5">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
          <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-center">
            <div className="flex flex-col gap-2 w-full mb-5">
              <label htmlFor="email" className="text-white font-bold text-md self-start">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white ${formik.touched.email && formik.errors.email ? 'border-2 border-red-400' : ''}`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-300 text-sm font-bold self-start">{formik.errors.email}</div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={loading || !formik.isValid}
              className="w-full bg-black text-white rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none mb-5 disabled:opacity-50"
            >
              <span>Solicitar recuperación</span>
            </button>
          </form>
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
