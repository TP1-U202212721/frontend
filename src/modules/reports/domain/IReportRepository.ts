import { Report, HistoryItem } from "./Report";

export interface IReportRepository {
  submitReport(reportData: Omit<Report, "id" | "createdAt">): Promise<Report>;
  getHistory(): Promise<HistoryItem[]>;
  deleteHistoryItem(id: string): Promise<void>;
}
