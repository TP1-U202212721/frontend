export interface Report {
  id: string;
  sellerName: string;
  platform: string;
  description: string;
  evidence?: string;
  createdAt: Date;
}

export interface HistoryItem {
  id: string;
  name: string;
  risk: "Bajo" | "Moderado" | "Alto";
  date: string;
}
