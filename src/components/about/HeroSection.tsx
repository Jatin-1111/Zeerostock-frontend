import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-auto sm:h-[400px] md:h-[450px] lg:h-[500px] shadow-md overflow-hidden">
      {/* Mobile - Background Image */}
      <div className="relative w-full sm:hidden">
        <Image
          alt=""
          width={800}
          height={1000}
          className="w-full h-auto"
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Mobile/mobile-about-us.png"
          priority
        />

        {/* Mobile - Content Overlay */}
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center px-4 pt-8 gap-2 h-[350px] gap-5">
          <h1 className="font-semibold text-[28px] leading-[32px] text-center text-[#0d1b2a]">
            Transforming <span className="text-[#2ec096]">Global Surplus</span>{" "}
            Trade
          </h1>
          <p className="font-semibold text-[11px] leading-[16px] text-center text-[#868181] max-w-xs">
            Connect suppliers, buyers and agents with trust, transparency and
            speed
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <Link
              href="/signup"
              className="bg-[#1e3a8a] text-white font-medium text-[11px] px-4 py-2 rounded-lg hover:bg-[#1e3a8a]/90 transition-colors text-center"
            >
              Get Started
            </Link>
            <Link
              href="/marketplace"
              className="bg-white text-[#1e3a8a] font-medium text-[11px] px-4 py-2 rounded-lg border-2 border-[#1e3a8a] hover:bg-gray-50 transition-colors text-center"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop - Background Image */}
      <div className="absolute inset-0 hidden sm:block">
        <Image
          alt=""
          fill
          className="object-cover"
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/About us.jpg"
          priority
        />
      </div>

      {/* Desktop - Content Overlay */}
      <div className="relative z-10 hidden sm:flex flex-col justify-center items-start h-full px-6 md:px-8 lg:px-12 xl:px-16 gap-3 md:gap-4 lg:gap-5 max-w-[550px]">
        <h1 className="font-semibold text-[36px] md:text-[42px] lg:text-[40px] leading-[32px] md:leading-[37px] lg:leading-[44px] xl:leading-[51px] text-[#0d1b2a]">
          Transforming <span className="text-[#2ec096]">Global Surplus</span>{" "}
          Trade
        </h1>
        <p className="font-semibold text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] leading-[16px] md:leading-[18px] lg:leading-[20px] xl:leading-[22px] text-[#868181]">
          Connect suppliers, buyers and agents with trust, transparency and
          speed
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-2 lg:gap-3 mt-1 lg:mt-2">
          <Link
            href="/signup"
            className="bg-[#1e3a8a] text-white font-medium text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-3.5 md:px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 rounded-lg hover:bg-[#1e3a8a]/90 transition-colors"
          >
            Join Our Mission
          </Link>
          <Link
            href="/contact"
            className="bg-white text-[#1e3a8a] font-medium text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-3.5 md:px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 rounded-lg border-2 border-[#1e3a8a] hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
