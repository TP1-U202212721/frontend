"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useVendorRanking } from "./useVendorRanking";
import { Vendor } from "../domain/Vendor";
import { Publication } from "../domain/Publication";

interface VendorDetailViewProps {
  vendor: Vendor | null;
  onSelectPublication: (publication: Publication) => void;
}

export function VendorDetailView({ vendor, onSelectPublication }: VendorDetailViewProps) {
  const { publications, fetchVendorPublications, clearPublications } = useVendorRanking();
  const [selectedPublication, setSelectedPublication] = useState<string | null>(null);

  useEffect(() => {
    if (vendor) {
      fetchVendorPublications(vendor.id);
    } else {
      clearPublications();
    }
  }, [vendor]);

  const handlePublicationClick = (publication: Publication) => {
    setSelectedPublication(publication.id);
    onSelectPublication(publication);
  };

  if (!vendor) {
    return (
      <div className="flex flex-col h-full bg-white rounded-xl shadow-md border border-slate-100 items-center justify-center">
        <div className="text-center text-slate-500">
          <p className="text-lg font-medium">Selecciona un vendedor</p>
          <p className="text-sm mt-1">para ver sus detalles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md border border-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-white border-b border-slate-200 p-6 sm:p-8 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{vendor.name}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-slate-600 text-xs">Calificación</p>
            <p className="font-semibold text-slate-900">⭐ {vendor.averageRating.toFixed(1)}/5</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-slate-600 text-xs">Reseñas</p>
            <p className="font-semibold text-slate-900">{vendor.totalReviews}</p>
          </div>
        </div>
      </div>

      {/* Publications Section */}
      <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6">
        <h4 className="text-sm font-semibold text-slate-700 uppercase mb-3 flex items-center gap-2">
          <span className="inline-block w-1 h-4 bg-blue-500 rounded-full"></span>
          Publicaciones
        </h4>
        
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {publications.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">No hay publicaciones disponibles</p>
          ) : (
            publications.map((publication, idx) => (
              <button
                key={publication.id}
                onClick={() => handlePublicationClick(publication)}
                className={`w-full p-3 rounded-lg transition-all duration-200 text-left text-sm ${
                  selectedPublication === publication.id
                    ? "bg-blue-50 border border-blue-400 shadow-sm"
                    : "bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 font-semibold min-w-fit text-xs">#{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate text-sm">{publication.title}</p>
                    <p className="text-xs text-slate-500 mt-1 truncate">{publication.category}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))
          )}
        </div>

        {publications.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500 text-center">
            <p>💡 Selecciona para ver reseñas</p>
          </div>
        )}
      </div>
    </div>
  );
}
