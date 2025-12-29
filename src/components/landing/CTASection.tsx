"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function CTASection() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="w-full bg-[#eefbf6] py-12">
      <div className="max-w-[1440px] mx-auto flex justify-center">
        <div className="w-[957px] h-[299px] bg-[#39ac7a] rounded-[23px] overflow-hidden flex flex-col items-center justify-center text-center">
          {/* Headline */}
          <h2 className="text-[34px] leading-normal font-semibold text-white mb-4">
            {isAuthenticated && user
              ? `Welcome back, ${user.firstName}!`
              : "Ready to Transform Your Business"}
          </h2>

          {/* Subtitle */}
          <p className="text-[17px] font-semibold text-[#374151] mb-9">
            {isAuthenticated && user
              ? "Continue exploring deals and growing your business"
              : "Join thousands of businesses already maximizing their surplus inventory value"}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-[68px]">
            {isAuthenticated && user ? (
              // Logged In User
              <>
                <Link
                  href="/marketplace"
                  className="w-[210px] h-[44px] bg-[#1e3a8a] text-white text-[17px] font-semibold rounded-[9px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center"
                >
                  Explore Marketplace
                </Link>
                <Link
                  href="/buyer/rfq"
                  className="w-[210px] h-[45px] bg-white text-[#2aae7a] text-[17px] font-semibold rounded-[9px] hover:bg-white/90 transition-colors flex items-center justify-center"
                >
                  Create RFQ
                </Link>
              </>
            ) : (
              // Logged Out User
              <>
                <Link
                  href="/signup"
                  className="w-[210px] h-[44px] bg-[#1e3a8a] text-white text-[17px] font-semibold rounded-[9px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center"
                >
                  Sign Up Free
                </Link>
                <Link
                  href="/help-support"
                  className="w-[210px] h-[45px] bg-white text-[#2aae7a] text-[17px] font-semibold rounded-[9px] hover:bg-white/90 transition-colors flex items-center justify-center"
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
