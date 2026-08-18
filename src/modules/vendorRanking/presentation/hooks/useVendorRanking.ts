"use client";

import { useState } from "react";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";
import { IVendorRankingRepository } from "../../domain/IVendorRankingRepository";
import { VendorRankingRepositoryImpl } from "../../infrastructure/VendorRankingRepositoryImpl";
import { Vendor } from "../../domain/Vendor";
import { Publication } from "../../domain/Publication";
import { Review } from "../../domain/Review";

const rankingRepository: IVendorRankingRepository = new VendorRankingRepositoryImpl();

export function useVendorRanking() {
  const { setLoading, setError, setIsModalOpen } = useGlobalContext();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchVendorRanking = async () => {
    setLoading(true);
    setError(null);
    try {
      const rankingData = await rankingRepository.getVendorRanking();
      setVendors(rankingData);
    } catch (err: any) {
      setError("Ocurrió un error al cargar el ranking de vendedores");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorPublications = async (vendorId: string) => {
    setLoading(true);
    setError(null);
    try {
      const publicationsData = await rankingRepository.getVendorPublications(vendorId);
      setPublications(publicationsData);
    } catch (err: any) {
      setError("Ocurrió un error al cargar las publicaciones");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchPublicationReviews = async (publicationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const reviewsData = await rankingRepository.getPublicationReviews(publicationId);
      setReviews(reviewsData);
    } catch (err: any) {
      setError("Ocurrió un error al cargar las reseñas");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const clearPublications = () => {
    setPublications([]);
  };

  const clearReviews = () => {
    setReviews([]);
  };

  return {
    vendors,
    publications,
    reviews,
    fetchVendorRanking,
    fetchVendorPublications,
    fetchPublicationReviews,
    clearPublications,
    clearReviews,
  };
}
