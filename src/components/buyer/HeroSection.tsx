import Link from "next/link";
import { Check } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[500px] shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)] py-10">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt="Hero Background"
          className="absolute h-full w-full object-cover"
          src={"/buyer.jpg"}
        />
      </div>

      <div className="w-full max-w-3xl bg-transparent rounded-2xl p-8 md:p-12 flex flex-col items-start text-left z-10 relative">
        {/* Subtitle */}
        <p className="font-medium text-[16.5px] text-black mb-[16.5px]">
          For Smart Buyers
        </p>
        {/* Title */}
        <h1 className="font-semibold text-[39px] leading-[57.75px] text-[#0d1b2a] mb-[15px]">
          Source Surplus Inventory at{" "}
          <span className="text-[#2ec096]">30-60%</span> Below Market Price
        </h1>
        {/* Description */}
        <p className="text-[13.5px] leading-[18.75px] text-[#868181] mb-6">
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
        <div className="flex flex-col sm:flex-row items-start justify-start gap-4 mb-6 w-full">
          <Link
            href="/signup"
            className="bg-[#1e3a8a] rounded-[9px] px-12 py-[11.25px] h-[52.5px] flex items-center justify-center w-full sm:w-auto"
          >
            <span className="font-montserrat font-medium text-[16.5px] leading-normal text-white text-left">
              Start Buying Now
            </span>
          </Link>
          <Link
            href="/helpdesk"
            className="bg-white rounded-[9px] px-12 py-[11.25px] h-[52.5px] flex items-center justify-center w-full sm:w-auto border-2 border-[#1e3a8a]"
          >
            <span className="font-montserrat font-medium text-[16.5px] leading-[16.5px] text-[#2aae7a] text-left">
              Request Demo
            </span>
          </Link>
        </div>
        {/* Features */}
        <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
          <div className="flex items-center gap-2">
            <Check
              className="w-[22.5px] h-[22.5px] text-[#2ec096]"
              strokeWidth={2.5}
            />
            <span className="leading-normal text-[18.75px] text-black">
              Free to join
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check
              className="w-[22.5px] h-[22.5px] text-[#2ec096]"
              strokeWidth={2.5}
            />
            <span className="leading-normal text-[18.75px] text-black">
              No hidden fees
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check
              className="w-[22.5px] h-[22.5px] text-[#2ec096]"
              strokeWidth={2.5}
            />
            <span className="leading-normal text-[18.75px] text-black">
              Instant access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
