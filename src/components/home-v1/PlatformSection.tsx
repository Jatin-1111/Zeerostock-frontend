export default function PlatformSection() {
  return (
    <section className="bg-white p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          One Platform, Two Success Stories
        </h2>
        <p className="text-gray-500 text-lg">
          Discover how Zeerostock creates value for every participant in the
          surplus inventory ecosystem
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        {/* Suppliers */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Suppliers
          </h3>
          <p className="text-gray-500 mb-3">
            Transform surplus inventory into
            <br />
            revenue streams
          </p>
          <p className="text-gray-900 font-medium">
            Reduce holding costs & maximize returns
          </p>
        </div>

        {/* Buyers */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Buyers</h3>
          <p className="text-gray-500 mb-3">
            Access quality inventory at competitive
            <br />
            prices
          </p>
          <p className="text-gray-900 font-medium">
            Build reliable supply chains with verified partners
          </p>
        </div>
      </div>
    </section>
  );
}
