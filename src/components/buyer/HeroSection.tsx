import Link from "next/link";
import { Check } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[500px] shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)] py-[27px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt="Hero Background"
          className="absolute object-cover object-center"
          src={"/Buyer.png"}
        />
      </div>

      <div className="w-full max-w-[50vw] mr-auto h-full bg-transparent rounded-2xl p-[21px] md:p-[32px] flex flex-col justify-center items-start text-left z-10 relative">
        {/* Subtitle */}
        <p className="font-medium text-[11px] text-black mb-[11px]">
          For Smart Buyers
        </p>
        {/* Title */}
        <h1 className="font-semibold text-[35px] leading-[39px] text-[#0d1b2a] mb-[10px]">
          Source Surplus Inventory at{" "}
          <span className="text-[#2ec096]">30-60%</span> Below Market Price
        </h1>
        {/* Description */}
        <p className="text-[12px] leading-[13px] text-[#868181] mb-[16px]">
          <span className="font-medium">
            Connect with verified suppliers worldwide and access high-quality
            surplus inventory through our
          </span>{" "}
          <span className="font-extrabold">AI-powered marketplace</span>.{" "}
          <span className="font-medium">
            Reduce costs, speed up procurement, and grow your business.
          </span>
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-start justify-start gap-[11px] mb-[16px] w-full">
          <Link
            href="/signup"
            className="bg-[#1e3a8a] rounded-[6px] px-[32px] py-[8px] h-[35px] flex items-center justify-center w-full sm:w-auto"
          >
            <span className="font-montserrat font-medium text-[11px] leading-normal text-white text-left">
              Start Buying Now
            </span>
          </Link>
          <Link
            href="/helpdesk"
            className="bg-white rounded-[6px] px-[32px] py-[8px] h-[35px] flex items-center justify-center w-full sm:w-auto border-2 border-[#1e3a8a]"
          >
            <span className="font-montserrat font-medium text-[11px] leading-[11px] text-[#2aae7a] text-left">
              Request Demo
            </span>
          </Link>
        </div>
        {/* Features */}
        <div className="flex flex-col sm:flex-row items-start justify-start gap-[11px]">
          <div className="flex items-center gap-[5px]">
            <Check
              className="w-[15px] h-[15px] text-[#2ec096]"
              strokeWidth={2.5}
            />
            <span className="leading-normal text-[13px] text-black">
              Free to join
            </span>
          </div>
          <div className="flex items-center gap-[5px]">
            <Check
              className="w-[15px] h-[15px] text-[#2ec096]"
              strokeWidth={2.5}
            />
            <span className="leading-normal text-[13px] text-black">
              No hidden fees
            </span>
          </div>
          <div className="flex items-center gap-[5px]">
            <Check
              className="w-[15px] h-[15px] text-[#2ec096]"
              strokeWidth={2.5}
            />
            <span className="leading-normal text-[13px] text-black">
              Instant access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
