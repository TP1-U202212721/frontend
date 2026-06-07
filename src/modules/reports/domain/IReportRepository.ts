import { Report, HistoryItem, ReasonResponseWrapper } from "./Report";

export interface IReportRepository {
  submitReport(reportData: Omit<Report, "id" | "createdAt">): Promise<Report>;
  getHistory(offset: number, limit: number,date?: string,riskTypeId?: number,sellerName?: string): Promise<HistoryItem[]>;
  deleteHistoryItem(id: number): Promise<boolean>;
  createInquiryResult(payload: any): Promise<any>;
  getReasonsByInquiryResultId(inquiryResultId: number): Promise<ReasonResponseWrapper>;
}
