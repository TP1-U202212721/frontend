"use client";

import { useState } from "react";
import { SellerRiskRepositoryImpl } from "../infrastructure/SellerRiskRepositoryImpl";
import { ISellerRiskRepository } from "../domain/ISellerRiskRepository";
import { SellerRisk } from "../domain/SellerRisk";
import { useGlobal } from "@/modules/shared/presentation/useGlobal";

const riskRepository: ISellerRiskRepository = new SellerRiskRepositoryImpl();

export function useRiskAnalysis() {
  const { loading, setLoading } = useGlobal()
  const [result, setResult] = useState<SellerRisk | null>(null);

  const evaluateRisk = async (sellerName: string) => {
    if (!sellerName.trim()) return;
    setLoading(true);
    try {
      const riskResult = await riskRepository.evaluateSellerRisk(sellerName);
      setResult(riskResult);
      return riskResult;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => setResult(null);

  return { loading, result, evaluateRisk, clearResult };
}
