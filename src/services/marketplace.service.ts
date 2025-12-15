import { apiRequest } from "@/lib/api-client";
import {
  Product,
  Category,
  Industry,
  ProductFilters,
  ApiResponse,
  PaginationMeta,
} from "@/types/api.types";

export const marketplaceService = {
  /**
   * Get all marketplace products with filters and sorting
   */
  async getProducts(filters: ProductFilters = {}): Promise<
    ApiResponse<{
      products: Product[];
      pagination: PaginationMeta;
      filters: Record<string, unknown>;
    }>
  > {
    // Convert array filters to comma-separated strings
    const params: Record<string, unknown> = { ...filters };
    if (Array.isArray(params.condition)) {
      params.condition = params.condition.join(",");
    }
    if (Array.isArray(params.listingType)) {
      params.listingType = params.listingType.join(",");
    }

    return apiRequest("get", "/marketplace/products", undefined, { params });
  },

  /**
   * Get all active categories
   */
  async getCategories(
    limit?: number,
    industryId?: string,
    includeCount: boolean = true
  ): Promise<ApiResponse<{ categories: Category[] }>> {
    const params: Record<string, unknown> = { includeCount };
    if (limit) params.limit = limit;
    if (industryId) params.industryId = industryId;

    return apiRequest("get", "/marketplace/categories", undefined, { params });
  },

  /**
   * Get all active industries
   */
  async getIndustries(
    limit?: number,
    includeCount: boolean = true
  ): Promise<ApiResponse<{ industries: Industry[] }>> {
    const params: Record<string, unknown> = { includeCount };
    if (limit) params.limit = limit;

    return apiRequest("get", "/marketplace/industries", undefined, { params });
  },

  /**
   * Get today's featured deals (high discount products)
   */
  async getFeaturedDeals(
    limit: number = 12
  ): Promise<ApiResponse<{ deals: Product[] }>> {
    return apiRequest("get", "/marketplace/featured-deals", undefined, {
      params: { limit },
    });
  },

  /**
   * Get sponsored listings
   */
  async getSponsored(
    limit: number = 10
  ): Promise<ApiResponse<{ sponsored: Product[] }>> {
    return apiRequest("get", "/marketplace/sponsored", undefined, {
      params: { limit },
    });
  },

  /**
   * Get trending products
   */
  async getTrending(
    limit: number = 20
  ): Promise<ApiResponse<{ trending: Product[] }>> {
    return apiRequest("get", "/marketplace/trending", undefined, {
      params: { limit },
    });
  },

  /**
   * Get all available filter options with counts
   */
  async getFilters(): Promise<
    ApiResponse<{
      categories: Category[];
      industries: Industry[];
      cities: string[];
      conditions: string[];
      listingTypes: string[];
      priceRanges: Array<{ min: number; max: number; label: string }>;
      discountRanges: Array<{ min: number; max: number; label: string }>;
      sortOptions: Array<{ value: string; label: string }>;
    }>
  > {
    return apiRequest("get", "/marketplace/filters");
  },
};
