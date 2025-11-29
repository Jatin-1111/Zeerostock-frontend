"use client";

export default function VerificationImpact() {
  return (
    <div className="bg-white border-2 border-gray-900 p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Verification Impact
      </h3>

      <div className="space-y-3">
        {/* Higher Response Rate */}
        <div className="bg-green-100 border-2 border-green-600 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">3.5x</p>
          <p className="text-xs text-gray-900 font-medium">
            Higher Response Rate
          </p>
        </div>

        {/* More listing views */}
        <div className="bg-blue-100 border-2 border-blue-600 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">2.8x</p>
          <p className="text-xs text-gray-900 font-medium">
            More listing views
          </p>
        </div>

        {/* Higher conversion rate */}
        <div className="bg-pink-100 border-2 border-pink-600 p-4 text-center">
          <p className="text-3xl font-bold text-pink-600">65%</p>
          <p className="text-xs text-gray-900 font-medium">Higher conversion</p>
        </div>
      </div>
    </div>
  );
}
