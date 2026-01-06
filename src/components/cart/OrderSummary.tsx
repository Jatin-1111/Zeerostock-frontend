"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";
import { Shield, Truck } from "lucide-react";

export default function OrderSummary() {
  const router = useRouter();
  const { items } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [summary, setSummary] = useState({
    itemCount: 0,
    subtotal: 0,
    savings: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    couponDiscount: 0,
  });

  useEffect(() => {
    // Calculate summary from cart items
    if (items && items.length > 0) {
      const itemCount = items.length;
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const savings = items.reduce((sum, item) => {
        if (item.originalPrice && item.originalPrice > item.price) {
          return sum + (item.originalPrice - item.price) * item.quantity;
        }
        return sum;
      }, 0);

      // GST is 18% on subtotal
      const tax = subtotal * 0.18;

      // Free shipping for orders > 25000
      const shipping = subtotal > 25000 ? 0 : 500;

      const total = subtotal + shipping - summary.couponDiscount;

      setSummary({
        itemCount,
        subtotal,
        savings,
        tax,
        shipping,
        total,
        couponDiscount: summary.couponDiscount,
      });
    } else {
      setSummary({
        itemCount: 0,
        subtotal: 0,
        savings: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        couponDiscount: 0,
      });
    }
  }, [items, summary.couponDiscount]);

  const handleApplyCoupon = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const response = await cartService.applyCoupon(promoCode);
      if (response.success && response.data) {
        // Toast is handled by cartStore
        // Update discount from response
        if (response.data?.discount) {
          setSummary((prev) => ({
            ...prev,
            couponDiscount: response.data?.discount || 0,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleCheckout = () => {
    if (!items || items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    router.push("/buyer/checkout");
  };

  return (
    <div className="w-full space-y-4">
      {/* Order Summary */}
      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-medium text-[#0d1b2a] mb-5">
          Order Summary
        </h3>

        <div className="space-y-4 mb-5">
          <div className="flex justify-between items-center text-base">
            <span className="font-medium text-[#9c9c9c]">
              Subtotal ({summary.itemCount} items)
            </span>
            <span className="font-semibold text-[#bebebe] tracking-wide">
              ₹{summary.subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          {summary.savings > 0 && (
            <div className="flex justify-between items-center text-base">
              <span className="font-medium text-[#2aae7a]">Total Saving</span>
              <span className="font-semibold text-[#2aae7a] tracking-wide">
                -₹{summary.savings.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          {summary.couponDiscount > 0 && (
            <div className="flex justify-between items-center text-base">
              <span className="font-medium text-[#2aae7a]">
                Coupon Discount
              </span>
              <span className="font-semibold text-[#2aae7a] tracking-wide">
                -₹{summary.couponDiscount.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-base">
            <span className="font-medium text-[#9c9c9c]">Estimated Tax</span>
            <span className="font-semibold text-[#bebebe] tracking-wide">
              ₹{summary.tax.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between items-center text-base">
            <span className="font-medium text-[#9c9c9c]">Shipping</span>
            <span className="font-semibold text-[#2aae7a] tracking-wide">
              {summary.shipping === 0
                ? "Free"
                : `₹${summary.shipping.toLocaleString("en-IN")}`}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold text-[#0d1b2a]">
              Total :
            </span>
            <span className="text-2xl font-semibold text-[#1e3a8a] tracking-wide">
              ₹{summary.total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={!items || items.length === 0}
          className="w-full h-[45px] bg-[#1e3a8a] text-white text-base font-semibold rounded-xl hover:bg-[#152d6b] transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </button>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#bebebe]" />
            <span className="text-sm font-medium text-[#bebebe] tracking-wide">
              SSL Secure Checkout
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#bebebe]" />
            <span className="text-sm font-medium text-[#bebebe] tracking-wide">
              Fast Shipping Options
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-medium text-[#0d1b2a] mb-4">
          Have a promo code?
        </h3>
        {/* Changed to flex-col on mobile to prevent overflow */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter Code"
            className="h-[42px] w-full flex-1 min-w-0 px-4 text-sm font-medium text-[#0d1b2a] placeholder:text-[#9ca3af] border border-[#bebebe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={isApplyingCoupon}
            className="h-[42px] w-full sm:w-auto px-8 bg-[#1e3a8a] text-white text-sm font-semibold rounded-xl hover:bg-[#152d6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isApplyingCoupon ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}
