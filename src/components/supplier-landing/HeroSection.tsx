"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div className="w-full px-[40px] py-[70px] relative">
      {/* Background Image - positioned absolutely */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute h-full left-0 max-w-none top-0 w-full object-cover"
          src="/Supplier.jpg"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Label */}
        <p className="text-[15px] text-[#0d1b2a] mb-[15px] font-medium">
          For Smart Suppliers
        </p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            {/* Heading */}
            <h1 className="text-[26px] leading-[35px] font-normal text-[#0d1b2a] mb-[10px]">
              Turn Surplus Inventory into{" "}
              <span className="text-[#2ec096]">Immediate</span> Cash Flow
            </h1>

            {/* Description */}
            <p className="text-[9px] leading-[13px] font-medium text-[#0d1b2a] mb-[15px]">
              Connect with global buyers actively seeking surplus inventory. Our{" "}
              <span className="font-bold">AI-powered platform</span> matches
              your products with verified buyers, ensuring fast sales and secure
              payments.
            </p>

            {/* Buttons */}
            <div className="flex gap-2.5 mb-4">
              <button
                onClick={() => router.push("/become-supplier")}
                className="bg-[#1e3a8a] text-white rounded-[6px] px-[13px] py-[8px] text-[11px] font-medium hover:bg-[#1e3a8a]/90 transition-colors"
              >
                Start Selling Today
              </button>
              <button
                onClick={() => router.push("/for-supplier")}
                className="bg-white border border-[#1e3a8a] text-[#1e3a8a] rounded-[6px] px-[13px] py-[8px] text-[11px] font-medium hover:bg-gray-50 transition-colors"
              >
                View Success Stories
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2.5">
              <div className="flex items-center gap-1">
                <div className="w-6 h-5 flex items-center justify-center">
                  <Check className="w-4 h-4 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-[13px] text-black font-medium">
                  Free Listings
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-5 flex items-center justify-center">
                  <Check className="w-4 h-4 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-[13px] text-black font-medium">
                  Verified Buyers Only
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-5 flex items-center justify-center">
                  <Check className="w-4 h-4 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-[13px] text-black font-medium">
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
