export default function WhyPartnerSection() {
  const benefits = [
    {
      icon: (
        <svg
          className="w-10 h-10 text-gray-700 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Earn High Commissions",
      description:
        "3-5% recurring commission on every supplier you onboard, plus performance bonuses",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-gray-700 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Build Your Network",
      description:
        "Connect with suppliers worldwide and grow your professional network exponentially",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-gray-700 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Work Flexibly",
      description:
        "Set your own schedule and work from anywhere as an independent agent partner",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-gray-700 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Full Support",
      description:
        "Access training, marketing materials, and dedicated support to help you succeed",
    },
  ];

  return (
    <section className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold text-gray-900 mb-3">
            Why Partner with Zeerostock?
          </h2>
          <p className="text-[15px] text-gray-600 max-w-[800px] mx-auto">
            Build a sustainable income stream by connecting suppliers with the
            fastest-growing B2B surplus marketplace
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-[16px] font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-[13px] text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
