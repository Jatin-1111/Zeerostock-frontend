"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="relative shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)]">
      {/* Background Image */}
      <div className="absolute inset-0 h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]">
        <img
          src="/landing-hero.png"
          alt="Industrial warehouse background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content - Full width container */}
      <div className="relative h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] w-full max-w-[412px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center">
        {/* Main Headline */}
        <h1 className="text-center mb-3 sm:mb-4 md:mb-5 max-w-[380px] sm:max-w-[445px] mt-[35px] sm:mt-[40px] md:mt-[45px]">
          <span className="text-[30px] sm:text-[35px] md:text-[40px] leading-[39px] sm:leading-[40px] font-extrabold">
            <span className="text-white">Transform Surplus into </span>
            <span className="text-[#2aae7a]">Revenue Today</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-white text-[12px] sm:text-[11px] md:text-[10px] leading-[25px] sm:leading-[20px] md:leading-[13px] font-semibold max-w-[325px] sm:max-w-[380px] md:max-w-[415px] mb-6 sm:mb-7 md:mb-8">
          The only B2B marketplace you need to buy, sell or broker surplus
          inventory with complete trust and transparency
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 mb-[79px] sm:mb-[85px] md:mb-[90px]">
          {isAuthenticated && user ? (
            // Logged In User - Go to Dashboard
            <>
              <Link
                href="/buyer/dashboard"
                className="w-[140px] sm:w-[150px] md:w-[160px] h-[35px] sm:h-[38px] md:h-[40px] bg-[#022778] text-white text-[11px] sm:text-[12px] md:text-[13px] font-semibold rounded-lg hover:bg-[#022778]/90 transition-colors flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/marketplace"
                className="w-[140px] sm:w-[150px] md:w-[160px] h-[35px] sm:h-[38px] md:h-[40px] bg-white text-[#2aae7a] text-[11px] sm:text-[12px] md:text-[13px] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center"
              >
                Browse Marketplace
              </Link>
            </>
          ) : (
            // Logged Out User - Signup/Explore
            <>
              <Link
                href="/become-supplier"
                className="w-[140px] sm:w-[150px] md:w-[160px] h-[35px] sm:h-[38px] md:h-[40px] bg-[#022778] text-white text-[11px] sm:text-[12px] md:text-[13px] font-semibold rounded-lg hover:bg-[#022778]/90 transition-colors flex items-center justify-center"
              >
                Start Selling
              </Link>
              <Link
                href="/signup"
                className="w-[140px] sm:w-[150px] md:w-[160px] h-[35px] sm:h-[38px] md:h-[40px] bg-white text-[#2aae7a] text-[11px] sm:text-[12px] md:text-[13px] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center"
              >
                Start Buying
              </Link>
            </>
          )}
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[38px] sm:h-[42px] md:h-[45px] flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 text-white text-[13px] sm:text-[12px] md:text-[12px] font-bold px-2">
            <span className="whitespace-nowrap">10,000+ User</span>
            <span className="whitespace-nowrap">$50M+ Volume</span>
            <span className="whitespace-nowrap">95% Success Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
