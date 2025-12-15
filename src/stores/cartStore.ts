import { create } from "zustand";
import { cartService } from "@/services/cart.service";
import { Cart } from "@/types/api.types";
import toast from "react-hot-toast";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  applyCoupon: (couponCode: string) => Promise<boolean>;
  removeCoupon: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  // Fetch cart
  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const response = await cartService.getCart();
      if (response.success && response.data) {
        set({ cart: response.data, loading: false });
      } else {
        set({ loading: false, error: response.message });
      }
    } catch (error: unknown) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch cart",
      });
    }
  },

  // Add to cart
  addToCart: async (productId: string, quantity: number) => {
    try {
      const response = await cartService.addToCart(productId, quantity);
      if (response.success) {
        // Refresh cart after adding
        await get().fetchCart();
        toast.success("Added to cart!");
        return true;
      }
      toast.error(response.message || "Failed to add to cart");
      return false;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to add to cart";
      toast.error(message);
      return false;
    }
  },

  // Update quantity
  updateQuantity: async (itemId: string, quantity: number) => {
    try {
      const response = await cartService.updateCartItem(itemId, quantity);
      if (response.success) {
        await get().fetchCart();
        return true;
      }
      toast.error(response.message || "Failed to update quantity");
      return false;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update quantity";
      toast.error(message);
      return false;
    }
  },

  // Remove item
  removeItem: async (itemId: string) => {
    try {
      const response = await cartService.removeFromCart(itemId);
      if (response.success) {
        await get().fetchCart();
        toast.success("Item removed from cart");
        return true;
      }
      toast.error(response.message || "Failed to remove item");
      return false;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to remove item";
      toast.error(message);
      return false;
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await cartService.clearCart();
      if (response.success) {
        set({ cart: null });
        toast.success("Cart cleared");
        return true;
      }
      toast.error(response.message || "Failed to clear cart");
      return false;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to clear cart";
      toast.error(message);
      return false;
    }
  },

  // Apply coupon
  applyCoupon: async (couponCode: string) => {
    try {
      const response = await cartService.applyCoupon(couponCode);
      if (response.success) {
        await get().fetchCart();
        toast.success("Coupon applied!");
        return true;
      }
      toast.error(response.message || "Invalid coupon code");
      return false;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to apply coupon";
      toast.error(message);
      return false;
    }
  },

  // Remove coupon
  removeCoupon: async () => {
    try {
      const response = await cartService.removeCoupon();
      if (response.success) {
        await get().fetchCart();
        toast.success("Coupon removed");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Refresh cart (alias for fetchCart)
  refreshCart: async () => {
    await get().fetchCart();
  },
}));
