import { apiRequest } from "@/lib/api-client";
import {
  ProductDetail,
  Product,
  Review,
  Auction,
  ApiResponse,
  PaginationMeta,
} from "@/types/api.types";

export const productService = {
  /**
   * Get complete product details
   */
  async getProductDetail(
    productId: string
  ): Promise<ApiResponse<{ product: ProductDetail }>> {
    return apiRequest("get", `/products/${productId}`);
  },

  /**
   * Get product specifications
   */
  async getSpecifications(
    productId: string
  ): Promise<ApiResponse<{ specifications: Record<string, unknown> }>> {
    return apiRequest("get", `/products/${productId}/specifications`);
  },

  /**
   * Get seller information
   */
  async getSellerInfo(productId: string): Promise<
    ApiResponse<{
      seller: {
        id: string;
        name: string;
        companyName: string;
        rating: number;
        totalReviews: number;
        joinedDate: string;
        isVerified: boolean;
        responseTime: string;
        totalProducts: number;
        successfulOrders: number;
      };
    }>
  > {
    return apiRequest("get", `/products/${productId}/seller`);
  },

  /**
   * Get product reviews
   */
  async getReviews(
    productId: string,
    page: number = 1,
    limit: number = 10,
    rating?: number
  ): Promise<
    ApiResponse<{
      reviews: Review[];
      pagination: PaginationMeta;
      averageRating: number;
      totalReviews: number;
      ratingDistribution: Record<number, number>;
    }>
  > {
    const params: Record<string, number> = { page, limit };
    if (rating) params.rating = rating;

    return apiRequest("get", `/products/${productId}/reviews`, undefined, {
      params,
    });
  },

  /**
   * Get shipping options for product
   */
  async getShippingOptions(productId: string): Promise<
    ApiResponse<{
      shippingOptions: Array<{
        method: string;
        cost: number;
        estimatedDays: number;
        description: string;
      }>;
    }>
  > {
    return apiRequest("get", `/products/${productId}/shipping`);
  },

  /**
   * Get related products
   */
  async getRelatedProducts(
    productId: string,
    limit: number = 12
  ): Promise<ApiResponse<{ relatedProducts: Product[] }>> {
    return apiRequest("get", `/products/${productId}/related`, undefined, {
      params: { limit },
    });
  },

  /**
   * Add product to watchlist (requires authentication)
   */
  async watchProduct(productId: string): Promise<ApiResponse<void>> {
    return apiRequest("post", `/products/${productId}/watch`);
  },

  /**
   * Remove product from watchlist (requires authentication)
   */
  async unwatchProduct(productId: string): Promise<ApiResponse<void>> {
    return apiRequest("delete", `/products/${productId}/watch`);
  },

  /**
   * Request custom quote (requires authentication)
   */
  async requestQuote(
    productId: string,
    data: {
      quantity: number;
      requirements?: string;
      targetPrice?: number;
    }
  ): Promise<ApiResponse<{ quoteRequestId: string }>> {
    return apiRequest("post", `/products/${productId}/request-quote`, data);
  },

  /**
   * Share product
   */
  async shareProduct(
    productId: string,
    platform: string,
    recipientEmail?: string
  ): Promise<ApiResponse<void>> {
    return apiRequest("post", `/products/${productId}/share`, {
      platform,
      recipientEmail,
    });
  },

  /**
   * Get auction details for product
   */
  async getAuctionDetails(
    productId: string
  ): Promise<ApiResponse<{ auction: Auction }>> {
    return apiRequest("get", `/products/${productId}/auction`);
  },
};
