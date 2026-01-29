"use client";

import Calculator from "@/components/roi/Calculator";
import InfoSection from "@/components/roi/InfoSection";

export default function ROIPage() {
  const activeTab = "buyer";

  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 sm:px-6 md:px-[40px] py-4 md:py-[16px]">
        {/* Header */}
        <div className="relative bg-white rounded-[10px] shadow-[0px_1px_5px_0px_rgba(24,181,34,0.25)] mb-4 md:mb-[16px] py-4 px-4 md:py-[15px] md:px-[25px] h-auto md:h-[109px] grid grid-cols-[auto_1fr] md:block gap-x-3 md:gap-0">
          <div
            className="md:absolute md:left-[25px] md:top-[15px] w-[37px] h-[37px] rounded-[5px] p-[7px] flex items-center justify-center flex-shrink-0"
            style={{
              backgroundImage:
                "linear-gradient(-49.04957794666714deg, rgba(55, 195, 220, 1) 1.0683%, rgba(13, 158, 156, 1) 80.051%)",
            }}
          >
            <svg
              className="w-[23px] h-[23px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 2H15C16.1046 2 17 2.89543 17 4V20C17 21.1046 16.1046 22 15 22H9C7.89543 22 7 21.1046 7 20V4C7 2.89543 7.89543 2 9 2Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 18H14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 5H13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="md:absolute md:left-[75px] md:top-[21px] text-[18px] font-semibold text-[#0d1b2a] self-center md:self-auto">
            ROI Calculator
          </h1>
          <p className="md:absolute md:left-[25px] md:top-[65px] text-[12px] font-medium text-[#9c9c9c] w-full md:w-[453px] col-span-2 md:col-auto mt-2 md:mt-0">
            Calculate your return on investment for buying or selling surplus
            inventory on Zeerostocks
          </p>
        </div>

        {/* Calculator */}
        <div className="mb-6 md:mb-[24px]">
          <Calculator type={activeTab} />
        </div>

        {/* Info Section Title */}
        <div className="text-center mb-4 md:mb-[16px]">
          <h2 className="text-[18px] font-semibold text-[#0d1b2a] mb-[7px]">
            Understanding ROI Calculations
          </h2>
          <p className="text-[10px] font-medium text-[#9c9c9c] px-2 md:px-0">
            Learn how our calculator helps you make informed decisions
          </p>
        </div>

        {/* Info Section */}
        <InfoSection />
      </div>
    </div>
  );
}
