"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full bg-[#eefbf6] py-8">
      <div className="max-w-[960px] mx-auto flex justify-center">
        <div className="w-[638px] h-[199px] bg-[#39ac7a] rounded-[15px] overflow-hidden flex flex-col items-center justify-center text-center">
          {/* Headline */}
          <h2 className="text-[23px] leading-normal font-semibold text-white mb-3">
            Ready to Transform Your Business
          </h2>

          {/* Subtitle */}
          <p className="text-[11px] font-semibold text-[#374151] mb-6">
            Join thousands of businesses already maximizing their surplus
            inventory value
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-[45px]">
            <Link
              href="/signup"
              className="w-[140px] h-[29px] bg-[#1e3a8a] text-white text-[11px] font-semibold rounded-[6px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center"
            >
              Sign Up Free
            </Link>
            <Link
              href="/helpdesk"
              className="w-[140px] h-[30px] bg-white text-[#2aae7a] text-[11px] font-semibold rounded-[6px] hover:bg-white/90 transition-colors flex items-center justify-center"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
