"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function CTASection() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="w-full bg-[#eefbf6] py-16">
      <div className="max-w-[1440px] mx-auto px-20 flex justify-center">
        <div className="w-[1276px] h-[399px] bg-[#39ac7a] rounded-[30px] overflow-hidden flex flex-col items-center justify-center px-16 text-center">
          {/* Headline */}
          <h2 className="text-[45px] leading-normal font-semibold text-white mb-5 font-['Poppins']">
            {isAuthenticated && user
              ? `Welcome back, ${user.firstName}!`
              : "Ready to Transform Your Business"}
          </h2>

          {/* Subtitle */}
          <p className="text-[22px] font-semibold text-gray-700 mb-12 font-['Poppins']">
            {isAuthenticated && user
              ? "Continue exploring deals and growing your business"
              : "Join thousands of businesses already maximizing their surplus inventory value"}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-[90px]">
            {isAuthenticated && user ? (
              // Logged In User
              <>
                <Link
                  href="/marketplace"
                  className="w-[280px] h-[59px] bg-[#1E3A8A] text-white text-[22px] font-semibold rounded-xl hover:bg-[#0a2540]/90 transition-colors font-['Poppins'] flex items-center justify-center"
                >
                  Explore Marketplace
                </Link>
                <Link
                  href="/buyer/rfq"
                  className="w-[280px] h-[60px] bg-white text-[#2aae7a] text-[22px] font-semibold rounded-xl hover:bg-white/90 transition-colors font-['Poppins'] flex items-center justify-center"
                >
                  Create RFQ
                </Link>
              </>
            ) : (
              // Logged Out User
              <>
                <Link
                  href="/signup"
                  className="w-[280px] h-[59px] bg-[#1E3A8A] text-white text-[22px] font-semibold rounded-xl hover:bg-[#0a2540]/90 transition-colors font-['Poppins'] flex items-center justify-center"
                >
                  Sign Up Free
                </Link>
                <Link
                  href="/help-support"
                  className="w-[280px] h-[60px] bg-white text-[#2aae7a] text-[22px] font-semibold rounded-xl hover:bg-white/90 transition-colors font-['Poppins'] flex items-center justify-center"
                >
                  Schedule Demo
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
