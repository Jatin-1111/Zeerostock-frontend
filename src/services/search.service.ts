import { apiRequest } from "@/lib/api-client";
import {
  Product,
  Category,
  SearchSuggestion,
  PopularSearch,
  ApiResponse,
  PaginationMeta,
} from "@/types/api.types";

export const searchService = {
  /**
   * Get auto-suggestions for search query
   */
  async getSuggestions(
    query: string,
    limit: number = 10
  ): Promise<ApiResponse<{ suggestions: SearchSuggestion[] }>> {
    return apiRequest("get", "/search/suggestions", undefined, {
      params: { q: query, limit },
    });
  },

  /**
   * Search products with full-text search and filters
   */
  async searchProducts(
    query: string,
    filters: Record<string, unknown> = {},
    page: number = 1,
    limit: number = 20
  ): Promise<
    ApiResponse<{
      products: Product[];
      pagination: PaginationMeta;
      query: string;
      totalResults: number;
    }>
  > {
    const params = {
      q: query,
      page,
      limit,
      ...filters,
    };

    return apiRequest("get", "/search/products", undefined, { params });
  },

  /**
   * Search categories by name
   */
  async searchCategories(
    query: string,
    limit: number = 10
  ): Promise<ApiResponse<{ categories: Category[] }>> {
    return apiRequest("get", "/search/categories", undefined, {
      params: { q: query, limit },
    });
  },

  /**
   * Get spell correction suggestion
   */
  async getDidYouMean(
    query: string
  ): Promise<ApiResponse<{ suggestion: string | null }>> {
    return apiRequest("get", "/search/did-you-mean", undefined, {
      params: { q: query },
    });
  },

  /**
   * Get popular search terms
   */
  async getPopularSearches(
    limit: number = 10
  ): Promise<ApiResponse<{ popularSearches: PopularSearch[] }>> {
    return apiRequest("get", "/search/popular", undefined, {
      params: { limit },
    });
  },

  /**
   * Get user's recent search history (requires authentication)
   */
  async getRecentSearches(limit: number = 10): Promise<
    ApiResponse<{
      recentSearches: Array<{
        query: string;
        searchedAt: string;
      }>;
    }>
  > {
    return apiRequest("get", "/search/recent", undefined, {
      params: { limit },
    });
  },

  /**
   * Track search analytics event
   */
  async trackSearch(
    query: string,
    resultCount: number,
    selectedProductId?: string
  ): Promise<ApiResponse<void>> {
    return apiRequest("post", "/search/track", {
      query,
      resultCount,
      selectedProductId,
    });
  },
};
