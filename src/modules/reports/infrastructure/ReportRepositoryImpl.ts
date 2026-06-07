
import api from "@/modules/shared/infrastructure/api";
import { IReportRepository } from "../domain/IReportRepository";
import { Report, HistoryItem } from "../domain/Report";
import { AxiosError } from "axios";

export class ReportRepositoryImpl implements IReportRepository {

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

  async getReasonsByInquiryResultId(inquiryResultId: number): Promise<any> {
    const response = await api.get(`/Reason?inquiryResultId=${inquiryResultId}`);
    return response.data;
  }

  async getHistory(offset: number, limit: number,date?: string,riskTypeId?: number,sellerName?: string): Promise<HistoryItem[]> {
    const response = await api.get("/InquiryResult", { params: { offset, limit, date, riskTypeId, sellerName } });
    return response.data.items as HistoryItem[];
  }

  async deleteHistoryItem(id: number): Promise<boolean> {
    const response = await api.delete(`/InquiryResult/${id}`);
    return response.status === 200;
  }
  async createInquiryResult(payload: any): Promise<any> {
    try{
      const response = await api.post('/InquiryResult', payload);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message);
      }
      throw error; 
    }
  }
}
