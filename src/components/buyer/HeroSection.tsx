import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[500px] shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)] py-[27px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          alt="Hero Background"
          fill
          className="object-cover object-center sm:hidden"
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Mobile/mobile-buyer.png"
          priority
        />
        <Image
          alt="Hero Background"
          fill
          className="object-cover object-center hidden sm:block"
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Buyer.png"
          priority
        />
      </div>

      <div className="max-w-[1080px] m-auto bg-transparent rounded-2xl flex flex-col justify-center items-start text-left z-10 relative h-full">
        {/* Subtitle */}
        <p className="font-medium text-[11px] md:text-black mb-[11px]">
          For Smart Buyers
        </p>
        {/* Title */}
        <h1 className="font-semibold text-[35px] leading-[39px] md:text-[#0d1b2a] mb-[10px] max-w-lg">
          Source Surplus Inventory at{" "}
          <span className="text-[#2ec096]">30-60%</span> Below Market Price
        </h1>
        {/* Description */}
        <p className="text-[12px] leading-[13px] md:text-[#868181] mb-[16px] max-w-md">
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
        <div className="flex flex-col sm:flex-row items-center justify-center mx-auto gap-[11px] mb-[16px] ">
          <Link
            href="/signup"
            className="bg-[#1e3a8a] rounded-[6px] px-[32px] py-[8px] h-[35px] flex items-center justify-center w-full sm:w-auto"
          >
            <span className="font-montserrat font-medium text-[11px] leading-normal text-white text-center">
              Get Started
            </span>
          </Link>
          <Link
            href="/marketplace"
            className="bg-white rounded-[6px] px-[32px] py-[8px] h-[35px] flex items-center justify-center w-full sm:w-auto"
          >
            <span className="font-montserrat font-medium text-[11px] leading-[11px] text-[#1e3a8a] text-center">
              Explore Marketplace
            </span>
          </Link>
        </div>
        {/* Features */}
        <div className="flex flex-row items-center justify-center mx-auto mt-14 gap-[11px]">
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
