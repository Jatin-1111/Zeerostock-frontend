"use client";

import CartItems from "@/components/cart/CartItems";
import OrderSummary from "@/components/cart/OrderSummary";
import RelatedProducts from "@/components/cart/RelatedProducts";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  const { items } = useCartStore();
  const itemCount = items?.length || 0;

  return (
    <div className="w-full min-h-screen px-2 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3">
      {/* Page Header */}
      <div className="mb-2 sm:mb-2.5 md:mb-3 md:bg-white rounded-xl sm:rounded-2xl md:shadow-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 flex flex-row items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Cart Icon */}
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-success-bg rounded-lg flex items-center justify-center">
            <ShoppingCart
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-secondary"
              strokeWidth={2}
            />
          </div>

          {/* Title Section */}
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold text-dark mb-0.5">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-xs md:text-sm lg:text-sm text-muted">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        {/* Browse Button */}
        <button className="w-auto px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 bg-white border border-primary text-primary rounded-lg sm:rounded-xl text-xs sm:text-xs md:text-sm lg:text-xs font-semibold hover:bg-primary hover:text-white transition-colors">
          Browse More Items
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
        {/* Left Column - Cart Items */}
        <div className="lg:col-span-2">
          <CartItems />
        </div>

        {/* Right Column - Order Summary & Related Products */}
        <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
          <OrderSummary />
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
}
