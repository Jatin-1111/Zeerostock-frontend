interface OrderSummaryProps {
  subtotal: number;
  savings: number;
  tax: number;
  shipping: number;
}

export default function OrderSummary({
  subtotal,
  savings,
  tax,
  shipping,
}: OrderSummaryProps) {
  const total = subtotal - savings + tax + shipping;

  return (
    <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-[23px] sticky top-6">
      <h3
        className="text-[18px] font-medium text-[#0d1b2a] mb-[27px]"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Order Summary
      </h3>

      <div className="space-y-[15px] mb-[35px]">
        <div className="flex justify-between items-center">
          <span
            className="text-[15px] font-medium text-[#9c9c9c]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Subtotal (2 items)
          </span>
          <span
            className="text-[15px] font-semibold text-[#bebebe]"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.5px",
              lineHeight: "18px",
            }}
          >
            ₹{subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span
            className="text-[15px] font-medium text-[#2aae7a]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Total Saving
          </span>
          <span
            className="text-[15px] font-semibold text-[#2aae7a]"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.5px",
              lineHeight: "18px",
            }}
          >
            -₹{savings.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span
            className="text-[15px] font-medium text-[#9c9c9c]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Estimated Tax
          </span>
          <span
            className="text-[15px] font-semibold text-[#bebebe]"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.5px",
              lineHeight: "18px",
            }}
          >
            ₹{tax.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span
            className="text-[15px] font-medium text-[#9c9c9c]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Shipping
          </span>
          <span
            className="text-[15px] font-semibold text-[#2aae7a]"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.5px",
              lineHeight: "18px",
            }}
          >
            {shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}
          </span>
        </div>
      </div>

      <div
        className="border-t mb-[19px]"
        style={{ borderColor: "#d0d0d0", height: "0px" }}
      />

      <div className="flex justify-between items-center mb-[48px]">
        <span
          className="text-[26px] font-semibold text-[#0d1b2a]"
          style={{ fontFamily: "Poppins, sans-serif", lineHeight: "normal" }}
        >
          Total :
        </span>
        <div className="px-[8px] py-[8px]">
          <span
            className="text-[26px] font-semibold text-[#1e3a8a]"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.5px",
              lineHeight: "18px",
            }}
          >
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-5 h-5"
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
        <p
          className="text-[14px] font-medium text-[#bebebe]"
          style={{
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.5px",
            lineHeight: "18px",
          }}
        >
          SSL Secure Checkout
        </p>
      </div>

      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5"
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
        <p
          className="text-[14px] font-medium text-[#bebebe]"
          style={{
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.5px",
            lineHeight: "18px",
          }}
        >
          Fast Shipping Options
        </p>
      </div>
    </div>
  );
}
