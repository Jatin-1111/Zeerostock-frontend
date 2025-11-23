export default function HeroSectionV1() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Content */}
      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Unlock Hidden Value In
            <br />
            Surplus Inventory
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Connect suppliers, buyers, and agents with AI-type of matching,
            real-time data, and social
          </p>

          <div className="flex flex-col sm:flex-row gap-0 justify-center items-stretch mb-6 max-w-4xl mx-auto border-2 border-gray-300 rounded overflow-hidden bg-white shadow-sm">
            {/* All dropdown */}
            <button className="px-4 py-3 border-r-2 border-gray-300 bg-white hover:bg-white flex items-center gap-2 font-medium text-gray-700">
              All
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search industrial equipment, electronics, raw materials..."
              className="flex-1 px-4 py-3 border-0 focus:outline-none focus:ring-0 text-gray-600"
            />

            {/* Filter button */}
            <button className="px-4 py-3 border-l-2 border-gray-300 bg-white hover:bg-white">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>

            {/* Search button */}
            <button className="px-8 py-3 bg-white border-l-2 border-gray-300 font-semibold text-gray-700 hover:bg-white transition-colors whitespace-nowrap">
              Search
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded-lg  font-semibold hover:bg-white transition-colors flex items-center gap-2">
              Get Started
              <svg
                className="w-4 h-4"
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
            <button className="px-6 py-2 bg-gray-900 border-2 border-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Explore Marketplace
            </button>
          </div>

          {/* Down arrow */}
          <div className="mt-8">
            <svg
              className="w-8 h-8 mx-auto text-gray-400"
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
      </div>
    </section>
  );
}
