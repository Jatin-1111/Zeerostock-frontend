/**
 * Buyer Service - Comprehensive API integration for all buyer operations
 * Zeerostock B2B Marketplace
 */

import { apiRequest } from "@/lib/api-client";
import type {
  ApiResponse,
  PaginatedResponse,
  // Orders
  Order,
  OrderSummary,
  OrderStats,
  OrderFilters,
  CreateOrderRequest,
  CreateOrderResponse,
  CancelOrderRequest,
  OrderTracking,
  // Watchlist
  WatchlistItem,
  AddToWatchlistRequest,
  PaginationParams,
  // Recently Viewed
  RecentlyViewedItem,
  AddRecentlyViewedRequest,
  // Reviews
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
  MarkReviewHelpfulnessRequest,
  ReviewFilters,
  // Profile
  BuyerProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
  // Addresses
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
  // Notifications
  Notification,
  NotificationFilters,
  MarkNotificationsAsReadRequest,
  // Support
  SupportTicket,
  CreateSupportTicketRequest,
  AddTicketMessageRequest,
  RateTicketRequest,
  SupportTicketFilters,
  // Dashboard
  DashboardData,
} from "@/types/buyer.types";

/**
 * Buyer Service
 * All API methods for buyer operations
 */
export const buyerService = {
  // =====================================================
  // ORDER OPERATIONS (8 methods)
  // =====================================================

  /**
   * Get buyer's active orders
   * @param params - Pagination parameters
   */
  async getActiveOrders(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<OrderSummary>>> {
    return apiRequest("get", "/buyer/orders/active", undefined, { params });
  },

  /**
   * Get buyer's order history
   * @param filters - Pagination and filter parameters
   */
  async getOrderHistory(
    filters?: OrderFilters
  ): Promise<ApiResponse<PaginatedResponse<OrderSummary>>> {
    return apiRequest("get", "/buyer/orders/history", undefined, {
      params: filters,
    });
  },

  /**
   * Get buyer's order statistics
   */
  async getOrderStats(): Promise<ApiResponse<OrderStats>> {
    return apiRequest("get", "/buyer/orders/stats");
  },

  /**
   * Get specific order details by ID
   * @param orderId - Order UUID
   */
  async getOrderById(orderId: string): Promise<ApiResponse<Order>> {
    return apiRequest("get", `/buyer/orders/${orderId}`);
  },

  /**
   * Get order tracking information
   * @param orderId - Order UUID
   */
  async getOrderTracking(
    orderId: string
  ): Promise<ApiResponse<{ tracking: OrderTracking[] }>> {
    return apiRequest("get", `/buyer/orders/${orderId}/tracking`);
  },

  /**
   * Create a new order from checkout session
   * @param data - Order creation data
   */
  async createOrder(
    data: CreateOrderRequest
  ): Promise<ApiResponse<CreateOrderResponse>> {
    return apiRequest("post", "/buyer/orders/create", data);
  },

  /**
   * Cancel an order
   * @param orderId - Order UUID
   * @param data - Cancellation reason
   */
  async cancelOrder(
    orderId: string,
    data: CancelOrderRequest
  ): Promise<ApiResponse<any>> {
    return apiRequest("post", `/buyer/orders/${orderId}/cancel`, data);
  },

  /**
   * Download order invoice (placeholder)
   * @param orderId - Order UUID
   */
  async downloadInvoice(orderId: string): Promise<Blob> {
    // This would typically return a blob for PDF download
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/buyer/orders/${orderId}/invoice`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.blob();
  },

  // =====================================================
  // WATCHLIST OPERATIONS (5 methods)
  // =====================================================

  /**
   * Get buyer's watchlist
   * @param params - Pagination parameters
   */
  async getWatchlist(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<WatchlistItem>>> {
    return apiRequest("get", "/buyer/watchlist", undefined, { params });
  },

  /**
   * Add product to watchlist
   * @param data - Product to add
   */
  async addToWatchlist(
    data: AddToWatchlistRequest
  ): Promise<ApiResponse<{ watchlistItem: WatchlistItem }>> {
    return apiRequest("post", "/buyer/watchlist/add", data);
  },

  /**
   * Remove product from watchlist
   * @param productId - Product UUID
   */
  async removeFromWatchlist(productId: string): Promise<ApiResponse<any>> {
    return apiRequest("delete", `/buyer/watchlist/remove/${productId}`);
  },

  /**
   * Get watchlist count
   */
  async getWatchlistCount(): Promise<ApiResponse<{ count: number }>> {
    return apiRequest("get", "/buyer/watchlist/count");
  },

  /**
   * Clear unavailable items from watchlist
   */
  async clearUnavailableItems(): Promise<ApiResponse<any>> {
    return apiRequest("delete", "/buyer/watchlist/clear-unavailable");
  },

  // =====================================================
  // RECENTLY VIEWED OPERATIONS (5 methods)
  // =====================================================

  /**
   * Get recently viewed products
   * @param params - Pagination parameters
   */
  async getRecentlyViewed(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<RecentlyViewedItem>>> {
    return apiRequest("get", "/buyer/recently-viewed", undefined, { params });
  },

  /**
   * Add product to recently viewed
   * @param data - Product to add
   */
  async addRecentlyViewed(
    data: AddRecentlyViewedRequest
  ): Promise<ApiResponse<any>> {
    return apiRequest("post", "/buyer/recently-viewed/add", data);
  },

  /**
   * Clear all recently viewed products
   */
  async clearRecentlyViewed(): Promise<ApiResponse<any>> {
    return apiRequest("delete", "/buyer/recently-viewed/clear");
  },

  /**
   * Remove specific product from recently viewed
   * @param productId - Product UUID
   */
  async removeRecentlyViewed(productId: string): Promise<ApiResponse<any>> {
    return apiRequest("delete", `/buyer/recently-viewed/${productId}`);
  },

  /**
   * Get recently viewed count
   */
  async getRecentlyViewedCount(): Promise<ApiResponse<{ count: number }>> {
    return apiRequest("get", "/buyer/recently-viewed/count");
  },

  // =====================================================
  // REVIEW OPERATIONS (6 methods)
  // =====================================================

  /**
   * Create a new review
   * @param data - Review data
   */
  async createReview(
    data: CreateReviewRequest
  ): Promise<ApiResponse<{ review: Review }>> {
    return apiRequest("post", "/buyer/reviews", data);
  },

  /**
   * Get buyer's reviews
   * @param filters - Filter parameters
   */
  async getMyReviews(
    filters?: ReviewFilters
  ): Promise<ApiResponse<PaginatedResponse<Review>>> {
    return apiRequest("get", "/buyer/reviews/my-reviews", undefined, {
      params: filters,
    });
  },

  /**
   * Get specific review by ID
   * @param reviewId - Review UUID
   */
  async getReviewById(reviewId: string): Promise<ApiResponse<Review>> {
    return apiRequest("get", `/buyer/reviews/${reviewId}`);
  },

  /**
   * Update a review
   * @param reviewId - Review UUID
   * @param data - Updated review data
   */
  async updateReview(
    reviewId: string,
    data: UpdateReviewRequest
  ): Promise<ApiResponse<{ review: Review }>> {
    return apiRequest("put", `/buyer/reviews/${reviewId}`, data);
  },

  /**
   * Delete a review
   * @param reviewId - Review UUID
   */
  async deleteReview(reviewId: string): Promise<ApiResponse<any>> {
    return apiRequest("delete", `/buyer/reviews/${reviewId}`);
  },

  /**
   * Mark review as helpful or not helpful
   * @param reviewId - Review UUID
   * @param data - Helpfulness data
   */
  async markReviewHelpfulness(
    reviewId: string,
    data: MarkReviewHelpfulnessRequest
  ): Promise<ApiResponse<any>> {
    return apiRequest("post", `/buyer/reviews/${reviewId}/helpful`, data);
  },

  // =====================================================
  // PROFILE & SETTINGS OPERATIONS (3 methods)
  // =====================================================

  /**
   * Get buyer profile
   */
  async getBuyerProfile(): Promise<ApiResponse<BuyerProfile>> {
    return apiRequest("get", "/buyer/profile");
  },

  /**
   * Update buyer profile
   * @param data - Profile updates
   */
  async updateBuyerProfile(
    data: UpdateProfileRequest
  ): Promise<ApiResponse<{ profile: BuyerProfile }>> {
    return apiRequest("put", "/buyer/profile", data);
  },

  /**
   * Change password
   * @param data - Password change data
   */
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<any>> {
    return apiRequest("put", "/buyer/profile/change-password", data);
  },

  // =====================================================
  // ADDRESS OPERATIONS (5 methods)
  // =====================================================

  /**
   * Get all addresses
   */
  async getAddresses(): Promise<ApiResponse<{ addresses: Address[] }>> {
    return apiRequest("get", "/buyer/profile/addresses");
  },

  /**
   * Add new address
   * @param data - Address data
   */
  async addAddress(
    data: CreateAddressRequest
  ): Promise<ApiResponse<{ address: Address }>> {
    return apiRequest("post", "/buyer/profile/address", data);
  },

  /**
   * Update address
   * @param addressId - Address UUID
   * @param data - Updated address data
   */
  async updateAddress(
    addressId: string,
    data: UpdateAddressRequest
  ): Promise<ApiResponse<{ address: Address }>> {
    return apiRequest("put", `/buyer/profile/address/${addressId}`, data);
  },

  /**
   * Delete address
   * @param addressId - Address UUID
   */
  async deleteAddress(addressId: string): Promise<ApiResponse<any>> {
    return apiRequest("delete", `/buyer/profile/address/${addressId}`);
  },

  /**
   * Set address as default
   * @param addressId - Address UUID
   */
  async setDefaultAddress(addressId: string): Promise<ApiResponse<any>> {
    return apiRequest("put", `/buyer/profile/address/${addressId}/set-default`);
  },

  // =====================================================
  // NOTIFICATION OPERATIONS (6 methods)
  // =====================================================

  /**
   * Get notifications with pagination
   * @param filters - Filter parameters
   */
  async getNotifications(
    filters?: NotificationFilters
  ): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    return apiRequest("get", "/buyer/notifications", undefined, {
      params: filters,
    });
  },

  /**
   * Bulk mark notifications as read
   * @param data - Notification IDs
   */
  async markNotificationsAsRead(
    data: MarkNotificationsAsReadRequest
  ): Promise<ApiResponse<any>> {
    return apiRequest("put", "/buyer/notifications/mark-read", data);
  },

  /**
   * Mark single notification as read
   * @param notificationId - Notification UUID
   */
  async markNotificationAsRead(
    notificationId: string
  ): Promise<ApiResponse<any>> {
    return apiRequest("put", `/buyer/notifications/${notificationId}/read`);
  },

  /**
   * Delete notification
   * @param notificationId - Notification UUID
   */
  async deleteNotification(notificationId: string): Promise<ApiResponse<any>> {
    return apiRequest("delete", `/buyer/notifications/${notificationId}`);
  },

  /**
   * Get unread notification count
   */
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    return apiRequest("get", "/buyer/notifications/unread-count");
  },

  /**
   * Clear old notifications
   */
  async clearOldNotifications(): Promise<ApiResponse<any>> {
    return apiRequest("delete", "/buyer/notifications/clear-old");
  },

  // =====================================================
  // SUPPORT TICKET OPERATIONS (5 methods)
  // =====================================================

  /**
   * Create support ticket
   * @param data - Ticket data
   */
  async createSupportTicket(
    data: CreateSupportTicketRequest
  ): Promise<ApiResponse<{ ticket: SupportTicket }>> {
    return apiRequest("post", "/buyer/support/ticket", data);
  },

  /**
   * Get buyer's support tickets
   * @param filters - Filter parameters
   */
  async getMyTickets(
    filters?: SupportTicketFilters
  ): Promise<ApiResponse<PaginatedResponse<SupportTicket>>> {
    return apiRequest("get", "/buyer/support/tickets", undefined, {
      params: filters,
    });
  },

  /**
   * Get ticket details by ID
   * @param ticketId - Ticket UUID
   */
  async getTicketById(ticketId: string): Promise<ApiResponse<SupportTicket>> {
    return apiRequest("get", `/buyer/support/ticket/${ticketId}`);
  },

  /**
   * Add message to ticket
   * @param ticketId - Ticket UUID
   * @param data - Message data
   */
  async addTicketMessage(
    ticketId: string,
    data: AddTicketMessageRequest
  ): Promise<ApiResponse<any>> {
    return apiRequest(
      "post",
      `/buyer/support/ticket/${ticketId}/message`,
      data
    );
  },

  /**
   * Close ticket and optionally rate
   * @param ticketId - Ticket UUID
   * @param data - Rating data (optional)
   */
  async closeTicket(
    ticketId: string,
    data?: RateTicketRequest
  ): Promise<ApiResponse<any>> {
    return apiRequest("post", `/buyer/support/ticket/${ticketId}/close`, data);
  },

  // =====================================================
  // DASHBOARD & AGGREGATED DATA (2 methods)
  // =====================================================

  /**
   * Get comprehensive dashboard data
   * Combines stats, recent orders, and notifications
   */
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    // This could be a single endpoint or multiple parallel requests
    try {
      const [stats, recentOrders, notifications] = await Promise.all([
        this.getOrderStats(),
        this.getActiveOrders({ page: 1, limit: 5 }),
        this.getNotifications({ page: 1, limit: 10, isRead: false }),
      ]);

      const watchlistCount = await this.getWatchlistCount();

      return {
        success: true,
        data: {
          stats: {
            orderStats: stats.data!,
            watchlistCount: watchlistCount.data?.count || 0,
            recentlyViewedCount: 0,
            unreadNotifications: notifications.data?.pagination.total || 0,
            pendingReviews: 0,
          },
          recentOrders: recentOrders.data?.items || [],
          notifications: notifications.data?.items || [],
        },
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get order summary for quick display
   * @param orderId - Order UUID
   */
  async getOrderSummary(orderId: string): Promise<ApiResponse<OrderSummary>> {
    const order = await this.getOrderById(orderId);
    if (!order.data) throw new Error("Order not found");

    return {
      success: true,
      data: {
        orderId: order.data.orderId,
        orderNumber: order.data.orderNumber,
        status: order.data.status,
        paymentStatus: order.data.paymentStatus,
        totalAmount: order.data.pricing.totalAmount,
        itemCount: order.data.items.length,
        orderDate: order.data.createdAt,
        estimatedDelivery: order.data.deliveryEta || undefined,
      },
    };
  },
};

// Export default
export default buyerService;

// Named exports for convenience
export const {
  // Orders
  getActiveOrders,
  getOrderHistory,
  getOrderStats,
  getOrderById,
  getOrderTracking,
  createOrder,
  cancelOrder,
  downloadInvoice,
  // Watchlist
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlistCount,
  clearUnavailableItems,
  // Recently Viewed
  getRecentlyViewed,
  addRecentlyViewed,
  clearRecentlyViewed,
  removeRecentlyViewed,
  getRecentlyViewedCount,
  // Reviews
  createReview,
  getMyReviews,
  getReviewById,
  updateReview,
  deleteReview,
  markReviewHelpfulness,
  // Profile
  getBuyerProfile,
  updateBuyerProfile,
  changePassword,
  // Addresses
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  // Notifications
  getNotifications,
  markNotificationsAsRead,
  markNotificationAsRead,
  deleteNotification,
  getUnreadCount,
  clearOldNotifications,
  // Support
  createSupportTicket,
  getMyTickets,
  getTicketById,
  addTicketMessage,
  closeTicket,
  // Dashboard
  getDashboardData,
  getOrderSummary,
} = buyerService;
