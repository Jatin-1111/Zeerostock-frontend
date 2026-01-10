import Link from "next/link";

const imgROIChart =
  "https://www.figma.com/api/mcp/asset/00533af4-8948-419b-990f-2f1eed13ebcf";

export default function ROICalculatorSectionV2() {
  return (
    <section className="bg-[#eefbf6] w-full py-[39px]">
      <div className="max-w-[880px] mx-auto px-4">
        {/* Chart/Image */}
        <div className="relative w-[580px] h-[231px] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] overflow-hidden mx-auto mb-[19px]">
          <img
            alt="ROI Calculator"
            className="w-full h-full object-cover"
            src={imgROIChart}
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-[22.5px] font-bold leading-normal mb-1.5">
          <span className="text-[#0d1b2a]">Calculate Your </span>
          <span className="text-[#063576]">ROI</span>
          <span className="text-[#0d1b2a]"> Potential</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[12px] font-semibold leading-normal text-[#6b7280] mb-[20px] max-w-[460px] mx-auto">
          Simple, streamlined processes designed for each type of user in the
          surplus inventory ecosystem
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/roi"
            className="bg-[#063576] text-white text-[14px] font-bold px-[55px] py-[7.5px] rounded-[10px] h-[41px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            Go to Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
