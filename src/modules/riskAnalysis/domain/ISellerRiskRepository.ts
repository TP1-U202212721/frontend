import { SellerRisk } from "./SellerRisk";

export interface ISellerRiskRepository {
  evaluateSellerRisk(url: string): Promise<SellerRisk>;
}
