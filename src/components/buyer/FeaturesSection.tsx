export default function FeaturesSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Smart Procurement
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to source, evaluate, and purchase surplus
            inventory efficiently
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Advanced Search & Filtering
            </h3>
            <p className="text-gray-600">
              Find exactly what you need with intelligent filters including
              specifications, location, condition, and price range.
            </p>
          </div>
          <div className="p-6">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Real-Time Market Data
            </h3>
            <p className="text-gray-600">
              Access current market data and price trends with supplier
              availability to make informed decisions.
            </p>
          </div>
          <div className="p-6">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Supplier Verification
            </h3>
            <p className="text-gray-600">
              All suppliers undergo rigorous verification ensuring business
              licenses, financial stability, and quality standards.
            </p>
          </div>
          <div className="p-6">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Bulk Purchase Tools
            </h3>
            <p className="text-gray-600">
              Streamlined tools for large volume purchases including volume
              discounts and flexible payment terms.
            </p>
          </div>
          <div className="p-6">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Global Logistics
            </h3>
            <p className="text-gray-600">
              Integrated shipping solutions with freight forwarding, customs
              clearance, and shipment tracking capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
