
import { IVendorRankingRepository } from "../domain/IVendorRankingRepository";
import { Vendor } from "../domain/Vendor";
import { Publication } from "../domain/Publication";
import { Review } from "../domain/Review";
import { riskLevels } from "@/data/constants";
import { api } from "@/modules/shared/infrastructure/api";

type PaginatedResponse<T> = {
  items?: T[];
  total?: number;
  page?: number;
  message?: string | null;
};

type SellerDto = {
  id: number;
  name: string;
  riskLevel: number;
};

type PostDto = {
  id: number;
  url: string;
  platform: string;
  sellerId: number;
  title: string;
  postId: string;
};

type ReviewDto = {
  id: number;
  comment: string;
  rating: number;
  postId: number;
};

const DEFAULT_LIMIT = 1000;

const RISK_PERCENTAGE_BY_LEVEL: Record<number, number> = {
  3: 15,
  2: 50,
  1: 85,
};

const getItems = <T>(responseData: PaginatedResponse<T>): T[] => responseData.items ?? [];

const mapRiskLevel = (riskLevel: number): Vendor["riskLevel"] => {
  switch (riskLevels[riskLevel]) {
    case "Bajo":
      return "RIESGO_BAJO";
    case "Moderado":
      return "RIESGO_MODERADO";
    case "Alto":
      return "RIESGO_ALTO";
    default:
      return "RIESGO_MODERADO";
  }
};

const mapRiskPercentage = (riskLevel: number): number => RISK_PERCENTAGE_BY_LEVEL[riskLevel] ?? 50;

const mapReview = (review: ReviewDto): Review => ({
  id: String(review.id),
  title: review.comment,
  content: review.comment,
  rating: review.rating,
});

const mapPublication = (post: PostDto, reviewCount: number): Publication => ({
  id: String(post.id),
  title: post.title,
  category: post.platform,
  url: post.url,
  reviewCount,
});

export class VendorRankingRepositoryImpl implements IVendorRankingRepository {
  async getVendorRanking(): Promise<Vendor[]> {
    try {
      const response = await api.get<PaginatedResponse<SellerDto>>("/Seller", {
        params: { offset: 0, limit: DEFAULT_LIMIT },
      });

      const sellers = getItems(response.data);
      if (sellers.length === 0) {
        return [];
      }

      const vendors = await Promise.all(
        sellers.map(async (seller) => {
          const publicationsResponse = await api.get<PaginatedResponse<PostDto>>("/Post", {
            params: { sellerId: seller.id, limit: DEFAULT_LIMIT },
          });

          const publications = getItems(publicationsResponse.data);
          const publicationMetrics = await Promise.all(
            publications.map(async (publication) => {
              const reviewsResponse = await api.get<PaginatedResponse<ReviewDto>>("/Review", {
                params: { postId: publication.id, offset: 0, limit: DEFAULT_LIMIT },
              });

              const publicationReviews = getItems(reviewsResponse.data);
              return {
                reviewCount: publicationReviews.length,
                ratingSum: publicationReviews.reduce((sum, review) => sum + review.rating, 0),
              };
            })
          );

          const totalReviews = publicationMetrics.reduce((sum, metric) => sum + metric.reviewCount, 0);
          const totalRating = publicationMetrics.reduce((sum, metric) => sum + metric.ratingSum, 0);

          return {
            id: String(seller.id),
            name: seller.name,
            rank: 0,
            riskLevel: mapRiskLevel(seller.riskLevel),
            riskPercentage: mapRiskPercentage(seller.riskLevel),
            totalReviews,
            averageRating: totalReviews > 0 ? Number((totalRating / totalReviews).toFixed(1)) : 0,
            publicationCount: publications.length,
            riskSortValue: seller.riskLevel,
          };
        })
      );

      return vendors
        .sort((left, right) => {
          if (left.riskSortValue !== right.riskSortValue) {
            return right.riskSortValue - left.riskSortValue;
          }

          if (right.averageRating !== left.averageRating) {
            return right.averageRating - left.averageRating;
          }

          return left.name.localeCompare(right.name);
        })
        .map(({ riskSortValue: _riskSortValue, ...vendor }, index) => ({
          ...vendor,
          rank: index + 1,
        }));
    } catch (error: any) {
      throw new Error(error.message || "Error al obtener el ranking de vendedores. Por favor, inténtalo de nuevo más tarde.");
    }
  }

  async getVendorPublications(vendorId: string): Promise<Publication[]> {
    try {
      const response = await api.get<PaginatedResponse<PostDto>>("/Post", {
        params: { sellerId: vendorId, limit: DEFAULT_LIMIT },
      });

      const publications = getItems(response.data);
      const mappedPublications = await Promise.all(
        publications.map(async (publication) => {
          const reviewsResponse = await api.get<PaginatedResponse<ReviewDto>>("/Review", {
            params: { postId: publication.id, offset: 0, limit: DEFAULT_LIMIT },
          });

          return mapPublication(publication, getItems(reviewsResponse.data).length);
        })
      );

      return mappedPublications.sort((left, right) => right.reviewCount - left.reviewCount || left.title.localeCompare(right.title));
    } catch (error: any) {
      throw new Error(error.message || "Error al obtener las publicaciones. Por favor, inténtalo de nuevo más tarde.");
    }
  }

  async getPublicationReviews(publicationId: string): Promise<Review[]> {
    try {
      const response = await api.get<PaginatedResponse<ReviewDto>>("/Review", {
        params: { postId: publicationId, offset: 0, limit: DEFAULT_LIMIT },
      });

      return getItems(response.data).map(mapReview);
    } catch (error: any) {
      throw new Error(error.message || "Error al obtener las reseñas. Por favor, inténtalo de nuevo más tarde.");
    }
  }
}
