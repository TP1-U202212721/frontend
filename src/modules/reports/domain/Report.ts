export interface Report {
  id: string;
  sellerName: string;
  platform: string;
  description: string;
  evidence?: string;
  createdAt: Date;
}

export interface HistoryItem {
  id: number;
  sellerName: string;
  riskTypeId: number;
  profileId: number;
  createdAT: string;
}

export interface ReasonResponseWrapper{
  items: Reason[];
}

export interface Reason {
  id: number;
  title: string;
  inquiryResultId: number;
}
