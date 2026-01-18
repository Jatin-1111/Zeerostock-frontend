import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] shadow-md overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          alt=""
          fill
          className="object-cover"
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/About us.jpg"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 gap-2 sm:gap-3 md:gap-4 lg:gap-5 ml-4 sm:ml-8 md:ml-12 lg:ml-16">
        <h1 className="font-semibold text-[32px] sm:text-[36px] md:text-[42px] lg:text-[40px] leading-[28px] sm:leading-[32px] md:leading-[37px] lg:leading-[44px] xl:leading-[51px] text-center text-[#0d1b2a] max-w-[270px] sm:max-w-[320px] md:max-w-[390px] lg:max-w-[450px]">
          Transforming <span className="text-[#2ec096]">Global Surplus</span>{" "}
          Trade
        </h1>
        <p className="font-semibold text-[5px] sm:text-[6px] md:text-[8px] lg:text-[11px] xl:text-[14px] leading-[9px] sm:leading-[11px] md:leading-[12px] lg:leading-[15px] xl:leading-[17px] text-center text-[#868181] max-w-[270px] sm:max-w-[320px] md:max-w-[390px] lg:max-w-[450px]">
          Connect suppliers, buyers and agents with trust, transparency and
          speed
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-2 lg:gap-3 mt-1 lg:mt-2 ml-8 sm:ml-12 md:ml-12 lg:ml-10">
          <Link
            href="/signup"
            className="bg-[#1e3a8a] text-white font-medium text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-3 sm:px-3.5 md:px-4 lg:px-5 xl:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-lg hover:bg-[#1e3a8a]/90 transition-colors"
          >
            Join Our Mission
          </Link>
          <Link
            href="/careers"
            className="bg-white text-[#1e3a8a] font-medium text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] px-3 sm:px-3.5 md:px-4 lg:px-5 xl:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-lg border-2 border-[#1e3a8a] hover:bg-gray-50 transition-colors"
          >
            View Careers
          </Link>
        </div>
      </div>
    </section>
  );
}
