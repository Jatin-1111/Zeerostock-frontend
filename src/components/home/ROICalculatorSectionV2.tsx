import Link from "next/link";

const imgROIChart =
  "https://www.figma.com/api/mcp/asset/00533af4-8948-419b-990f-2f1eed13ebcf";

export default function ROICalculatorSectionV2() {
  return (
    <section className="bg-[#eefbf6] w-full py-6 sm:py-8 md:py-[39px]">
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-[880px] mx-auto px-4">
        {/* Chart/Image */}
        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[580px] h-48 sm:h-56 md:h-[231px] rounded-xl sm:rounded-2xl md:rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] overflow-hidden mx-auto mb-3 sm:mb-4 md:mb-[19px]">
          <img
            alt="ROI Calculator"
            className="w-full h-full object-cover"
            src={imgROIChart}
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg sm:text-xl md:text-[22.5px] font-bold leading-normal mb-1.5">
          <span className="text-[#0d1b2a]">Calculate Your </span>
          <span className="text-[#063576]">ROI</span>
          <span className="text-[#0d1b2a]"> Potential</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-xs sm:text-sm md:text-[12px] font-semibold leading-normal text-[#6b7280] mb-4 sm:mb-5 md:mb-[20px] max-w-full sm:max-w-sm md:max-w-[460px] mx-auto px-4 sm:px-0">
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
