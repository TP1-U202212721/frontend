import { api } from "@/modules/shared/infrastructure/api";
import { ISellerRiskRepository } from "../domain/ISellerRiskRepository";
import { SellerRisk } from "../domain/SellerRisk";
import { riskLevels } from "@/data/constants";

export class SellerRiskRepositoryImpl implements ISellerRiskRepository {
  async evaluateSellerRisk(url: string): Promise<SellerRisk> {
      const response = await api.post('/Health', { "Url": url });
      if (!response.data.isSuccess || response.data.item === null) {
          throw new Error("Error evaluating seller risk");
      }
      return {
        seller: response.data.item.seller,
        riskLevel: riskLevels[response.data.item.result],
        reasons: response.data.item.reasons
      };
  }
}
