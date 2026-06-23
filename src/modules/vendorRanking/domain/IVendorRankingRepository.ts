import { Vendor } from "./Vendor";
import { Publication } from "./Publication";
import { Review } from "./Review";

export interface IVendorRankingRepository {
  getVendorRanking(): Promise<Vendor[]>;
  getVendorPublications(vendorId: string): Promise<Publication[]>;
  getPublicationReviews(publicationId: string): Promise<Review[]>;
}
