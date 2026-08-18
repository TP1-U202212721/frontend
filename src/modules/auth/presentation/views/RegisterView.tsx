"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";
import { Modal } from "@/modules/shared/presentation/Modal";

export function RegisterView() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const { isModalOpen, setIsModalOpen, error, setError, setSuccess, success } = useGlobalContext();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("El nombre es requerido"),
      email: Yup.string().email("Correo inválido").required("El correo es requerido"),
      password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .matches(/[@$!%*?&]/, "Debe contener al menos un carácter especial (@$!%*?&)")
        .required("La contraseña es requerida"),
    }),
    onSubmit: async (values) => {
      const isSuccess = await register(values.email, values.password, values.fullName);

      if (!isSuccess) return;

      formik.resetForm();
    },
  });


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
        title={error ? "Ocurrió un error al registrarse" : success ? "Registro exitoso" : ""}
        description={error ? error : success ? success : ""}
      />
      <div className="max-w-2xl w-full bg-blue-700 text-white rounded-[25px] shadow-2xl overflow-hidden p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[70vh]">

        <div className="z-10 text-center flex flex-col items-center max-w-md w-full mx-auto mt-12 sm:mt-0">

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Registrate
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 font-medium mb-3">
            Accede para gestionar tu historial y protegerte de estafas digitales
          </p>

          <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-center">
            <div className="w-full space-y-4 mb-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-white font-bold text-md self-start">Nombres</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Ingrese sus nombres"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white ${formik.touched.fullName && formik.errors.fullName ? 'border-2 border-red-400' : ''}`}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-300 text-sm font-bold self-start">{formik.errors.fullName}</div>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-white font-bold text-md self-start">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-6 py-4 rounded-xl text-slate-800 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white ${formik.touched.password && formik.errors.password ? 'border-2 border-red-400' : ''}`}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-300 text-sm font-bold self-start">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
            <button type="button" className="text-white hover:text-blue-200 font-bold text-lg mb-5 transition-colors" onClick={() => router.push("/forgot-password")}>
              ¿Olvidaste tu contraseña?
            </button>

            <button
              type="submit"
              disabled={loading || !formik.isValid}
              className="w-full bg-black text-white rounded-xl flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold shadow-lg hover:cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 mb-5"
            >
              <span>Registrarse</span>
            </button>
          </form>
          <div className="text-blue-100 text-sm sm:text-base md:text-lg font-medium text-center mb-5 max-w-sm">
            Al continuar, aceptas nuestros{" "}
            <button onClick={() => router.push("/terms")} className="underline hover:text-white transition-colors text-lg">Términos de Servicio</button>
            {" "}y{" "}
            <button onClick={() => router.push("/terms")} className="underline hover:text-white transition-colors">Política de Privacidad</button>
          </div>
        </div>
      </div>
    </div>
  );
}
