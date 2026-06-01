"use client";

import { useState } from "react";
import { Search, ShieldAlert, ShieldCheck, Info } from "lucide-react";
import { useRiskAnalysis } from "./useRiskAnalysis";
import { useGlobal } from "@/modules/shared/presentation/useGlobal";

export function HomeView() {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, result, evaluateRisk, clearResult,error } = useRiskAnalysis();
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await evaluateRisk(searchQuery);
    setShowDetails(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Bajo": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Moderado": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Alto": return "text-rose-600 bg-rose-50 border-rose-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6 relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-4xl w-full text-center mb-12 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 leading-tight">
          Ingresa el URL de publicación de venta para estimar el riesgo
        </h1>
        <p className="text-xl sm:text-2xl text-slate-500 font-medium flex items-center justify-center gap-2">
          <Info size={24} className="text-blue-500" />
          El scanner puede cometer errores. Considerar verificar los resultados.
        </p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-2xl relative mb-16 animate-slide-up">
        <div className="relative flex items-center group">
          <input
            type="text"
            placeholder="Por ejem: http://www.mercadolibre.com.pe/ropa"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-6 pr-16 py-5 text-xl sm:text-2xl rounded-2xl border-2 border-slate-200 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-800 placeholder:text-slate-400 font-medium"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="absolute right-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Buscar"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search size={24} strokeWidth={3} />
            )}
          </button>
        </div>
      </form>
      {error !== null && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all animate-scale-in flex flex-col items-center">
            <div className="w-full relative py-6 px-8 border-b border-slate-100 flex justify-end">
              <button
                onClick={clearResult}
                className="w-12 h-12 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <span className="text-2xl font-bold leading-none">&times;</span>
              </button>
            </div>
            <div className="px-8 sm:px-12 pb-12 w-full flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center mb-10 break-all">
                Ocurrió un error
              </h2>
              <p className="text-xl font-bold text-slate-700 mb-8 text-center">
                {error}
              </p>
              <button
                onClick={() => {
                  clearResult();
                  setSearchQuery("");
                }}
                className="w-full sm:w-1/2 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      )}

      {result && !showDetails && error === null && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all animate-scale-in flex flex-col items-center">

            <div className="w-full relative py-6 px-8 border-b border-slate-100 flex justify-end">
              <button
                onClick={clearResult}
                className="w-12 h-12 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <span className="text-2xl font-bold leading-none">&times;</span>
              </button>
            </div>

            <div className="px-8 sm:px-12 pb-12 w-full flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center mb-10 break-all">
                Vendedor: {result.seller}
              </h2>

              <div className="text-center mb-12">
                <p className="text-2xl font-bold text-slate-800 mb-6">Resultado de la evaluación:</p>
                <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 ${getRiskColor(result.riskLevel)}`}>
                  {result.riskLevel === "Bajo" ? <ShieldCheck size={32} /> : <ShieldAlert size={32} />}
                  <span className="text-3xl font-black uppercase tracking-wide">
                    Riesgo: {result.riskLevel}
                  </span>
                </div>
              </div>

              <p className="text-xl font-bold text-slate-700 mb-8 text-center">
                ¿Desea ver detalle o guardar consulta?
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto">
                <button
                  onClick={() => {
                    alert("Consulta guardada en el historial!");
                    clearResult();
                    setSearchQuery("");
                  }}
                  className="w-full sm:w-1/2 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="w-full sm:w-1/2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Ver detalle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDetails && result && error === null && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all animate-scale-in flex flex-col items-center">

            <div className="w-full relative py-6 px-8 border-b border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  setShowDetails(false);
                  clearResult();
                }}
                className="w-12 h-12 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <span className="text-2xl font-bold leading-none">&times;</span>
              </button>
            </div>

            <div className="px-8 sm:px-12 pb-12 w-full">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center mb-10">
                Detalles de la estimación
              </h2>

              <div className="bg-slate-50 rounded-2xl p-8 mb-12 border border-slate-200">
                <ul className="space-y-6 text-xl font-bold text-slate-800 list-none pl-2">
                  {result.reasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto">
                <button
                  onClick={() => {
                    alert("Consulta guardada en el historial!");
                    setShowDetails(false);
                    clearResult();
                    setSearchQuery("");
                  }}
                  className="w-full sm:w-1/2 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-full sm:w-1/2 py-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
