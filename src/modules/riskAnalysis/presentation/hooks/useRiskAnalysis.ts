"use client";

import { useState } from "react";
import { SellerRiskRepositoryImpl } from "@/modules/riskAnalysis/infrastructure/SellerRiskRepositoryImpl";
import { ISellerRiskRepository } from "@/modules/riskAnalysis/domain/ISellerRiskRepository";
import { SellerRisk } from "@/modules/riskAnalysis/domain/SellerRisk";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";

const riskRepository: ISellerRiskRepository = new SellerRiskRepositoryImpl();

export function useRiskAnalysis() {
  const { setLoading, setError, setIsModalOpen } = useGlobalContext();
  const [result, setResult] = useState<SellerRisk | null>(null);

  const evaluateRisk = async (url: string) => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const riskResult = await riskRepository.evaluateSellerRisk(url);
      setResult(riskResult);
      return riskResult;
    } catch (err: any) {
      setError(err.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return { result, evaluateRisk, clearResult };
}


