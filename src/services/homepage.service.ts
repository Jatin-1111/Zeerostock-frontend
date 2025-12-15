import { apiRequest } from "@/lib/api-client";
import {
  HeroBanner,
  Category,
  Product,
  Auction,
  MarketInsights,
  CaseStudy,
  Testimonial,
  QuickStats,
  ApiResponse,
} from "@/types/api.types";

export const homepageService = {
  /**
   * Get complete homepage data (optimized single API call)
   * @param sections - Optional array of sections to fetch
   * @param compact - Whether to return compact data
   */
  async getCompleteHomepage(
    sections?: string[],
    compact?: boolean
  ): Promise<
    ApiResponse<{
      heroBanners?: HeroBanner[];
      trendingCategories?: Category[];
      featuredDeals?: Product[];
      liveAuctions?: Auction[];
      trendingProducts?: Product[];
      marketInsights?: MarketInsights;
      caseStudies?: CaseStudy[];
      testimonials?: Testimonial[];
      quickStats?: QuickStats;
    }>
  > {
    const params: Record<string, string | boolean> = {};
    if (sections && sections.length > 0) {
      params.sections = sections.join(",");
    }
    if (compact !== undefined) {
      params.compact = compact;
    }

    return apiRequest("get", "/homepage", undefined, { params });
  },

  /**
   * Get hero banners for carousel
   */
  async getHeroBanners(): Promise<ApiResponse<{ banners: HeroBanner[] }>> {
    return apiRequest("get", "/homepage/hero-banners");
  },

  /**
   * Get trending categories
   */
  async getTrendingCategories(
    limit: number = 12
  ): Promise<ApiResponse<{ categories: Category[] }>> {
    return apiRequest("get", "/homepage/trending-categories", undefined, {
      params: { limit },
    });
  },

  /**
   * Get featured deals
   */
  async getFeaturedDeals(
    limit: number = 12
  ): Promise<ApiResponse<{ deals: Product[] }>> {
    return apiRequest("get", "/homepage/featured-deals", undefined, {
      params: { limit },
    });
  },

  /**
   * Get live auctions
   */
  async getLiveAuctions(
    limit: number = 12
  ): Promise<ApiResponse<{ auctions: Auction[] }>> {
    return apiRequest("get", "/homepage/live-auctions", undefined, {
      params: { limit },
    });
  },

  /**
   * Get trending products
   */
  async getTrendingProducts(
    limit: number = 12
  ): Promise<ApiResponse<{ products: Product[] }>> {
    return apiRequest("get", "/homepage/trending-products", undefined, {
      params: { limit },
    });
  },

  /**
   * Get real-time market insights
   */
  async getMarketInsights(): Promise<ApiResponse<MarketInsights>> {
    return apiRequest("get", "/homepage/market-insights");
  },

  /**
   * Get case studies / success stories
   */
  async getCaseStudies(
    limit: number = 12,
    featured?: boolean
  ): Promise<ApiResponse<{ caseStudies: CaseStudy[]; count: number }>> {
    const params: Record<string, number | boolean> = { limit };
    if (featured !== undefined) {
      params.featured = featured;
    }

    return apiRequest("get", "/homepage/case-studies", undefined, { params });
  },

  /**
   * Get customer testimonials
   */
  async getTestimonials(
    limit: number = 12,
    featured?: boolean
  ): Promise<ApiResponse<{ testimonials: Testimonial[]; count: number }>> {
    const params: Record<string, number | boolean> = { limit };
    if (featured !== undefined) {
      params.featured = featured;
    }

    return apiRequest("get", "/homepage/testimonials", undefined, { params });
  },

  /**
   * Get quick stats (users, volume, success rate)
   */
  async getQuickStats(): Promise<ApiResponse<QuickStats>> {
    return apiRequest("get", "/homepage/quick-stats");
  },
};
