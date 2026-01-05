"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, CreditCard, Truck, Loader2 } from "lucide-react";
import type { Address } from "@/types/buyer.types";
import type { CartItem } from "@/types/api.types";

interface ReviewOrderProps {
  cartItems: CartItem[];
  shippingAddress: Address | null;
  billingAddress: Address | null;
  paymentMethod: "card" | "escrow" | "wire" | "net-terms";
  shippingMethod?: string;
  orderNotes: string;
  onNotesChange: (notes: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  isPlacingOrder?: boolean;
}

export default function ReviewOrder({
  cartItems,
  shippingAddress,
  billingAddress,
  paymentMethod,
  shippingMethod = "standard",
  orderNotes,
  onNotesChange,
  onBack,
  onPlaceOrder,
  isPlacingOrder = false,
}: ReviewOrderProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const getPaymentMethodDisplay = () => {
    switch (paymentMethod) {
      case "card":
        return {
          title: "Credit/Debit Card",
          subtitle: "Visa, Master Card, American Express",
        };
      case "escrow":
        return {
          title: "Escrow Payment",
          subtitle: "Secure payment held until delivery",
        };
      case "wire":
        return {
          title: "Wire Transfer",
          subtitle: "Direct bank transfer",
        };
      case "net-terms":
        return {
          title: "Net Terms",
          subtitle: "Pay later with approved credit",
        };
      default:
        return { title: "Payment Method", subtitle: "" };
    }
  };

  const getShippingMethodDisplay = () => {
    switch (shippingMethod) {
      case "standard":
        return {
          title: "Standard Shipping",
          subtitle: "5-7 business days",
        };
      case "expedited":
        return {
          title: "Expedited Shipping",
          subtitle: "2-3 business days",
        };
      case "overnight":
        return {
          title: "Overnight Delivery",
          subtitle: "1 business day",
        };
      case "freight":
        return {
          title: "Freight Shipping",
          subtitle: "7-14 business days",
        };
      default:
        return { title: "Standard Shipping", subtitle: "5-7 business days" };
    }
  };

  const paymentDisplay = getPaymentMethodDisplay();
  const shippingDisplay = getShippingMethodDisplay();

  return (
    <div className="flex flex-col gap-[19px]">
      {/* Order Summary Section */}
      <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-[23px] w-full">
        <h2 className="font-semibold text-[18px] text-[#0d1b2a] mb-[15px]">
          Order Summary
        </h2>
        <div className="flex flex-col gap-[15px]">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.itemId}
                className="bg-[#fbfbfb] rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] px-[19px] py-[18px] flex items-center gap-[19px] h-[90px] w-full"
              >
                {item.image && (
                  <div className="w-[79px] h-[54px] rounded-[8px] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={79}
                      height={54}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-[2px]">
                  <div className=" font-medium text-[14px] text-[#0d1b2a]">
                    {item.title}
                  </div>
                  <div className="text-[12px] text-[#9c9c9c] leading-[18px]">
                    by {item.seller?.name || item.category || "Supplier"}
                  </div>
                  <div className="text-[12px] text-[#9c9c9c] leading-[18px]">
                    Qty: {item.quantity} x {item.price.toFixed(2)}
                  </div>
                </div>
                <div className=" font-medium text-[18px] text-[#0d1b2a] opacity-80">
                  <span className=" font-bold">₹</span>
                  {(item.quantity * item.price).toFixed(0)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-[#9c9c9c] p-[30px]">
              No items in cart
            </div>
          )}
        </div>
      </div>

      {/* Payment and Shipping Method */}
      <div className="flex gap-[19px]">
        {/* Payment Method */}
        <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-[23px] flex-1 h-[116px]">
          <h3 className=" font-semibold text-[18px] text-[#0d1b2a] mb-[19px]">
            Payment Method
          </h3>
          <div className="flex items-center gap-[8px]">
            {/* Payment Icon */}
            <div className="shrink-0">
              <CreditCard
                className="w-[30px] h-[30px] text-[#0d1b2a]"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className=" font-medium text-[14px] text-[#0d1b2a]">
                {paymentDisplay.title}
              </div>
              <div className="font-medium text-[12px] text-[#9c9c9c]">
                {paymentDisplay.subtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-[23px] flex-1 h-[116px]">
          <h3 className=" font-semibold text-[18px] text-[#0d1b2a] mb-[19px]">
            Shipping Method
          </h3>
          <div className="flex items-center gap-[8px]">
            {/* Shipping Icon */}
            <div className="shrink-0">
              <Truck
                className="w-[30px] h-[30px] text-[#0d1b2a]"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className=" font-medium text-[14px] text-[#0d1b2a]">
                {shippingDisplay.title}
              </div>
              <div className="font-medium text-[12px] text-[#9c9c9c]">
                {shippingDisplay.subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] px-[19px] py-[23px] flex items-start gap-[15px] w-full">
        <button
          onClick={() => setAgreedToTerms(!agreedToTerms)}
          className={`w-[23px] h-[23px] rounded-[4px] flex items-center justify-center shrink-0 p-[4px] border-2 transition-colors ${
            agreedToTerms
              ? "bg-[#2aae7a] border-[#2aae7a]"
              : "bg-white border-[#bebebe]"
          }`}
        >
          {agreedToTerms && (
            <Check className="w-[15px] h-[15px] text-white" strokeWidth={3} />
          )}
        </button>
        <div className="flex-1">
          <div className=" font-medium text-[14px] text-[#0d1b2a] mb-[10px]">
            I agree to the Terms of Service and Privacy Policy
          </div>
          <div className=" font-medium text-[11px] text-[#9c9c9c] leading-[17px]">
            By placing this order, you agree to our terms and acknowledge that
            you&apos;ve read our return policy.
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-[15px] mt-[8px] w-full">
        <button
          onClick={onBack}
          disabled={isPlacingOrder}
          className="h-[45px] px-[60px] py-[11px] bg-white border border-[#9c9c9c] rounded-[11px]  font-semibold text-[15px] text-[#9c9c9c] leading-[17px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          Previous Step
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={
            isPlacingOrder ||
            !shippingAddress ||
            cartItems.length === 0 ||
            !agreedToTerms
          }
          className="h-[45px] px-[60px] py-[11px] bg-[#1e3a8a] border-none rounded-[11px]  font-semibold text-[15px] text-white leading-[17px] flex items-center justify-center gap-[8px] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
        >
          {isPlacingOrder ? (
            <>
              <Loader2 className="animate-spin h-[15px] w-[15px] text-white" />
              Placing Order...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
}
