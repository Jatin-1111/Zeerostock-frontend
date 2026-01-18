import { apiRequest } from "@/lib/api-client";
import {
  Cart,
  CartItem,
  ApiResponse,
  CheckoutSessionResponse,
} from "@/types/api.types";

const SESSION_KEY = "zeerostock_guest_session"; // Remove environment variable to ensure consistency

// Helper to generate guest session ID
const generateSessionId = (): string => {
  return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper to get or create session ID
const getSessionId = (): string => {
  if (typeof window === "undefined") {
    console.log("getSessionId: Running on server side, returning empty string");
    return "";
  }

  console.log("getSessionId: SESSION_KEY =", SESSION_KEY);
  console.log("getSessionId: localStorage keys:", Object.keys(localStorage));

  let sessionId = localStorage.getItem(SESSION_KEY);
  console.log(
    `getSessionId: Retrieved from localStorage['${SESSION_KEY}']:`,
    sessionId,
  );

  if (!sessionId) {
    sessionId = generateSessionId();
    console.log("getSessionId: Generated new session ID:", sessionId);
    localStorage.setItem(SESSION_KEY, sessionId);
    console.log("getSessionId: Stored in localStorage['${SESSION_KEY}']");

    // Verify it was stored
    const verify = localStorage.getItem(SESSION_KEY);
    console.log("getSessionId: Verification read:", verify);
  }

  return sessionId;
};

export const cartService = {
  /**
   * Add item to cart
   */
  async addToCart(
    productId: string,
    quantity: number,
  ): Promise<ApiResponse<{ cartItem: CartItem }>> {
    // Validate inputs
    if (!productId) {
      return {
        success: false,
        message: "Product ID is required",
      };
    }

    if (!quantity || quantity < 1) {
      return {
        success: false,
        message: "Quantity must be at least 1",
      };
    }

    const sessionId = getSessionId();
    console.log("cartService.addToCart: sessionId =", sessionId);
    console.log("cartService.addToCart: sending request with", {
      productId,
      quantity,
      sessionId,
    });

    try {
      const result = await apiRequest<{ cartItem: CartItem }>(
        "post",
        "/cart/add",
        {
          productId,
          quantity,
          sessionId,
        },
      );
      console.log("cartService.addToCart: received response", result);
      return result;
    } catch (error) {
      console.error("cartService.addToCart: error", error);
      return {
        success: false,
        message: "Failed to add item to cart",
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  },

  /**
   * Get full cart with pricing
   */
  async getCart(
    state?: string,
    city?: string,
    pincode?: string,
  ): Promise<ApiResponse<Cart>> {
    const sessionId = getSessionId();
    console.log("cartService.getCart: sessionId =", sessionId);
    const params: Record<string, string> = { sessionId };
    if (state) params.state = state;
    if (city) params.city = city;
    if (pincode) params.pincode = pincode;

    const result = await apiRequest<Cart>("get", "/cart", undefined, {
      params,
    });
    console.log("cartService.getCart: result =", result);
    return result;
  },

  /**
   * Get cart item count
   */
  async getCartCount(): Promise<ApiResponse<{ count: number }>> {
    const sessionId = getSessionId();
    return apiRequest("get", "/cart/count", undefined, {
      params: { sessionId },
    });
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(
    itemId: string,
    quantity: number,
  ): Promise<ApiResponse<{ cartItem: CartItem }>> {
    // Validate inputs
    if (!itemId) {
      return {
        success: false,
        message: "Item ID is required",
      };
    }

    if (!quantity || quantity < 1) {
      return {
        success: false,
        message: "Quantity must be at least 1",
      };
    }

    const sessionId = getSessionId();
    console.log(
      "cartService.updateCartItem: sessionId =",
      sessionId,
      "itemId =",
      itemId,
    );

    try {
      return await apiRequest("put", `/cart/update/${itemId}`, {
        quantity,
        sessionId,
      });
    } catch (error) {
      console.error("cartService.updateCartItem: error", error);
      return {
        success: false,
        message: "Failed to update cart item",
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  },

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: string): Promise<ApiResponse<void>> {
    // Validate input
    if (!itemId) {
      return {
        success: false,
        message: "Item ID is required",
      };
    }

    const sessionId = getSessionId();
    console.log(
      "cartService.removeFromCart: sessionId =",
      sessionId,
      "itemId =",
      itemId,
    );

    try {
      return await apiRequest("delete", `/cart/remove/${itemId}`, undefined, {
        params: { sessionId },
      });
    } catch (error) {
      console.error("cartService.removeFromCart: error", error);
      return {
        success: false,
        message: "Failed to remove item from cart",
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  },

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<ApiResponse<void>> {
    const sessionId = getSessionId();
    return apiRequest("delete", "/cart/clear", { sessionId });
  },

  /**
   * Apply coupon code
   */
  async applyCoupon(
    couponCode: string,
  ): Promise<ApiResponse<{ discount: number; newTotal: number }>> {
    const sessionId = getSessionId();
    return apiRequest("post", "/cart/apply-coupon", { couponCode, sessionId });
  },

  /**
   * Remove applied coupon
   */
  async removeCoupon(): Promise<ApiResponse<{ newTotal: number }>> {
    const sessionId = getSessionId();
    return apiRequest("post", "/cart/remove-coupon", { sessionId });
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
    const sessionId = getSessionId();
    return apiRequest("get", "/cart/validate", undefined, {
      params: { sessionId },
    });
  },

  /**
   * Estimate shipping charges
   */
  async estimateShipping(
    state: string,
    city?: string,
    pincode?: string,
    orderValue?: number,
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
  async createCheckoutSession(data?: {
    shippingAddress?: Record<string, unknown>;
    billingAddress?: Record<string, unknown>;
  }): Promise<ApiResponse<CheckoutSessionResponse>> {
    return apiRequest("post", "/cart/checkout", data || {});
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
      { guestSessionId },
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
