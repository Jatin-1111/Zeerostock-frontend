"use client";

import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-[70px] relative">
      {/* Background Image - positioned absolutely */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          alt=""
          fill
          className="object-cover object-center sm:hidden"
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Mobile/mobile-supplier.png"
          priority
        />
        <Image
          alt=""
          fill
          className="object-cover object-center hidden sm:block"
          src="/Supplier_New.png"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1080px] mx-auto">
        {/* Top Label */}
        <p className="text-[20.25px] md:text-[#0d1b2a] mb-[15px] font-medium">
          For Smart Suppliers
        </p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
          {/* Left Content */}
          <div className="text-left">
            {/* Heading */}
            <h1 className="text-[35.1px] leading-[47.25px] font-normal md:text-[#0d1b2a] mb-[10px]">
              Turn Surplus Inventory into{" "}
              <span className="text-[#2ec096]">Immediate</span> Cash Flow
            </h1>

            {/* Description */}
            <p className="text-[12.15px] leading-[17.55px] font-medium md:text-[#0d1b2a] mb-[15px]">
              Connect with global buyers actively seeking surplus inventory. Our{" "}
              <span className="font-bold">AI-powered platform</span> matches
              your products with verified buyers, ensuring fast sales and secure
              payments.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-center md:justify-start">
              <button
                onClick={() => router.push("/signup")}
                className="bg-[#1e3a8a] text-white rounded-[6px] px-[13px] py-[8px] text-[14.85px] font-medium hover:bg-[#1e3a8a]/90 transition-colors w-full sm:w-auto"
              >
                Start Selling Today
              </button>
              <button
                onClick={() => router.push("/for-supplier")}
                className="bg-white border border-[#1e3a8a] text-[#1e3a8a] rounded-[6px] px-[13px] py-[8px] text-[14.85px] font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                View Success Stories
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-row flex-wrap gap-3 sm:gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-[3px]">
                <div className="w-[25px] h-[20px] flex items-center justify-center">
                  <BadgeCheck
                    className="w-[15px] h-[15px] text-[#00B14F]"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[17.55px] md:text-black font-medium">
                  Free Listings
                </span>
              </div>
              <div className="flex items-center gap-[3px]">
                <div className="w-[25px] h-[20px] flex items-center justify-center">
                  <BadgeCheck
                    className="w-[15px] h-[15px] text-[#00B14F]"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[17.55px] md:text-black font-medium">
                  Verified Buyers Only
                </span>
              </div>
              <div className="flex items-center gap-[3px]">
                <div className="w-[25px] h-[20px] flex items-center justify-center">
                  <BadgeCheck
                    className="w-[15px] h-[15px] text-[#00B14F]"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[17.55px] md:text-black font-medium">
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
