export default function HeroSection() {
  return (
    <section className="relative w-full bg-linear-to-b from-gray-50 to-white py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Surplus Into
            <br />
            Revenue Today
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The only B2B marketplace you need to buy, sell, or broker surplus
            inventory
            <br />
            with complete trust and transparency.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors flex items-center gap-2">
            Start Selling
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button className="px-8 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors flex items-center gap-2">
            Start Buying
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 text-sm text-gray-600 mb-8">
          <div className="text-center">
            <span className="font-semibold">10,000+ Users</span>
          </div>
          <div className="text-center">
            <span className="font-semibold">$50M+ Volume</span>
          </div>
          <div className="text-center">
            <span className="font-semibold">95% Success Rate</span>
          </div>
        </div>

        <div className="flex justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
