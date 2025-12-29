import { Phone, Truck } from "lucide-react";

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
  const isFreeShipping =
    typeof shipping === "string" && shipping.toLowerCase() === "free";

  return (
    <div className="bg-white rounded-[15px] p-[23px] mb-5 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Title */}
      <h3 className="font-medium text-[#0d1b2a] text-[18px] leading-normal mb-6">
        Order Summary
      </h3>

      {/* Summary Items */}
      <div className="space-y-4 mb-[35px]">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#9c9c9c] text-[15px] leading-normal">
            Subtotal ({itemCount} items)
          </span>
          <span className="font-semibold text-[#bebebe] text-[15px] leading-[18px] tracking-[0.5px]">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>

        {/* Total Savings */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#2aae7a] text-[15px] leading-normal">
            Total Saving
          </span>
          <span className="font-semibold text-[#2aae7a] text-[15px] leading-[18px] tracking-[0.5px]">
            -₹{savings.toLocaleString()}
          </span>
        </div>

        {/* Estimated Tax */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#9c9c9c] text-[15px] leading-normal">
            Estimated Tax
          </span>
          <span className="font-semibold text-[#bebebe] text-[15px] leading-[18px] tracking-[0.5px]">
            ₹{tax.toLocaleString()}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#9c9c9c] text-[15px] leading-normal">
            Shipping
          </span>
          <span
            className={`font-semibold text-[15px] leading-[18px] tracking-[0.5px] ${
              isFreeShipping ? "text-[#2aae7a]" : "text-[#bebebe]"
            }`}
          >
            {isFreeShipping ? "Free" : `₹${shipping}`}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-gray-300 mb-[22px]"></div>

      {/* Total */}
      <div className="flex items-center justify-between mb-[51px]">
        <span className="font-semibold text-[#0d1b2a] text-[23px] leading-normal">
          Total :
        </span>
        <span className="font-semibold text-[#2aae7a] text-[23px] leading-[18px] tracking-[0.5px]">
          ₹
          {total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* Footer Icons */}
      <div className="space-y-[11px]">
        <div className="flex items-center gap-2">
          <Phone className="w-[18px] h-[18px] text-[#bebebe]" />
          <span className="font-medium text-[#bebebe] text-[14px] leading-[18px] tracking-[0.5px]">
            SSL Secure Checkout
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-[18px] h-[18px] text-[#bebebe]" />
          <span className="font-medium text-[#bebebe] text-[14px] leading-[18px] tracking-[0.5px]">
            Fast Shipping Options
          </span>
        </div>
      </div>
    </div>
  );
}
