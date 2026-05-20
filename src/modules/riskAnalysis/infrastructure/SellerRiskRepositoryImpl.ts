import { ISellerRiskRepository } from "../domain/ISellerRiskRepository";
import { SellerRisk } from "../domain/SellerRisk";

export class SellerRiskRepositoryImpl implements ISellerRiskRepository {
  async evaluateSellerRisk(sellerName: string): Promise<SellerRisk> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const length = sellerName.length;
        let riskLevel: "Bajo" | "Moderado" | "Alto" = "Moderado";
        if (length < 6) riskLevel = "Bajo";
        else if (length > 10) riskLevel = "Alto";

        const reasons = [
          "Opera en un sitio no confiable",
          "Alto porcentaje de reseñas fraudulentas",
          "No cuenta con medios de pago confiables"
        ];

        resolve({ sellerName, riskLevel, reasons });
      }, 1500);
    });
  }
}
