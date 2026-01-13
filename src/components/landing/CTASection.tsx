"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full bg-[#eefbf6] py-8 px-4 sm:px-6">
      <div className="max-w-[960px] mx-auto flex justify-center">
        {/* 1. Removed fixed width/height. Used max-w for desktop limit.
          2. Added padding (p-6 md:p-10) to let content breathe.
          3. h-auto allows the box to grow if text wraps.
        */}
        <div className="w-full max-w-[638px] h-auto bg-[#39ac7a] rounded-[15px] overflow-hidden flex flex-col items-center justify-center text-center p-6 md:py-10">
          {/* Headline: Responsive text size */}
          <h2 className="text-xl md:text-2xl leading-normal font-semibold text-white mb-3">
            Ready to Transform Your Business
          </h2>

          {/* Subtitle: Bumped text size for readability on mobile */}
          <p className="text-xs md:text-xs font-semibold text-[#374151] mb-6 max-w-sm md:max-w-none">
            Join thousands of businesses already maximizing their surplus
            inventory value
          </p>

          {/* CTA Buttons Container: Stack on mobile (flex-col), Row on desktop (md:flex-row) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[45px] w-full sm:w-auto">
            <Link
              href="/signup"
              className="w-full sm:w-[140px] py-3 sm:py-0 sm:h-[35px] bg-[#1e3a8a] text-white text-xs md:text-xs font-semibold rounded-[6px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center"
            >
              Sign Up Free
            </Link>
            <Link
              href="/helpdesk"
              className="w-full sm:w-[140px] py-3 sm:py-0 sm:h-[35px] bg-white text-[#2aae7a] text-xs md:text-xs font-semibold rounded-[6px] hover:bg-white/90 transition-colors flex items-center justify-center"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
