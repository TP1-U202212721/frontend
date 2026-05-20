import { SellerRisk } from "./SellerRisk";

export interface ISellerRiskRepository {
  evaluateSellerRisk(sellerName: string): Promise<SellerRisk>;
}
