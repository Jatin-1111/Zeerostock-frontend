"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="relative w-full overflow-hidden shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)]">
      {/* Background Image */}
      <div className="absolute inset-0 h-[450px]">
        <img
          src="/landing-hero.png"
          alt="Industrial warehouse background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content - Full width container */}
      <div className="relative h-[450px] w-full max-w-[960px] mx-auto px-4 flex flex-col items-center justify-center">
        {/* Main Headline */}
        <h1 className="text-center mb-3 max-w-[445px] mt-[35px]">
          <span className="text-[40px] leading-[40px] font-extrabold">
            <span className="text-white">Transform Surplus into </span>
            <span className="text-[#2aae7a]">Revenue Today</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-white text-[10px] leading-[13px] font-semibold max-w-[415px] mb-6">
          The only B2B marketplace you need to buy, sell or broker surplus
          inventory with complete trust and transparency
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mb-[79px]">
          {isAuthenticated && user ? (
            // Logged In User - Go to Dashboard
            <>
              <Link
                href="/buyer/dashboard"
                className="w-[140px] h-[35px] bg-[#022778] text-white text-[11px] font-semibold rounded-lg hover:bg-[#022778]/90 transition-colors flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/marketplace"
                className="w-[140px] h-[35px] bg-white text-[#2aae7a] text-[11px] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center"
              >
                Browse Marketplace
              </Link>
            </>
          ) : (
            // Logged Out User - Signup/Explore
            <>
              <Link
                href="/become-supplier"
                className="w-[140px] h-[35px] bg-[#022778] text-white text-[11px] font-semibold rounded-lg hover:bg-[#022778]/90 transition-colors flex items-center justify-center"
              >
                Start Selling
              </Link>
              <Link
                href="/signup"
                className="w-[140px] h-[35px] bg-white text-[#2aae7a] text-[11px] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center"
              >
                Start Buying
              </Link>
            </>
          )}
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[38px] flex items-center justify-center">
          <div className="flex items-center justify-center gap-8 text-white text-[12px] font-bold">
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
