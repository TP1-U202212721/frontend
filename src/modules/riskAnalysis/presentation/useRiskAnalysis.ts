"use client";

import { useState } from "react";
import { SellerRiskRepositoryImpl } from "../infrastructure/SellerRiskRepositoryImpl";
import { ISellerRiskRepository } from "../domain/ISellerRiskRepository";
import { SellerRisk } from "../domain/SellerRisk";
import { useGlobal } from "@/modules/shared/presentation/useGlobal";

const riskRepository: ISellerRiskRepository = new SellerRiskRepositoryImpl();

export function useRiskAnalysis() {
  const { loading, setLoading } = useGlobal()
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SellerRisk | null>(null);

  const evaluateRisk = async (url: string) => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const riskResult = await riskRepository.evaluateSellerRisk(url);
      setResult(riskResult);
      return riskResult;
    } catch (err) {
      console.error("Error evaluating seller risk:", err);
       setError("Error al evaluar el riesgo del vendedor. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () =>{
    setResult(null);
    setError(null);
  };

  return { loading, result, evaluateRisk, clearResult,error,setError };
}
