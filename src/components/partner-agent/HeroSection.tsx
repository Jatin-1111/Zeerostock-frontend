import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1">
            <p className="text-base text-gray-600 mb-3">Join The Marketplace</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Partner with Zeerostock
              <br />
              Earn as an Agent
            </h1>
            <p className="text-base text-gray-700 mb-8 leading-relaxed">
              Join our global network of trusted agents and earn competitive
              commissions by connecting suppliers with the market-leading B2B
              trading platform.
              <br />
              No upfront fees, just pure profit potential.
            </p>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-base text-gray-700">
                  Up to 5% recurring commissions
                </span>
              </div>
              <div className="flex items-center gap-3">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-base text-gray-700">Transparent pay</span>
              </div>
              <div className="flex items-center gap-3">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-base text-gray-700">Trusted brand</span>
              </div>
            </div>

            <Link
              href="/helpdesk"
              className="px-6 py-3 bg-gray-900 text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors inline-block"
            >
              Apply Now
            </Link>
          </div>

          {/* Right Image Placeholder */}
          <div className="flex-1">
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-gray-400 text-5xl">✕</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
