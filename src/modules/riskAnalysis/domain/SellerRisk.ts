export interface SellerRisk {
  sellerName: string;
  riskLevel: "Bajo" | "Moderado" | "Alto";
  reasons: string[];
}
