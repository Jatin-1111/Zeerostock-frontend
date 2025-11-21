export default function MarketplaceCTASection() {
  return (
    <div className="grid md:grid-cols-2 p-6 gap-6">
      {/* Become a Supplier */}
      <div className="bg-white border-2 border-gray-200 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Become a Supplier
        </h3>
        <p className="text-gray-600 mb-4">
          List your surplus inventory and connect with thousands of buyers.
        </p>
        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Get Started
        </button>
      </div>

      {/* Can't find what you need */}
      <div className="bg-white border-2 border-gray-200 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Can&apos;t Find What You Need?
        </h3>
        <p className="text-gray-600 mb-4">
          Tell us what you&apos;re looking for and let AI do the rest.
        </p>
        <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors">
          Submit Request
        </button>
      </div>
    </div>
  );
}
