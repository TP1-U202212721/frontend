"use client";

import { useState, useEffect } from "react";
import { ReportRepositoryImpl } from "../infrastructure/ReportRepositoryImpl";
import { IReportRepository } from "../domain/IReportRepository";
import { HistoryItem } from "../domain/Report";
import { useGlobal } from "@/modules/shared/presentation/useGlobal";

const reportRepository: IReportRepository = new ReportRepositoryImpl();

export function useReports() {
  const { loading, setLoading } = useGlobal()
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await reportRepository.getHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitReport = async (sellerName: string, platform: string, description: string) => {
    setLoading(true);
    try {
      const result = await reportRepository.submitReport({ sellerName, platform, description });
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      await reportRepository.deleteHistoryItem(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { loading, history, loadHistory, submitReport, deleteHistoryItem };
}
