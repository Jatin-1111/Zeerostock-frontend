import { FileText, Calendar } from "lucide-react";

interface OrderHeaderProps {
  orderNumber: string;
  placedDate: string;
  trackingNumber?: string;
}

export default function OrderHeader({
  orderNumber,
  placedDate,
  trackingNumber,
}: OrderHeaderProps) {
  return (
    <div className="text-center mb-12">
      {/* Success Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-[130px] h-[130px] bg-[#2aae7a] rounded-full flex items-center justify-center">
          <svg
            className="w-[85px] h-[85px] text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-6">
        <h1 className="font-semibold text-3xl leading-normal text-[#0d1b2a] mb-4">
          Order Confirmed!
        </h1>
        <p className="font-medium text-2xl leading-normal text-[#9c9c9c] max-w-[894px] mx-auto">
          Thank you for your order. We&apos;ve received your order and will
          process it shortly
        </p>
      </div>

      {/* Order Details */}
      <div className="flex items-center justify-center gap-12 flex-wrap mt-6">
        <div className="flex items-center gap-[9px]">
          <FileText
            className="w-[15px] h-[18px] text-[#9c9c9c]"
            strokeWidth={2}
          />
          <span className="font-medium text-2xl leading-normal text-[#9c9c9c]">
            Order #{orderNumber}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar
            className="w-[22px] h-[22px] text-[#9c9c9c]"
            strokeWidth={1.5}
          />
          <span className="font-medium text-2xl leading-normal text-[#9c9c9c]">
            Placed on {placedDate}
          </span>
        </div>
      </div>
    </div>
  );
}
