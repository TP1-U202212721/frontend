export interface Report {
  email: string;
  username: string;
  sellerName: string;
  publicationUrl: string;
  reason: string;
  attachment?: File;
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
