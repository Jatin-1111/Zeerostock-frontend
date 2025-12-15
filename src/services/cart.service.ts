import { apiRequest } from "@/lib/api-client";
import { Cart, CartItem, ApiResponse } from "@/types/api.types";

const SESSION_KEY =
  process.env.NEXT_PUBLIC_SESSION_KEY || "zeerostock_guest_session";

// Helper to generate guest session ID
const generateSessionId = (): string => {
  return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper to get or create session ID
const getSessionId = (): string => {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

export const cartService = {
  /**
   * Add item to cart
   */
  async addToCart(
    productId: string,
    quantity: number
  ): Promise<ApiResponse<{ cartItem: CartItem }>> {
    const sessionId = getSessionId();
    return apiRequest("post", "/cart/add", { productId, quantity, sessionId });
  },

  /**
   * Get full cart with pricing
   */
  async getCart(
    state?: string,
    city?: string,
    pincode?: string
  ): Promise<ApiResponse<Cart>> {
    const params: Record<string, string> = {};
    if (state) params.state = state;
    if (city) params.city = city;
    if (pincode) params.pincode = pincode;

    return apiRequest("get", "/cart", undefined, { params });
  },

  /**
   * Get cart item count
   */
  async getCartCount(): Promise<ApiResponse<{ count: number }>> {
    return apiRequest("get", "/cart/count");
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(
    itemId: string,
    quantity: number
  ): Promise<ApiResponse<{ cartItem: CartItem }>> {
    return apiRequest("put", `/cart/update/${itemId}`, { quantity });
  },

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: string): Promise<ApiResponse<void>> {
    return apiRequest("delete", `/cart/remove/${itemId}`);
  },

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<ApiResponse<void>> {
    return apiRequest("delete", "/cart/clear");
  },

  /**
   * Apply coupon code
   */
  async applyCoupon(
    couponCode: string
  ): Promise<ApiResponse<{ discount: number; newTotal: number }>> {
    return apiRequest("post", "/cart/apply-coupon", { couponCode });
  },

  /**
   * Remove applied coupon
   */
  async removeCoupon(): Promise<ApiResponse<{ newTotal: number }>> {
    return apiRequest("post", "/cart/remove-coupon");
  },

  /**
   * Validate cart items (stock, prices, availability)
   */
  async validateCart(): Promise<
    ApiResponse<{
      valid: boolean;
      issues: Array<{
        itemId: string;
        type: "out_of_stock" | "price_changed" | "unavailable";
        message: string;
      }>;
    }>
  > {
    return apiRequest("get", "/cart/validate");
  },

  /**
   * Estimate shipping charges
   */
  async estimateShipping(
    state: string,
    city?: string,
    pincode?: string,
    orderValue?: number
  ): Promise<
    ApiResponse<{
      shippingCost: number;
      estimatedDelivery: string;
    }>
  > {
    const params: Record<string, string | number> = { state };
    if (city) params.city = city;
    if (pincode) params.pincode = pincode;
    if (orderValue) params.orderValue = orderValue;

    return apiRequest("get", "/cart/shipping-estimate", undefined, { params });
  },

  /**
   * Create checkout session (requires authentication)
   */
  async createCheckoutSession(data: {
    shippingAddress: Record<string, unknown>;
    billingAddress: Record<string, unknown>;
  }): Promise<ApiResponse<{ checkoutSessionId: string }>> {
    return apiRequest("post", "/cart/checkout", data);
  },

  /**
   * Merge guest cart into user cart after login
   */
  async mergeCart(): Promise<ApiResponse<{ mergedCart: Cart }>> {
    const guestSessionId = localStorage.getItem(SESSION_KEY);
    if (!guestSessionId) {
      return { success: false, message: "No guest cart found" };
    }

    const response = await apiRequest<{ mergedCart: Cart }>(
      "post",
      "/cart/merge",
      { guestSessionId }
    );

    // Clear guest session after merge
    if (response.success) {
      localStorage.removeItem(SESSION_KEY);
    }

    return response;
  },

  /**
   * Clear guest session (useful on logout)
   */
  clearGuestSession(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY);
    }
  },
};
