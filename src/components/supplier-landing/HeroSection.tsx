"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div className="w-full px-[60px] py-[105px] relative">
      {/* Background Image - positioned absolutely */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute h-full left-0 max-w-none top-0 w-full object-cover"
          src="/Supplier.jpg"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1320px] mx-auto">
        {/* Top Label */}
        <p className="text-[23px] text-[#0d1b2a] mb-[23px] font-medium">
          For Smart Suppliers
        </p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          {/* Left Content */}
          <div>
            {/* Heading */}
            <h1 className="text-[39px] leading-[52px] font-normal text-[#0d1b2a] mb-[15px]">
              Turn Surplus Inventory into{" "}
              <span className="text-[#2ec096]">Immediate</span> Cash Flow
            </h1>

            {/* Description */}
            <p className="text-[14px] leading-[19px] font-medium text-[#0d1b2a] mb-[23px]">
              Connect with global buyers actively seeking surplus inventory. Our{" "}
              <span className="font-bold">AI-powered platform</span> matches
              your products with verified buyers, ensuring fast sales and secure
              payments.
            </p>

            {/* Buttons */}
            <div className="flex gap-[15px] mb-[23px]">
              <button
                onClick={() => router.push("/become-supplier")}
                className="bg-[#1e3a8a] text-white rounded-[9px] px-[20px] py-[12px] text-[17px] font-medium hover:bg-[#1e3a8a]/90 transition-colors"
              >
                Start Selling Today
              </button>
              <button
                onClick={() => router.push("/for-supplier")}
                className="bg-white border border-[#1e3a8a] text-[#1e3a8a] rounded-[9px] px-[20px] py-[12px] text-[17px] font-medium hover:bg-gray-50 transition-colors"
              >
                View Success Stories
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-[15px]">
              <div className="flex items-center gap-[4px]">
                <div className="w-[38px] h-[30px] flex items-center justify-center">
                  <Check
                    className="w-[23px] h-[23px] text-black"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[19px] text-black font-medium">
                  Free Listings
                </span>
              </div>
              <div className="flex items-center gap-[4px]">
                <div className="w-[38px] h-[30px] flex items-center justify-center">
                  <Check
                    className="w-[23px] h-[23px] text-black"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[19px] text-black font-medium">
                  Verified Buyers Only
                </span>
              </div>
              <div className="flex items-center gap-[4px]">
                <div className="w-[38px] h-[30px] flex items-center justify-center">
                  <Check
                    className="w-[23px] h-[23px] text-black"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[19px] text-black font-medium">
                  Secure Payments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
