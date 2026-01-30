import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Mobile/mobile-agent.png"
          alt=""
          fill
          className="object-cover sm:hidden"
          priority
        />
        <Image
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Agent.jpg"
          alt=""
          fill
          className="object-cover hidden sm:block"
          priority
        />
      </div>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="max-w-[1080px] mx-auto relative z-10 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-tight sm:leading-tight md:leading-[51.33px] text-white">
            Partner with <span className="text-[#2ec096]">Zeerostock</span>
            <br />
            Earn as an Agent
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-[12px] font-medium leading-relaxed sm:leading-[16.67px] text-white max-w-full sm:max-w-[467px]">
            Join our agent network and earn recurring commissions by onboarding
            suppliers to the Zeerostock platform. No upfront costs, full
            training provided, and unlimited earning potential.
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-1.5 md:mt-2">
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-[3.33px]">
              <CheckCircle2 className="w-6 h-5 sm:w-7 sm:h-6 md:w-[34px] md:h-[26.67px] text-white flex-shrink-0" />
              <p className="text-sm sm:text-base md:text-[16.67px] font-medium text-white">
                3-5% recurring commission
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-[3.33px]">
              <CheckCircle2 className="w-6 h-5 sm:w-7 sm:h-6 md:w-[34px] md:h-[26.67px] text-white flex-shrink-0" />
              <p className="text-sm sm:text-base md:text-[16.67px] font-medium text-white">
                No hidden fees
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-[3.33px]">
              <CheckCircle2 className="w-6 h-5 sm:w-7 sm:h-6 md:w-[34px] md:h-[26.67px] text-white flex-shrink-0" />
              <p className="text-sm sm:text-base md:text-[16.67px] font-medium text-white">
                Instant access
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-2 sm:mt-3 md:mt-2 hidden md:block">
            <Link
              href="/helpdesk"
              className="inline-flex items-center justify-center px-8 sm:px-12 md:px-[60px] py-2 sm:py-2.5 md:py-[10px] bg-[#1e3a8a] text-white text-sm sm:text-base md:text-[14.67px] font-medium rounded-[8px] hover:bg-[#1e3a8acc] transition-colors"
            >
              Apply Now
            </Link>
          </div>
          <div className="md:hidden mt-2 sm:mt-3 flex flex-col gap-2 sm:gap-3 w-full max-w-[60%] mx-auto">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-2 sm:py-2.5 bg-[#1e3a8a] text-white text-sm sm:text-base font-medium rounded-[8px] hover:bg-[#1e3a8acc] transition-colors w-full"
            >
              Get Started
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center px-8 py-2 sm:py-2.5 bg-white text-[#1e3a8a] text-sm sm:text-base font-medium rounded-[8px] hover:bg-gray-50 transition-colors w-full"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
