export default function ROICalculatorSection() {
  return (
    <section className="bg-white p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Calculate Your ROI Potential
        </h2>
        <p className="text-gray-500 text-lg">
          See how much you could save and earn by optimizing your surplus
          inventory management
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Video Player Placeholder */}
        <div className="border-2 border-gray-900 rounded bg-white overflow-hidden">
          {/* Video Area */}
          <div className="aspect-video bg-white flex items-center justify-center">
            <div className="text-center text-gray-300">
              <svg
                className="w-24 h-24 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Video Controls */}
          <div className="bg-white border-t-2 border-gray-900 p-3 flex items-center gap-3">
            {/* Play Button */}
            <button className="shrink-0 w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg
                className="w-4 h-4 text-gray-900 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            {/* Progress Bar */}
            <div className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-gray-900 w-0"></div>
            </div>

            {/* Volume */}
            <button className="shrink-0 w-6 h-6 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            </button>

            {/* Fullscreen */}
            <button className="shrink-0 w-6 h-6 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-white transition-colors">
            Go to calculator
          </button>
        </div>
      </div>
    </section>
  );
}
