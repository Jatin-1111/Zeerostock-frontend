export default function BenefitsSection() {
  const benefits = [
    "AI-Powered Smart mapping",
    "Real-Time ROI Calculator",
    "Low Annual Amounts",
    "Supplier Trust Brownie",
    "WhatApp Integration",
    "Escrow Provisions",
  ];

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <br />
              Succeed
            </h2>
            <p className="text-gray-600 mb-8">
              Powerful tools and features designed specifically for B2B surplus
              inventory trading
            </p>

            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <button className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors">
              Explore Features
            </button>
          </div>

          <div className="relative">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-2">Demo Video</div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-20 h-1 bg-gray-300 rounded-full"></div>
                    <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
