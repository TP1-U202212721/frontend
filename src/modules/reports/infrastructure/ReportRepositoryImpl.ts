
import  { api, apiWithFormData } from "@/modules/shared/infrastructure/api";
import { IReportRepository } from "../domain/IReportRepository";
import { Report, HistoryItem } from "../domain/Report";
import { AxiosError } from "axios";

export class ReportRepositoryImpl implements IReportRepository {

  async submitReport(report: Report): Promise<any> {
    const formData = new FormData();
    formData.append('Email', report.email);
    formData.append('Username', report.username);
    formData.append('SellerName', report.sellerName);
    formData.append('PublicationUrl', report.publicationUrl);
    formData.append('Reason', report.reason);
    
    if (report.attachment) {
      formData.append('Attachment', report.attachment, report.attachment.name);
    }
    const response = await  apiWithFormData.post('/Report', formData);
    if (!response.data.isSuccess) {
      throw new Error(response.data.message);
    }
      return response.data;
  }

  async getReasonsByInquiryResultId(inquiryResultId: number): Promise<any> {
    const response = await api.get(`/Reason?inquiryResultId=${inquiryResultId}`);
    return response.data;
  }

  async getHistory(offset: number, limit: number, profileId: number, date?: string, riskTypeId?: number, sellerName?: string): Promise<HistoryItem[]> {
    const response = await api.get("/InquiryResult", { params: { offset, limit, profileId, date, riskTypeId, sellerName } });
    return response.data.items as HistoryItem[];
  }

  async deleteHistoryItem(id: number): Promise<boolean> {
    const response = await api.delete(`/InquiryResult/${id}`);
    return response.status === 200;
  }
  async createInquiryResult(payload: any): Promise<any> {
      const response = await api.post('/InquiryResult', payload);
      if (!response.data.isSuccess) {
         throw new Error(response.data.message);
      }
      return response.data;
  }
}
