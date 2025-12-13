"use client";

import { ChevronDown, Filter, Search } from "lucide-react";

const imgHeroBackground =
  "https://www.figma.com/api/mcp/asset/5bd287c3-4c2c-4c09-8256-b56732d470e4";
const imgFloatingImage =
  "https://www.figma.com/api/mcp/asset/f630ba7a-2110-4476-be94-b4cc3e985e05";

export default function HeroSectionV2() {
  return (
    <section className="relative w-full h-[777px] shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)]">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute h-[128.6%] left-0 max-w-none top-[-1.05%] w-full object-cover"
          src={imgHeroBackground}
        />
      </div>

      {/* Floating Image - Right Side */}
      <div className="absolute right-[77px] top-[419px] bg-[#eeffef] rounded-[60px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)] p-[10px]">
        <img
          alt=""
          className="w-[54px] h-[54px] object-cover rounded-full"
          src={imgFloatingImage}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center pt-[83px]">
        {/* Headline */}
        <h1 className="text-center w-[1015px] mb-[20px]">
          <span className="text-[80px] leading-[93px] text-[#0d1b2a] font-medium">
            Unlock Hidden Vale in{" "}
          </span>
          <span className="text-[80px] leading-[93px] text-[#2ec096] font-medium">
            Surplus Inventory
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[20px] leading-[25px] text-[#868181] text-center font-semibold w-[1015px]">
          Connect suppliers, buyers, and agents with trust, transparency, and
          speed.
        </p>

        {/* Search Bar */}
        <div className="mt-[57px] bg-[rgba(251,251,251,0.65)] rounded-[50px] shadow-[0px_0px_40.7px_0px_rgba(0,0,0,0.25)] px-[25px] py-[10px] flex items-center gap-[60px]">
          {/* Left Section - Category Dropdown */}
          <div className="flex items-center gap-[10px]">
            <span className="text-[22px] font-semibold text-gray-700 opacity-80">
              All
            </span>
            <ChevronDown className="w-[35px] h-[35px] text-gray-700 opacity-80" />
            <div className="h-[45px] w-[1px] bg-gray-300 mx-[13px]" />
            <span className="text-[19px] font-medium text-gray-700 opacity-80 pl-[10px]">
              Search Industrial Equipment, Electronics, etc
            </span>
          </div>

          {/* Right Section - Filter and Search */}
          <div className="flex items-center gap-[15px]">
            <div className="h-[45px] w-[1px] bg-gray-300" />
            <Filter className="w-[35px] h-[35px] text-gray-700 opacity-80" />
            <div className="h-[45px] w-[1px] bg-gray-300" />
            <span className="text-[24px] font-medium text-gray-700 opacity-80 w-[84px] text-center">
              Search
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-[60px] flex gap-[23px]">
          <button className="bg-[#022778] text-white text-[22px] font-semibold rounded-[12px] h-[70px] w-[280px] flex items-center justify-center hover:opacity-90 transition-opacity">
            Get Started
          </button>
          <button className="bg-white text-[#2aae7a] text-[22px] font-semibold rounded-[12px] h-[70px] w-[280px] flex items-center justify-center hover:opacity-90 transition-opacity">
            Explore Marketplace
          </button>
        </div>

        {/* Stats Bar */}
        <div className="mt-[135px] text-center">
          <p className="text-[24px] font-bold text-[#c8c8c8]">
            10,000 Businesses Connected &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            $50M+ Inventory Traded &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 97%
            Success Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 24/7 Support
          </p>
        </div>
      </div>
    </section>
  );
}
