"use client";

import { useState } from "react";
import { AlertTriangle, Send, UploadCloud, CheckCircle2 } from "lucide-react";
import { useReports } from "./useReports";

export function ReportView() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { submitReport, loading } = useReports();
  
  const [sellerName, setSellerName] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitReport(sellerName, platform, description);
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center flex-1 p-6 relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-3xl w-full animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 text-center flex items-center justify-center gap-4">
          <AlertTriangle size={40} className="text-rose-500" />
          Reportar Vendedor Sospechoso
        </h1>
        <p className="text-xl text-slate-500 font-medium text-center mb-10">
          Ayúdanos a mejorar nuestros modelos y proteger a la comunidad reportando posibles estafas.
        </p>

        {!isSubmitted ? (
          <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-md border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-3">
                <label className="text-xl font-bold text-slate-800 ml-2">Nombre del Vendedor / Tienda</label>
                <input 
                  type="text" 
                  required
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="Ej: Tienda Virtual XYZ, Vendedor123" 
                  className="w-full p-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium placeholder-slate-400"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xl font-bold text-slate-800 ml-2">Plataforma o Sitio Web</label>
                <input 
                  type="text" 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder="Ej: Facebook Marketplace, Instagram, URL de la tienda" 
                  className="w-full p-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium placeholder-slate-400"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xl font-bold text-slate-800 ml-2">Descripción del Incidente</label>
                <textarea 
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe por qué consideras que este vendedor es sospechoso o si fuiste víctima de una estafa..." 
                  className="w-full p-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium placeholder-slate-400 resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xl font-bold text-slate-800 ml-2 block">Evidencia (Opcional)</label>
                <div className="w-full border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
                  <UploadCloud size={48} className="mb-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <p className="text-lg font-bold text-center mb-2">Haz clic o arrastra archivos aquí</p>
                  <p className="text-sm font-medium text-center">Sube capturas de pantalla, comprobantes de pago o conversaciones (Max 5MB)</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xl font-black shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? "Enviando..." : <><Send size={24} /> Enviar Reporte</>}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-emerald-50 rounded-[32px] p-8 sm:p-12 shadow-md border-2 border-emerald-200 text-center animate-scale-in">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={56} className="text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-emerald-800 mb-4">¡Reporte Enviado!</h2>
            <p className="text-xl font-medium text-emerald-700 mb-8 leading-relaxed max-w-lg mx-auto">
              Gracias por tu colaboración. Tu reporte nos ayuda a entrenar nuestro modelo de IA y hacer las compras digitales más seguras en el Perú.
            </p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setSellerName("");
                setPlatform("");
                setDescription("");
              }}
              className="py-4 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-bold shadow-md transition-colors"
            >
              Enviar otro reporte
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
