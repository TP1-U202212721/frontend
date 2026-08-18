"use client";

import { useEffect, useState } from "react";
import { ChevronRight, TrendingDown } from "lucide-react";
import { Vendor } from "../../domain/Vendor";
import { useVendorRanking } from "../hooks/useVendorRanking";

interface RankingViewProps {
  onSelectVendor: (vendor: Vendor) => void;
}

export function RankingView({ onSelectVendor }: RankingViewProps) {
  const { vendors, fetchVendorRanking } = useVendorRanking();
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  useEffect(() => {
    fetchVendorRanking();
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "RIESGO_BAJO":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "RIESGO_MODERADO":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "RIESGO_ALTO":
        return "text-rose-600 bg-rose-50 border-rose-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "RIESGO_BAJO":
        return "RIESGO BAJO";
      case "RIESGO_MODERADO":
        return "RIESGO MODERADO";
      case "RIESGO_ALTO":
        return "RIESGO ALTO";
      default:
        return "RIESGO DESCONOCIDO";
    }
  };

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor.id);
    onSelectVendor(vendor);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md border border-slate-100">
      {/* Header */}
      <div className="bg-blue-700 text-white rounded-t-xl p-6 sm:p-8 shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Ranking de vendedores</h2>
          <p className="text-blue-100 text-sm">Ordena vendedores por nivel de riesgo</p>
        </div>
        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white rounded-full text-blue-700">
          <TrendingDown size={28} />
        </div>
      </div>

      {/* Vendors List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {vendors.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-slate-400">
            <p>No hay vendedores disponibles</p>
          </div>
        ) : (
          vendors.map((vendor) => (
            <button
              key={vendor.id}
              onClick={() => handleVendorClick(vendor)}
              className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${
                selectedVendor === vendor.id
                  ? "bg-blue-50 border-2 border-blue-500 shadow-md"
                  : "bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="text-xl font-bold text-slate-300 min-w-fit">#{vendor.rank}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">{vendor.name}</h3>
                    <div className="mt-2 inline-block">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${
                          getRiskColor(vendor.riskLevel)
                        }`}
                      >
                        {getRiskLabel(vendor.riskLevel)}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className={`flex-shrink-0 transition-transform ${
                    selectedVendor === vendor.id ? "text-blue-500" : "text-slate-400"
                  }`}
                />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
