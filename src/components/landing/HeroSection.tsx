"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="relative w-full overflow-hidden shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)]">
      {/* Background Image */}
      <div className="absolute inset-0 h-[675px]">
        <img
          src="https://www.figma.com/api/mcp/asset/83a03590-e178-418c-b034-d2e6bc8b9a69"
          alt="Industrial warehouse background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content - Full width container */}
      <div className="relative h-[675px] w-full max-w-[1440px] mx-auto px-6 flex flex-col items-center justify-center">
        {/* Main Headline - 80px reduced by 25% = 60px, top: 70px reduced by 25% = 52.5px */}
        <h1 className="text-center mb-4 max-w-[667px] mt-[52px]">
          <span className="text-[60px] leading-[60px] font-extrabold font-['Poppins']">
            <span className="text-white">Transform Surplus into </span>
            <span className="text-[#2aae7a]">Revenue Today</span>
          </span>
        </h1>

        {/* Subtitle - 20px reduced by 25% = 15px */}
        <p className="text-center text-white text-[15px] leading-[19px] font-semibold max-w-[622px] mb-9 font-['Poppins']">
          The only B2B marketplace you need to buy, sell or broker surplus
          inventory with complete trust and transparency
        </p>

        {/* CTA Buttons - 280x70 reduced by 25% = 210x52.5, gap 8*0.75=6, text 22*0.75=16.5 */}
        <div className="flex items-center gap-6 mb-[118px]">
          {isAuthenticated && user ? (
            // Logged In User - Go to Dashboard
            <>
              <Link
                href="/buyer/dashboard"
                className="w-[210px] h-[52px] bg-[#022778] text-white text-[17px] font-semibold rounded-lg hover:bg-[#022778]/90 transition-colors font-['Poppins'] flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/marketplace"
                className="w-[210px] h-[52px] bg-white text-[#2aae7a] text-[17px] font-semibold rounded-lg hover:bg-white/90 transition-colors font-['Poppins'] flex items-center justify-center"
              >
                Browse Marketplace
              </Link>
            </>
          ) : (
            // Logged Out User - Signup/Explore
            <>
              <Link
                href="/become-supplier"
                className="w-[210px] h-[52px] bg-[#022778] text-white text-[17px] font-semibold rounded-lg hover:bg-[#022778]/90 transition-colors font-['Poppins'] flex items-center justify-center"
              >
                Start Selling
              </Link>
              <Link
                href="/signup"
                className="w-[210px] h-[52px] bg-white text-[#2aae7a] text-[17px] font-semibold rounded-lg hover:bg-white/90 transition-colors font-['Poppins'] flex items-center justify-center"
              >
                Start Buying
              </Link>
            </>
          )}
        </div>

        {/* Stats Bar - 24px reduced by 25% = 18px, gap 16*0.75=12 */}
        <div className="absolute bottom-0 left-0 right-0 h-[57px] flex items-center justify-center">
          <div className="flex items-center justify-center gap-12 text-white text-[18px] font-bold font-['Poppins']">
            <span>10,000 Businesses Connected</span>
            <span>$50M+ Inventory Traded</span>
            <span>97% Success Rate</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
