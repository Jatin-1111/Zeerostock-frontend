import { Phone, Truck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/currency.utils";

interface OrderSummaryConfirmProps {
  subtotal: number;
  itemCount: number;
  savings: number;
  tax: number;
  shipping: string;
  total: number;
}

export default function OrderSummaryConfirm({
  subtotal,
  itemCount,
  savings,
  tax,
  shipping,
  total,
}: OrderSummaryConfirmProps) {
  const { currency } = useAuth();
  const isFreeShipping =
    typeof shipping === "string" && shipping.toLowerCase() === "free";

  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[23px] lg:p-[15px] mb-4 sm:mb-5 lg:mb-3 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Title */}
      <h3 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal mb-4 sm:mb-6 lg:mb-4">
        Order Summary
      </h3>

      {/* Summary Items */}
      <div className="space-y-3 sm:space-y-4 lg:space-y-3 mb-6 sm:mb-[35px] lg:mb-[23px]">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#9c9c9c] text-sm sm:text-[15px] lg:text-[10px] leading-normal">
            Subtotal ({itemCount} items)
          </span>
          <span className="font-semibold text-[#bebebe] text-sm sm:text-[15px] lg:text-[10px] leading-[18px] tracking-[0.5px]">
            {formatPrice(subtotal, currency)}
          </span>
        </div>

        {/* Total Savings */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#2aae7a] text-sm sm:text-[15px] lg:text-[10px] leading-normal">
            Total Saving
          </span>
          <span className="font-semibold text-[#2aae7a] text-sm sm:text-[15px] lg:text-[10px] leading-[18px] tracking-[0.5px]">
            -{formatPrice(savings, currency)}
          </span>
        </div>

        {/* Estimated Tax */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#9c9c9c] text-sm sm:text-[15px] lg:text-[10px] leading-normal">
            Estimated Tax
          </span>
          <span className="font-semibold text-[#bebebe] text-sm sm:text-[15px] lg:text-[10px] leading-[18px] tracking-[0.5px]">
            {formatPrice(tax, currency)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#9c9c9c] text-sm sm:text-[15px] lg:text-[10px] leading-normal">
            Shipping
          </span>
          <span
            className={`font-semibold text-sm sm:text-[15px] lg:text-[10px] leading-[18px] tracking-[0.5px] ${
              isFreeShipping ? "text-[#2aae7a]" : "text-[#bebebe]"
            }`}
          >
            {isFreeShipping
              ? "Free"
              : formatPrice(parseFloat(shipping) || 0, currency)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-gray-300 mb-4 sm:mb-[22px] lg:mb-[15px]"></div>

      {/* Total */}
      <div className="flex items-center justify-between mb-8 sm:mb-[51px] lg:mb-[34px]">
        <span className="font-semibold text-[#0d1b2a] text-lg sm:text-[23px] lg:text-[15px] leading-normal">
          Total :
        </span>
        <span className="font-semibold text-[#2aae7a] text-lg sm:text-[23px] lg:text-[15px] leading-[18px] tracking-[0.5px]">
          {formatPrice(total, currency)}
        </span>
      </div>

      {/* Footer Icons */}
      <div className="space-y-2 sm:space-y-[11px] lg:space-y-[7px]">
        <div className="flex items-center gap-2 lg:gap-1">
          <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-[12px] lg:h-[12px] text-[#bebebe]" />
          <span className="font-medium text-[#bebebe] text-xs sm:text-[14px] lg:text-[9px] leading-[18px] tracking-[0.5px]">
            SSL Secure Checkout
          </span>
        </div>
        <div className="flex items-center gap-2 lg:gap-1">
          <Truck className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-[12px] lg:h-[12px] text-[#bebebe]" />
          <span className="font-medium text-[#bebebe] text-xs sm:text-[14px] lg:text-[9px] leading-[18px] tracking-[0.5px]">
            Fast Shipping Options
          </span>
        </div>
      </div>
    </div>
  );
}
