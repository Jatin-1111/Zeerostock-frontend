export default function FinalCTASection() {
  return (
    <section className="bg-white p-8 md:p-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Start Maximizing Value from Your
          <br />
          Surplus Today
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Join thousands of suppliers, buyers, and agents who are already
          <br />
          transforming surplus inventory into profitable opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
            Sign Up Free
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
          <button className="px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Talk to Us
          </button>
        </div>

        <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              10,000+
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              $50M+
            </div>
            <div className="text-sm text-gray-600">Transaction Volume</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              95%
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
