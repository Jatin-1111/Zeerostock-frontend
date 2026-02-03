interface OrderSummaryProps {
  subtotal: number;
  savings: number;
  tax: number;
  shipping: number;
}

import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/currency.utils";

export default function OrderSummary({
  subtotal,
  savings,
  tax,
  shipping,
}: OrderSummaryProps) {
  const { currency } = useAuth();
  const total = subtotal - savings + tax + shipping;

  return (
    <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px] sticky top-6">
      <h3 className="text-[12px] font-medium text-[#0d1b2a] mb-[18px]">
        Order Summary
      </h3>

      <div className="space-y-[10px] mb-[23px]">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-medium text-[#9c9c9c]">
            Subtotal (2 items)
          </span>
          <span className="text-[10px] font-semibold text-[#bebebe]">
            {formatPrice(subtotal, currency)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[10px] font-medium text-[#2aae7a]">
            Total Saving
          </span>
          <span className="text-[10px] font-semibold text-[#2aae7a]">
            -{formatPrice(savings, currency)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[10px] font-medium text-[#9c9c9c]">
            Estimated Tax
          </span>
          <span className="text-[10px] font-semibold text-[#bebebe]">
            {formatPrice(tax, currency)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[10px] font-medium text-[#9c9c9c]">
            Shipping
          </span>
          <span className="text-[10px] font-semibold text-[#2aae7a]">
            {shipping === 0 ? "Free" : formatPrice(shipping, currency)}
          </span>
        </div>
      </div>

      <div
        className="border-t mb-[13px]"
        style={{ borderColor: "#d0d0d0", height: "0px" }}
      />

      <div className="flex justify-between items-center mb-[32px]">
        <span className="text-[17px] font-semibold text-[#0d1b2a]">
          Total :
        </span>
        <div className="px-[5px] py-[5px]">
          <span className="text-[17px] font-semibold text-[#1e3a8a]">
            {formatPrice(total, currency)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-2">
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#bebebe"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <p className="text-[9px] font-medium text-[#bebebe]">
          SSL Secure Checkout
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#bebebe"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="text-[9px] font-medium text-[#bebebe]">
          Fast Shipping Options
        </p>
      </div>
    </div>
  );
}
