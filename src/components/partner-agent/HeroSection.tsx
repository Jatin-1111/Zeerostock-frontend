import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Agent.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-[1080px] mx-auto relative z-10">
        <div className="flex flex-col gap-5">
          {/* Heading */}
          <h1 className="text-[40px] font-semibold leading-[51.33px] text-[#0d1b2a]">
            Partner with <span className="text-[#2ec096]">Zeerostock</span>
            <br />
            Earn as an Agent
          </h1>

          {/* Description */}
          <p className="text-[12px] font-semibold leading-[16.67px] text-[#868181] max-w-[467px]">
            Join our agent network and earn recurring commissions by onboarding
            suppliers to the Zeerostock platform. No upfront costs, full
            training provided, and unlimited earning potential.
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-[3.33px]">
              <CheckCircle2 className="w-[34px] h-[26.67px] text-[#2ec096]" />
              <p className="text-[16.67px] font-medium text-black">
                3-5% recurring commission
              </p>
            </div>
            <div className="flex items-center gap-[3.33px]">
              <CheckCircle2 className="w-[34px] h-[26.67px] text-[#2ec096]" />
              <p className="text-[16.67px] font-medium text-black">
                No hidden fees
              </p>
            </div>
            <div className="flex items-center gap-[3.33px]">
              <CheckCircle2 className="w-[34px] h-[26.67px] text-[#2ec096]" />
              <p className="text-[16.67px] font-medium text-black">
                Instant access
              </p>
            </div>
          </div>

          {/* Apply Now Button */}
          <div className="mt-2">
            <Link
              href="/helpdesk"
              className="inline-flex items-center justify-center px-[60px] py-[10px] bg-[#1e3a8a] text-white text-[14.67px] font-medium rounded-[8px] hover:bg-[#1e3a8acc] transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
