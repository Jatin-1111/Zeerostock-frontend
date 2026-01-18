import Link from "next/link";
import Image from "next/image";

export default function ROICalculatorSectionV2() {
  return (
    <section className="bg-[#eefbf6] w-full py-6 sm:py-8 md:py-[39px]">
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-[880px] mx-auto px-4">
        {/* Chart/Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-[350px] overflow-hidden mb-3 sm:mb-4 md:mb-[19px]">
          <Image
            alt="ROI Calculator"
            className="object-cover"
            src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/ROI.png"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
          />
        </div>
        {/* Title */}
        <h2 className="text-center text-lg sm:text-xl md:text-[22.5px] font-bold leading-normal mb-1.5">
          <span className="text-[#0d1b2a]">Calculate Your </span>
          <span className="text-[#063576]">ROI</span>
          <span className="text-[#0d1b2a]"> Potential</span>
        </h2>
        {/* Subtitle */}
        <p className="text-center text-xs sm:text-sm md:text-[12px] font-semibold leading-normal text-[#6b7280] mb-4 sm:mb-5 md:mb-[20px]">
          Simple, streamlined processes designed for each type of user in the
          surplus inventory ecosystem
        </p>
        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/roi"
            className="bg-[#063576] text-white text-sm sm:text-base md:text-[14px] font-bold px-8 sm:px-12 md:px-[55px] py-2 sm:py-2.5 md:py-[7.5px] rounded-lg sm:rounded-xl md:rounded-[10px] h-10 sm:h-11 md:h-[41px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            Go to Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
