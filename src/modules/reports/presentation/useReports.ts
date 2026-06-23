"use client";
import { useState } from "react";
import { ReportRepositoryImpl } from "../infrastructure/ReportRepositoryImpl";
import { IReportRepository } from "../domain/IReportRepository";
import { HistoryItem, ReasonResponseWrapper, Report } from "../domain/Report";
import { useGlobalContext } from "@/modules/shared/presentation/useGlobal";
import { formatDate } from "@/helpers/common";

const reportRepository: IReportRepository = new ReportRepositoryImpl();

export function useReports() {
  const { setLoading, setError, setIsModalOpen, setSuccess} = useGlobalContext();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState<string | undefined>(undefined);
  const [riskTypeId, setRiskTypeId] = useState<number | undefined>(undefined);
  const [sellerName, setSellerName] = useState<string | undefined>(undefined);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [reasons, setReasons] = useState<ReasonResponseWrapper>({ items: [] });

  const loadHistory = async (options?: {
    offset?: number;
    limit?: number;
    date?: string;
    riskTypeId?: number;
    sellerName?: string;
  }) => {
    const nextOffset = options?.offset ?? offset;
    const nextLimit = options?.limit ?? limit;
    const nextDate = options?.date ?? date;
    const nextRiskTypeId = options?.riskTypeId ?? riskTypeId;
    const nextSellerName = options?.sellerName ?? sellerName;

    if (options?.offset !== undefined) setOffset(options.offset);
    if (options?.limit !== undefined) setLimit(options.limit);
    if (options?.date !== undefined) setDate(options.date);
    if (options?.riskTypeId !== undefined) setRiskTypeId(options.riskTypeId);
    if (options?.sellerName !== undefined) setSellerName(options.sellerName);

    setLoading(true);
    try {
      const data = await reportRepository.getHistory(
        nextOffset,
        nextLimit,
        formatDate(nextDate),
        nextRiskTypeId,
        nextSellerName
      );
      setHistory(data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getReasonsByInquiryResultId = async (inquiryResultId: number) => {
    setLoading(true);
    try {
      const data = await reportRepository.getReasonsByInquiryResultId(inquiryResultId);
      setReasons(data);
      return data;
    } catch (err:any) {
      setError(err.message);
      setReasons({ items: [] });
      return [];
    } finally {
      setLoading(false);
    }
  }

  const submitReport = async (report:Report) => {
    setLoading(true);
    try {
      const result = await reportRepository.submitReport(report);
      return result;
    } catch (err:any) {
      setError(err.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const createInquiryResult = async (payload: any) => {
    setLoading(true);
    try {
      const result = await reportRepository.createInquiryResult(payload);
      setSuccess("Consulta guardada exitosamente");
      setIsModalOpen(true);
      return result;
    } catch (err:any) {
      setError(err?.message ?? "Ocurrió un error al guardar la consulta");
      setIsModalOpen(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id: number) => {
    setLoading(true);
    try {
      await reportRepository.deleteHistoryItem(id);
      setSuccess("Consulta eliminada exitosamente");
      setIsModalOpen(true); 
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err:any) {
      setError("Ocurrió un error al eliminar la consulta");
      setIsModalOpen(true); 
    } finally {
      setLoading(false);
    }
  };

  return { history, getReasonsByInquiryResultId, reasons, loadHistory, submitReport, deleteHistoryItem, createInquiryResult, setOffset, setLimit, setDate, setRiskTypeId, setSellerName, offset, limit, date, riskTypeId, sellerName};
}
