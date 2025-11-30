"use client";

import Calculator from "@/components/roi/Calculator";
import InfoSection from "@/components/roi/InfoSection";

export default function ROIPage() {
  const activeTab = "buyer";

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8 px-6 py-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-gray-100 border border-gray-900 rounded-full mb-4">
            <svg
              className="w-4 h-4 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-900">
              ROI Calculator
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            ROI Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your return on investment for buying or selling excess
            inventory via Zeerostock
          </p>
        </div>

        <div className="bg-black h-0.5 mb-12" />

        {/* Calculator */}
        <div className="bg-white px-6 py-8 border-2 border-gray-900 rounded mb-12 max-w-7xl mx-auto">
          <Calculator type={activeTab} />
        </div>

        {/* Info Section */}
        <InfoSection />
      </div>
    </div>
  );
}
