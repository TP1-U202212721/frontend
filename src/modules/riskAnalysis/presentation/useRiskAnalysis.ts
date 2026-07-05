"use client";

import { useState } from "react";
import { SellerRiskRepositoryImpl } from "../infrastructure/SellerRiskRepositoryImpl";
import { ISellerRiskRepository } from "../domain/ISellerRiskRepository";
import { SellerRisk } from "../domain/SellerRisk";
import {  useGlobalContext } from "@/modules/shared/presentation/useGlobal";

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
    } catch (err:any) {
       setError(err.message);
       setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () =>{
    setResult(null);
    setError(null);
  };

  return {  result, evaluateRisk, clearResult};
}


