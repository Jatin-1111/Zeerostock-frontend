"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="relative w-full h-[751px] mt-[93px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/landing-hero.png"
          alt="Industrial warehouse background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1440px] mx-auto px-6 flex flex-col items-center justify-center">
        {/* Main Headline */}
        <h1 className="text-center mb-6 max-w-[850px]">
          <span className="text-[100px] leading-[1.1] font-extrabold font-['Poppins']">
            <span className="text-white">Transform Surplus </span>
            <span className="text-white">into </span>
            <span className="text-[#2aae7a]">Revenue Today</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-white text-[20px] leading-[25px] font-semibold max-w-[830px] mb-12 font-['Poppins']">
          The only B2B marketplace you need to buy, sell or broker surplus
          inventory with complete trust and transparency
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-8 mb-32">
          {isAuthenticated && user ? (
            // Logged In User - Go to Dashboard
            <>
              <Link
                href="/buyer/dashboard"
                className="w-[280px] h-[70px] bg-[#022778] text-white text-[22px] font-semibold rounded-xl hover:bg-[#022778]/90 transition-colors font-['Poppins'] flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/marketplace"
                className="w-[280px] h-[70px] bg-white text-[#2aae7a] text-[22px] font-semibold rounded-xl hover:bg-white/90 transition-colors font-['Poppins'] flex items-center justify-center"
              >
                Browse Marketplace
              </Link>
            </>
          ) : (
            // Logged Out User - Signup/Explore
            <>
              <Link
                href="/become-supplier"
                className="w-[280px] h-[70px] bg-[#022778] text-white text-[22px] font-semibold rounded-xl hover:bg-[#022778]/90 transition-colors font-['Poppins'] flex items-center justify-center"
              >
                Start Selling
              </Link>
              <Link
                href="/signup"
                className="w-[280px] h-[70px] bg-white text-[#2aae7a] text-[22px] font-semibold rounded-xl hover:bg-white/90 transition-colors font-['Poppins'] flex items-center justify-center"
              >
                Start Buying
              </Link>
            </>
          )}
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[76px] flex items-center justify-center">
          <div className="flex items-center justify-center gap-16 text-white text-[24px] font-bold font-['Poppins']">
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
