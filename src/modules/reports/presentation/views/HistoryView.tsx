"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";
import { Modal } from "@/modules/shared/presentation/Modal";
import { Reason } from "../../domain/Report";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRiskAnalysis } from "@/modules/riskAnalysis/presentation/hooks/useRiskAnalysis";
import { useReports } from "../hooks/useReports";
import { useProfile } from "@/modules/profile/presentation/hooks/useProfile";

export function HistoryView() {
  const {
    history,
    loadHistory,
    deleteHistoryItem,
    offset,
    limit,
    date,
    riskTypeId,
    sellerName,
    setDate,
    setRiskTypeId,
    setSellerName,
  } = useReports();
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { reasons, getReasonsByInquiryResultId } = useReports();
  const { clearResult } = useRiskAnalysis();
  const { loading, error, success, isModalOpen, setSuccess, setError, setIsModalOpen } = useGlobalContext();

  const email = useMemo(() => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
      const payload: any = jwtDecode(token);
      return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    } catch {
      return null;
    }
  }, []);
  const { profile } = useProfile(email!);

  useEffect(() => {
    loadHistory({ profileId: profile?.id ?? 0 });
  }, [profile?.id]);

  const handleDelete = async (id: number) => {
    await deleteHistoryItem(id);
    setItemToDelete(null);
  };

  const handleSearch = () => {
    loadHistory({ offset: 0, limit, date, riskTypeId, sellerName, profileId: profile?.id ?? 0 });
  };

  const handlePrevPage = () => {
    if (offset === 0) return;
    const nextOffset = Math.max(offset - limit, 0);
    loadHistory({ offset: nextOffset, profileId: profile?.id ?? 0 });
  };

  const handleNextPage = () => {
    const nextOffset = offset + limit;
    loadHistory({ offset: nextOffset, profileId: profile?.id ?? 0 });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Bajo": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Moderado": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Alto": return "text-rose-600 bg-rose-50 border-rose-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const risks: { [key: number]: string } = {
    1: "Alto",
    2: "Moderado",
    3: "Bajo"
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
              <select
                value={riskTypeId ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  setRiskTypeId(value === "" ? undefined : Number(value));
                }}
                className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700"
              >
                <option value="">Todos</option>
                <option value="3">Bajo</option>
                <option value="2">Moderado</option>
                <option value="1">Alto</option>
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nombre</label>
              <input
                type="text"
                value={sellerName ?? ""}
                onChange={(event) => setSellerName(event.target.value || undefined)}
                className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700 placeholder-slate-400"
                placeholder="Nombre del vendedor"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Fecha registro</label>
              <input
                type="date"
                value={date ?? ""}
                onChange={(event) => setDate(event.target.value || undefined)}
                className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto h-[50px] px-8 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Buscar
            </button>
          </div>
        </div>
        {showDetails && reasons && error === null && (
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
                  Detalles de la evaluación
                </h2>

                <div className="bg-slate-50 rounded-2xl p-8 mb-12 border border-slate-200">
                  <ul className="space-y-6 text-xl font-bold text-slate-800 list-none pl-2">
                    {reasons.items.map((reason: Reason, idx: any) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>{reason.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="w-full sm:w-1/2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Regresar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && <p className="text-center font-bold text-xl">Cargando historial...</p>}
        {!loading && (
          <div className="space-y-6 mb-12">
            {history.map((query) => (
              <div key={query.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex-1 w-full flex flex-col items-center sm:items-start gap-4">
                  <h3 className="text-2xl font-black text-slate-800">{query.sellerName}</h3>
                  <div className={`inline-flex items-center px-4 py-2 rounded-xl border font-bold text-lg uppercase tracking-wide ${getRiskColor(risks[query.riskTypeId])}`}>
                    Riesgo: {risks[query.riskTypeId]}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                  <button
                    onClick={() => {
                      setShowDetails(true);
                      getReasonsByInquiryResultId(query.id);
                    }}
                    className="flex-1 sm:flex-none py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                  >
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
            <button
              onClick={handlePrevPage}
              disabled={offset === 0}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft size={10} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-700 text-white font-bold shadow-md">{offset / limit + 1}</button>
            <button
              onClick={handleNextPage}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-50"
            >
              <ChevronRight size={10} />
            </button>
          </div>
        )}

        <p className="text-center text-slate-400 mt-12 mb-8 font-medium">
          El scanner puede cometer errores. Considerar verificar los resultados
        </p>

      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSuccess(null);
          setError(null);
        }}
        title={error !== null ? "Ocurrió un error en la aplicación" : success!}
        description={error !== null ? error : ""}
      >
      </Modal>
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
                onClick={() => handleDelete(itemToDelete)}
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
