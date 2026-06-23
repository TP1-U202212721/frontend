export interface Vendor {
  id: string;
  name: string;
  rank: number;
  riskLevel: "RIESGO_BAJO" | "RIESGO_MODERADO" | "RIESGO_ALTO";
  riskPercentage: number;
  totalReviews: number;
  averageRating: number;
  publicationCount: number;
}
