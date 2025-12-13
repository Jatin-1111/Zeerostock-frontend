import Link from "next/link";

const imgROIChart =
  "https://www.figma.com/api/mcp/asset/f323243e-2d89-40a3-ab5f-c615e2c3244d";

export default function ROICalculatorSectionV2() {
  return (
    <section className="bg-[#fffff] w-full py-[78px] px-[285px]">
      {/* Chart/Image */}
      <div className="relative w-[870px] h-[346px] rounded-[40px] shadow-[0px_0px_20px_0px_rgba(24,181,34,0.5)] overflow-hidden mx-auto mb-[38px]">
        <img
          alt="ROI Calculator"
          className="w-full h-full object-cover"
          src={imgROIChart}
        />
      </div>

      {/* Title */}
      <h2 className="text-center text-[45px] font-bold mb-[8px]">
        <span className="text-[#0d1b2a]">Calculate Your </span>
        <span className="text-[#063576]">ROI</span>
        <span className="text-[#0d1b2a]"> Potential</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-[24px] font-semibold text-gray-500 mb-[40px]">
        Simple, streamlined processes designed for each type of user in the
        surplus inventory ecosystem
      </p>

      {/* CTA Button */}
      <div className="flex justify-center">
        <Link
          href="/roi"
          className="bg-[#063576] text-white text-[28px] font-bold px-[110px] py-[15px] rounded-[20px] h-[82px] flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          Go to Calculator
        </Link>
      </div>
    </section>
  );
}
