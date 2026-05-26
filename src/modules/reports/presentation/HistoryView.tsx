"use client";

import { useEffect, useState } from "react";
import { Trash2, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useReports } from "./useReports";

export function HistoryView() {
  const { history, loadHistory, deleteHistoryItem, loading } = useReports();
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async () => {
    if (itemToDelete) {
      await deleteHistoryItem(itemToDelete);
      setItemToDelete(null);
    }
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
    <div className="flex flex-col w-full h-full min-h-[calc(100vh-100px)] p-4 sm:p-8 animate-fade-in relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-6xl w-full mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-700 mb-10 text-center sm:text-left">
          Consultas Realizadas
        </h1>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-10">
          <div className="flex flex-col sm:flex-row items-end gap-4 sm:gap-6">
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nivel de Riesgo</label>
              <select className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700">
                <option value="">Todos</option>
                <option value="Bajo">Bajo</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nombre</label>
              <input type="text" className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700 placeholder-slate-400" placeholder="Buscar vendedor..." />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Fecha registro</label>
              <input type="date" className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700" />
            </div>
            <button className="w-full sm:w-auto h-[50px] px-8 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold transition-colors shadow-md flex items-center justify-center gap-2">
              Buscar
            </button>
          </div>
        </div>

        {loading && <p className="text-center font-bold text-xl">Cargando historial...</p>}
        {!loading && (
          <div className="space-y-6 mb-12">
            {history.map((query) => (
              <div key={query.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex-1 w-full flex flex-col items-center sm:items-start gap-4">
                  <h3 className="text-2xl font-black text-slate-800">{query.name}</h3>
                  <div className={`inline-flex items-center px-4 py-2 rounded-xl border font-bold text-lg uppercase tracking-wide ${getRiskColor(query.risk)}`}>
                    Riesgo: {query.risk}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                  <button className="flex-1 sm:flex-none py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                    <Info size={20} />
                    <span className="hidden sm:inline">Ver detalle</span>
                  </button>
                  <button
                    onClick={() => setItemToDelete(query.id)}
                    className="flex-1 sm:flex-none py-3 px-6 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 size={20} />
                    <span className="hidden sm:inline">Eliminar</span>
                  </button>
                </div>
              </div>
            ))}
            {history.length === 0 && !loading && (
              <p className="text-center text-slate-500 font-medium">No hay consultas registradas en tu historial.</p>
            )}
          </div>
        )}
        {history.length > 0 && (
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-700 text-white font-bold shadow-md">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-50">
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <p className="text-center text-slate-400 mt-12 mb-8 font-medium">
          El scanner puede cometer errores. Considerar verificar los resultados
        </p>

      </div>
      {itemToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-lg w-full p-10 transform transition-all animate-scale-in text-center">

            <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={40} />
            </div>

            <h3 className="text-3xl font-extrabold text-slate-800 mb-8 leading-tight">
              ¿Desea eliminar este registro?
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDelete}
                className="w-full sm:w-1/2 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-lg shadow-lg transition-colors active:scale-95"
              >
                Confirmar
              </button>
              <button
                onClick={() => setItemToDelete(null)}
                className="w-full sm:w-1/2 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg transition-colors active:scale-95"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
