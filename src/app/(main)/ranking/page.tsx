"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Vendor } from "@/modules/vendorRanking/domain/Vendor";
import { Publication } from "@/modules/vendorRanking/domain/Publication";
import { Review } from "@/modules/vendorRanking/domain/Review";
import { useVendorRanking } from "@/modules/vendorRanking/presentation/useVendorRanking";

const ITEMS_PER_PAGE = 4;

export default function RankingPage() {
  const { vendors, publications, reviews, fetchVendorRanking, fetchVendorPublications, fetchPublicationReviews, clearPublications, clearReviews } = useVendorRanking();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [view, setView] = useState<"ranking" | "publications" | "reviews">("ranking");
  const [platformFilter, setPlatformFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [vendorPage, setVendorPage] = useState(1);
  const [publicationPage, setPublicationPage] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);

  useEffect(() => {
    fetchVendorRanking();
  }, []);

  useEffect(() => {
    if (selectedVendor && view === "publications") {
      fetchVendorPublications(selectedVendor.id);
    }
  }, [selectedVendor, view]);

  useEffect(() => {
    if (selectedPublication && view === "reviews") {
      fetchPublicationReviews(selectedPublication.id);
    }
  }, [selectedPublication, view]);

  useEffect(() => {
    setPublicationPage(1);
  }, [platformFilter, titleFilter]);

  useEffect(() => {
    setReviewPage(1);
  }, [ratingFilter]);

  const visiblePublications = useMemo(() => {
    const sourcePublications = publications;

    return sourcePublications.filter((publication) => {
      const platformMatch = platformFilter.trim()
        ? publication.category.toLowerCase().includes(platformFilter.toLowerCase())
        : true;
      const titleMatch = titleFilter.trim()
        ? publication.title.toLowerCase().includes(titleFilter.toLowerCase())
        : true;

      return platformMatch && titleMatch;
    });
  }, [publications, platformFilter, titleFilter]);

  const visibleReviews = useMemo(() => {
    const sourceReviews = reviews;

    return sourceReviews.filter((review) => {
      if (!ratingFilter.trim()) return true;
      return String(review.rating).includes(ratingFilter.trim());
    });
  }, [reviews, ratingFilter]);

  const visibleVendors = useMemo(() => {
    const startIndex = (vendorPage - 1) * ITEMS_PER_PAGE;
    return vendors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [vendors, vendorPage]);

  const vendorTotalPages = Math.max(1, Math.ceil(vendors.length / ITEMS_PER_PAGE));
  const publicationTotalPages = Math.max(1, Math.ceil(visiblePublications.length / ITEMS_PER_PAGE));
  const reviewTotalPages = Math.max(1, Math.ceil(visibleReviews.length / ITEMS_PER_PAGE));

  const paginatedPublications = useMemo(() => {
    const startIndex = (publicationPage - 1) * ITEMS_PER_PAGE;
    return visiblePublications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [visiblePublications, publicationPage]);

  const paginatedReviews = useMemo(() => {
    const startIndex = (reviewPage - 1) * ITEMS_PER_PAGE;
    return visibleReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [visibleReviews, reviewPage]);

  const handleSelectVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setSelectedPublication(null);
    clearPublications();
    clearReviews();
    setVendorPage(1);
    setPublicationPage(1);
    setReviewPage(1);
    setView("publications");
  };

  const handleSelectPublication = (publication: Publication) => {
    setSelectedPublication(publication);
    clearReviews();
    setPublicationPage(1);
    setReviewPage(1);
    setView("reviews");
  };

  const handleGoBack = () => {
    if (view === "reviews") {
      setSelectedPublication(null);
      clearReviews();
      setReviewPage(1);
      setView("publications");
      return;
    }

    if (view === "publications") {
      setSelectedVendor(null);
      setSelectedPublication(null);
      clearPublications();
      clearReviews();
      setPlatformFilter("");
      setTitleFilter("");
      setRatingFilter("");
      setVendorPage(1);
      setPublicationPage(1);
      setReviewPage(1);
      setView("ranking");
    }
  };

  const Pagination = ({ currentPage, totalPages, onPrevious, onNext, onPageSelect }: { currentPage: number; totalPages: number; onPrevious: () => void; onNext: () => void; onPageSelect: (page: number) => void; }) => {
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="h-7 w-7 rounded border border-slate-200 bg-white text-slate-400 disabled:opacity-40"
      >
        <ChevronLeft size={14} className="mx-auto" />
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageSelect(pageNumber)}
          className={`h-7 w-7 rounded text-xs font-semibold border ${currentPage === pageNumber ? "bg-blue-700 text-white border-blue-700" : "bg-white text-slate-700 border-slate-200"}`}
        >
          {pageNumber}
        </button>
      ))}
      {endPage < totalPages && <span className="px-1 text-slate-400">...</span>}
      {endPage < totalPages && <button className="h-7 min-w-7 px-1 rounded border border-slate-200 bg-white text-xs text-slate-700">{totalPages}</button>}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="h-7 w-7 rounded border border-slate-200 bg-white text-slate-400 disabled:opacity-40"
      >
        <ChevronRight size={14} className="mx-auto" />
      </button>
    </div>
    );
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "RIESGO_BAJO":
        return "text-emerald-500 bg-emerald-50 border-emerald-200";
      case "RIESGO_MODERADO":
        return "text-amber-500 bg-amber-50 border-amber-200";
      case "RIESGO_ALTO":
        return "text-rose-500 bg-rose-50 border-rose-200";
      default:
        return "text-slate-500 bg-slate-50 border-slate-200";
    }
  };

  const getSelectionMeta = () => {
    if (view === "publications") {
      return {
        label: "Vendedor seleccionado",
        value: selectedVendor?.name ?? "Sin vendedor seleccionado",
      };
    }

    if (view === "reviews") {
      return {
        label: "Publicación seleccionada",
        value: selectedPublication?.title ?? "Sin publicación seleccionada",
      };
    }

    return {
      label: "Vendedores",
      value: `${vendors.length} vendedores en el ranking`,
    };
  };

  const renderSelectionHeader = () => {
    const { label, value } = getSelectionMeta();

    return (
      <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 sm:px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
          <h3 className="truncate text-lg font-bold text-slate-900">{value}</h3>
        </div>
      </div>
    );
  };

  const renderHeader = () => (
    <div className="rounded-b-[26px] bg-slate-100/80 px-6 sm:px-10 py-6 sm:py-8 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-700 mb-10 text-center sm:text-left">Ranking de vendedores</h1>
    </div>
  );

  const renderFilterCard = () => {
    if (view === "publications") {
      return (
        <div className="rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 px-5 sm:px-8 py-6">
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            {renderSelectionHeader()}
            <button
              onClick={handleGoBack}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
            >
              <ChevronLeft size={16} />
              Volver
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
            <label className="block">
              <span className="block text-lg font-semibold text-slate-700 mb-2">Plataforma</span>
              <input
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                placeholder="Por ej: Mercado Libre"
                className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700"
              />
            </label>
            <label className="block">
              <span className="block text-lg font-semibold text-slate-700 mb-2">Título</span>
              <input
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                placeholder="Título de la publicación"
                 className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700"
              />
            </label>
          </div>
        </div>
      );
    }

    if (view === "reviews") {
      return (
        <div className="rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 px-5 sm:px-8 py-6">
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            {renderSelectionHeader()}
            <button
              onClick={handleGoBack}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
            >
              <ChevronLeft size={16} />
              Volver
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end">
            <label className="block w-full">
              <span className="block text-lg font-semibold text-slate-700 mb-2">Calificación</span>
              <input
                type="number"
                value={ratingFilter}
                onChange={(e) => {
                  if (e.target.value === "" || (/^[1-5]$/.test(e.target.value) && Number(e.target.value) >= 1 && Number(e.target.value) <= 5)) {
                    setRatingFilter(e.target.value);
                  }
                }}
                placeholder="Ingrese un número del 1 al 5"
                className="w-full h-[50px] rounded-xl border border-slate-300 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-slate-700"
              />
            </label>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderRankingCards = () => (
    <>
      {visibleVendors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-500">
          No hay vendedores disponibles.
        </div>
      ) : (
      <div className="space-y-8">
      {visibleVendors.map((vendor) => (
        <div
          key={vendor.id}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 py-4 shadow-[0_1px_10px_rgba(15,23,42,0.03)] text-left transition-all hover:border-blue-300 hover:shadow-[0_4px_18px_rgba(15,23,42,0.08)]"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="min-w-[52px] text-3xl font-bold text-slate-900">#{vendor.rank}</div>
            <div className="flex-1 min-w-0">
              <div className="text-lg sm:text-xl font-bold text-slate-900 truncate">{vendor.name}</div>
              <div className={`mt-2 inline-flex rounded-lg border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${getRiskColor(vendor.riskLevel)}`}>
                {vendor.riskLevel === "RIESGO_BAJO" ? "RIESGO: BAJO" : vendor.riskLevel === "RIESGO_MODERADO" ? "RIESGO: MODERADO" : "RIESGO: ALTO"}
              </div>
            </div>
            <div  onClick={() => handleSelectVendor(vendor)} className="flex min-w-[120px] flex-col items-center justify-center text-right">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-bold">i</div>
              <span className="mt-1 text-[11px] font-semibold text-slate-900">Ver Publicaciones</span>
            </div>
          </div>
        </div>
      ))}
      </div>
      )}
      <Pagination
        currentPage={vendorPage}
        totalPages={vendorTotalPages}
        onPrevious={() => setVendorPage((page) => Math.max(1, page - 1))}
        onNext={() => setVendorPage((page) => Math.min(vendorTotalPages, page + 1))}
        onPageSelect={setVendorPage}
      />
    </>
  );

  const renderPublicationCards = () => (
    <>
      {paginatedPublications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-500">
          No hay publicaciones para este vendedor.
        </div>
      ) : (
      <div className="space-y-8">
      {paginatedPublications.map((publication, index) => (
        <div
          key={publication.id}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 py-4 shadow-[0_1px_10px_rgba(15,23,42,0.03)] text-left transition-all hover:border-blue-300 hover:shadow-[0_4px_18px_rgba(15,23,42,0.08)]"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="min-w-[52px] text-3xl font-bold text-slate-900">#{index + 1}</div>
            <div className="flex-1 min-w-0">
              <div className="text-lg sm:text-xl font-bold text-slate-900 truncate">{publication.title}</div>
              <div className="mt-1 text-[11px] font-semibold text-slate-700 text-ellipsis overflow-hidden whitespace-nowrap">
                Url de la publicación: {publication.url}
              </div>
            </div>
            <div onClick={() => handleSelectPublication(publication)} className="flex min-w-[120px] flex-col items-center justify-center text-right">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-bold">i</div>
              <span  className="mt-1 text-[11px] font-semibold text-slate-900">Ver reseñas</span>
            </div>
          </div>
        </div>
      ))}
      </div>
      )}
      <Pagination
        currentPage={publicationPage}
        totalPages={publicationTotalPages}
        onPrevious={() => setPublicationPage((page) => Math.max(1, page - 1))}
        onNext={() => setPublicationPage((page) => Math.min(publicationTotalPages, page + 1))}
        onPageSelect={setPublicationPage}
      />
    </>
  );

  const renderReviewCards = () => (
    <>
      {paginatedReviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-500">
          No hay reseñas para esta publicación.
        </div>
      ) : (
      <div className="space-y-8">
      {paginatedReviews.map((review: Review, index) => {
        const ratingColor = review.rating >= 4 ? "text-emerald-500" : review.rating >= 3 ? "text-orange-500" : "text-red-500";
        return (
          <div key={review.id} className="w-full rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 py-5 shadow-[0_1px_10px_rgba(15,23,42,0.03)]">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="min-w-[52px] text-3xl font-bold text-slate-900">#{index + 1}</div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{review.title}</div>
              </div>
              <div className={`min-w-[72px] text-right text-lg sm:text-xl font-extrabold ${ratingColor}`}>{review.rating}/5</div>
            </div>
          </div>
        );
      })}
      </div>
      )}
      <Pagination
        currentPage={reviewPage}
        totalPages={reviewTotalPages}
        onPrevious={() => setReviewPage((page) => Math.max(1, page - 1))}
        onNext={() => setReviewPage((page) => Math.min(reviewTotalPages, page + 1))}
        onPageSelect={setReviewPage}
      />
    </>
  );

  return (
    <div className="w-full min-h-full bg-white">
      {renderHeader()}

      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-8 max-w-[1717px] mx-auto">
        {renderFilterCard()}

        <div className="mt-12 sm:mt-14 px-2 sm:px-6">
          {view === "ranking" && renderRankingCards()}
          {view === "publications" && renderPublicationCards()}
          {view === "reviews" && renderReviewCards()}
        </div>
      </div>
    </div>
  );
}
