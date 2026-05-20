import { IReportRepository } from "../domain/IReportRepository";
import { Report, HistoryItem } from "../domain/Report";

export class ReportRepositoryImpl implements IReportRepository {
  private mockHistory: HistoryItem[] = [
    { id: "1", name: "Vendedor 1", risk: "Moderado", date: "20/04/2026" },
    { id: "2", name: "Vendedor 2", risk: "Bajo", date: "19/04/2026" },
    { id: "3", name: "Vendedor 3", risk: "Alto", date: "18/04/2026" },
    { id: "4", name: "Vendedor 4", risk: "Bajo", date: "15/04/2026" },
  ];

  async submitReport(reportData: Omit<Report, "id" | "createdAt">): Promise<Report> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          createdAt: new Date(),
          ...reportData,
        });
      }, 1000);
    });
  }

  async getHistory(): Promise<HistoryItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.mockHistory]);
      }, 500);
    });
  }

  async deleteHistoryItem(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockHistory = this.mockHistory.filter((item) => item.id !== id);
        resolve();
      }, 300);
    });
  }
}
