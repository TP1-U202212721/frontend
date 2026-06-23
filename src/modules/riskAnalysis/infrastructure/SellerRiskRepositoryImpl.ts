
import { api } from "@/modules/shared/infrastructure/api";
import { ISellerRiskRepository } from "../domain/ISellerRiskRepository";
import { SellerRisk } from "../domain/SellerRisk";

export class SellerRiskRepositoryImpl implements ISellerRiskRepository {

  async evaluateSellerRisk(url: string): Promise<SellerRisk> {
      const response = await api.post('/InquiryResult/Estimate', { "Url": url });
      if (!response.data.isSuccess || response.data.item === null) {
          throw new Error(response.data.message || "Error al evaluar el riesgo del vendedor. Por favor, inténtalo de nuevo más tarde.");
      }
      return {
        seller: response.data.item.seller,
        riskLevel: response.data.item.result,
        reasons: response.data.item.reasons
      };
  }
}
