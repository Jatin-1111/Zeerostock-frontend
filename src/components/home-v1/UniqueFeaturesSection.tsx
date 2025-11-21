export default function UniqueFeaturesSection() {
  const features = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
          <line x1="4" y1="10" x2="20" y2="10" strokeWidth={2} />
          <line x1="8" y1="14" x2="12" y2="14" strokeWidth={2} />
          <line x1="8" y1="18" x2="16" y2="18" strokeWidth={2} />
        </svg>
      ),
      title: "ROI Calculator",
      description:
        "Calculate potential savings and earnings from your surplus inventory in real-time",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6l4 2"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      ),
      title: "AI-Powered Matchmaking",
      description:
        "Smart algorithms connect the right buyers with the right suppliers automatically",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <polyline
            points="22 12 18 12 15 21 9 3 6 12 2 12"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Trending Listings & Insights",
      description:
        "Stay ahead with market trends, demand patterns, and pricing intelligence",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
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
      ),
      title: "Supplier Trust Scores",
      description:
        "Verified ratings and performance metrics ensure reliable business partnerships",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      ),
      title: "Auction Alerts via WhatsApp",
      description:
        "Never miss opportunities with instant notifications on your mobile device",
    },
  ];

  return (
    <section className="bg-white p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Unique Features That Drive Results
        </h2>
        <p className="text-gray-500 text-lg">
          Powerful tools and insights that make surplus inventory management
          efficient and profitable
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="shrink-0 text-gray-900">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
