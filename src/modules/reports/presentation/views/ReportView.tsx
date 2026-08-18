"use client";
import { UploadCloud } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";
import { Modal } from "@/modules/shared/presentation/Modal";
import { useReports } from "../hooks/useReports";
import { useRef } from "react";

export function ReportView() {
  const { loading, error, success, isModalOpen, setIsModalOpen, setError, setSuccess } = useGlobalContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { submitReport } = useReports();

  const formik = useFormik({
    initialValues: {
      sellerName: "",
      publicationUrl: "",
      description: "",
      attachment: null as File | null,
    },
    validationSchema: Yup.object({
      sellerName: Yup.string().required("El nombre del vendedor es requerido"),
      publicationUrl: Yup.string().url("Debe ser una URL válida"),
      description: Yup.string().required("La descripción es requerida"),
      attachment: Yup.mixed().required("La evidencia es requerida"),
    }),
    onSubmit: async (values) => {
      await submitReport({
        email: "aljandro.jave@gmail.com",
        username: "LordMathi",
        sellerName: values.sellerName,
        publicationUrl: values.publicationUrl,
        reason: values.description,
        attachment: values.attachment || undefined,
      });
      formik.resetForm();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      formik.setFieldValue("attachment", e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center flex-1 p-6 relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-3xl w-full animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 text-center flex items-center justify-center gap-4">
          Reportar Vendedor Sospechoso
        </h1>
        <p className="text-xl text-slate-500 font-medium text-center mb-10">
          Ayúdanos a mejorar nuestros modelos y proteger a la comunidad reportando posibles estafas.
        </p>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSuccess(null);
            setError(null);
          }}
          title={error !== null ? "Ocurrió un error al enviar el reporte" : success!}
          description={error !== null ? "Debe llenar todos los campos obligatorios" : "Gracias por tu colaboración. Tu reporte nos ayuda a entrenar nuestro modelo de IA y hacer las compras digitales más seguras en el Perú."}
        />
        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-md border border-slate-200">
          <form onSubmit={formik.handleSubmit} className="space-y-8">

            <div className="flex flex-col gap-3">
              <label htmlFor="sellerName" className="text-xl font-extrabold text-slate-800 ml-2">Nombre del Vendedor / Tienda</label>
              <input
                id="sellerName"
                name="sellerName"
                type="text"
                value={formik.values.sellerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Por ejem: Vendedor 1"
                className={`w-full p-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium placeholder-slate-400 ${formik.touched.sellerName && formik.errors.sellerName ? 'border-red-400' : ''}`}
              />
              {formik.touched.sellerName && formik.errors.sellerName ? (
                <div className="text-red-500 text-sm font-bold ml-2">{formik.errors.sellerName as string}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="publicationUrl" className="text-xl font-extrabold text-slate-800 ml-2">Enlace de la publicación</label>
              <input
                id="publicationUrl"
                name="publicationUrl"
                type="text"
                value={formik.values.publicationUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Por ejem: http://mercadolibre.com.pe/iphone17"
                className={`w-full p-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium placeholder-slate-400 ${formik.touched.publicationUrl && formik.errors.publicationUrl ? 'border-red-400' : ''}`}
              />
              {formik.touched.publicationUrl && formik.errors.publicationUrl ? (
                <div className="text-red-500 text-sm font-bold ml-2">{formik.errors.publicationUrl as string}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="description" className="text-xl font-extrabold text-slate-800 ml-2">Descripción del motivo</label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Describe por qué consideras que este vendedor es sospechoso o si fuiste víctima de una estafa..."
                className={`w-full p-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium placeholder-slate-400 resize-none ${formik.touched.description && formik.errors.description ? 'border-red-400' : ''}`}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm font-bold ml-2">{formik.errors.description as string}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xl font-extrabold text-slate-800 ml-2 block">Evidencia del hecho</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  handleFileChange(e);
                  formik.setFieldTouched("attachment", true);
                }}
                style={{ display: 'none' }}
                id="attachment-input"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed ${formik.touched.attachment && formik.errors.attachment ? 'border-red-400' : 'border-slate-300'} rounded-2xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group`}
              >
                <UploadCloud size={48} className="mb-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <p className="text-lg font-bold text-center mb-2">
                  {formik.values.attachment ? `Seleccionado: ${(formik.values.attachment as File).name}` : 'Haz clic o arrastra archivos aquí'}
                </p>
                <p className="text-sm font-medium text-center">Sube capturas de pantalla, comprobantes de pago o conversaciones (Max 5MB)</p>
              </div>
              {formik.touched.attachment && formik.errors.attachment ? (
                <div className="text-red-500 text-sm font-bold ml-2">{formik.errors.attachment as string}</div>
              ) : null}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading || !formik.isValid}
                className="w-full py-5 bg-black hover:cursor-pointer text-white rounded-2xl text-xl font-black shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? "Enviando..." : <>Enviar Reporte</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
