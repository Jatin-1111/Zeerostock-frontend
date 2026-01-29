import { create } from "zustand";
import { cartService } from "@/services/cart.service";
import { Cart, CartItem, CartPricing } from "@/types/api.types";
import { toast } from "sonner";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;

  // Computed properties
  items: CartItem[];
  itemCount: number;
  pricing: CartPricing | null;

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (
    productId: string,
    quantity: number,
    skipRefresh?: boolean,
  ) => Promise<boolean>;
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

  // Computed properties - these will be updated whenever cart changes
  items: [],
  itemCount: 0,
  pricing: null,

  // Fetch cart
  fetchCart: async () => {
    console.log("=== cartStore.fetchCart called ===");
    set({ loading: true, error: null });
    try {
      console.log("Calling cartService.getCart...");
      const response = await cartService.getCart();
      console.log("cartService.getCart response:", response);

      if (response.success && response.data) {
        console.log("Setting cart data:", response.data);
        console.log("Items in cart:", response.data.items?.length || 0);

        // Update cart and derived properties
        set({
          cart: response.data,
          items: response.data.items || [],
          itemCount: response.data.itemCount || 0,
          pricing: response.data.summary || response.data.pricing || null,
          loading: false,
        });
      } else {
        console.log("Failed to fetch cart:", response.message);
        set({ loading: false, error: response.message });
      }
    } catch (error: unknown) {
      console.error("Error in fetchCart:", error);
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch cart",
      });
    }
  },

  // Add to cart
  addToCart: async (
    productId: string,
    quantity: number,
    skipRefresh = false,
  ) => {
    console.log("=== cartStore.addToCart called ===");
    console.log("Product ID:", productId);
    console.log("Quantity:", quantity);

    try {
      console.log("Calling cartService.addToCart...");
      const response = await cartService.addToCart(productId, quantity);
      console.log("cartService response:", response);

      if (response.success) {
        // Refresh cart after adding unless skipped
        if (!skipRefresh) {
          console.log("Fetching updated cart...");
          await get().fetchCart();
        }
        toast.success("Item added to cart successfully");
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
    const previousItems = get().items;

    // Optimistic update
    set((state) => ({
      items: state.items.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item,
      ),
      // Optionally update summary/totals locally if needed, but for now just quantity
    }));

    try {
      const response = await cartService.updateCartItem(itemId, quantity);
      if (response.success) {
        // We can fetch cart to align fully, but silent background fetch is better
        // await get().fetchCart();
        // Actually, let's fetch in background to make sure pricing/stock is correct
        get().fetchCart();
        return true;
      }
      // Revert on failure
      set({ items: previousItems });
      toast.error(response.message || "Failed to update quantity");
      return false;
    } catch (error: unknown) {
      // Revert on error
      set({ items: previousItems });
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
        toast.success("Item has been removed from your cart");
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
        set({
          cart: null,
          items: [],
          itemCount: 0,
          pricing: null,
        });
        toast.success("Your cart has been cleared");
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
        toast.success("Coupon code applied successfully");
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
        toast.success("Coupon code has been removed");
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
