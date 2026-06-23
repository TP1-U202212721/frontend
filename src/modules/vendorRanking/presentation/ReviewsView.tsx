"use client";

import { useEffect } from "react";
import { Star, Calendar } from "lucide-react";
import { useVendorRanking } from "./useVendorRanking";
import { Publication } from "../domain/Publication";

interface ReviewsViewProps {
  publication: Publication | null;
}

export function ReviewsView({ publication }: ReviewsViewProps) {
  const { reviews, fetchPublicationReviews, clearReviews } = useVendorRanking();

  useEffect(() => {
    if (publication) {
      fetchPublicationReviews(publication.id);
    } else {
      clearReviews();
    }
  }, [publication]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
          />
        ))}
      </div>
    );
  };

  if (!publication) {
    return (
      <div className="flex flex-col h-full bg-white rounded-xl shadow-md border border-slate-100 items-center justify-center">
        <div className="text-center text-slate-500">
          <p className="text-lg font-medium">Selecciona una publicación</p>
          <p className="text-sm mt-1">para ver reseñas</p>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md border border-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-white border-b border-slate-200 p-6 sm:p-8 shrink-0">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Reseñas y calificaciones</h3>
        <p className="text-sm text-slate-600 truncate mb-3">{publication.title}</p>
        <div className="bg-blue-50 rounded-lg p-2 inline-block">
          <p className="text-xs text-slate-600">Calificación promedio</p>
          <p className="font-semibold text-slate-900">⭐ {averageRating}/5</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <p>No hay reseñas disponibles</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div
              key={review.id}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">#{index + 1} {review.title}</h4>
                </div>
                <div className="flex-shrink-0">{renderStars(review.rating)}</div>
              </div>

              {review.date && (
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <Calendar size={12} />
                  {new Date(review.date).toLocaleDateString("es-ES")}
                </div>
              )}

              <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">{review.content}</p>
            </div>
          ))
        )}
      </div>

      {reviews.length > 0 && (
        <div className="mt-auto pt-4 px-4 sm:px-6 pb-4 sm:pb-6 border-t border-slate-200">
          <div className="text-sm text-slate-600 text-center">
            <p>Total de reseñas: <span className="font-semibold text-slate-900">{reviews.length}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
