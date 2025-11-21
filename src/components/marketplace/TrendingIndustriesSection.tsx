export default function TrendingIndustriesSection() {
  const industries = [
    { name: "Construction", percentage: "85%" },
    { name: "Technology", percentage: "72%" },
    { name: "Manufacturing", percentage: "68%" },
    { name: "Pharma", percentage: "54%" },
    { name: "Agri-export", percentage: "48%" },
    { name: "Healthcare", percentage: "42%" },
  ];

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Trending Industries
        </h2>
        <span className="text-sm text-gray-600">All trades →</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {industries.map((industry, index) => (
          <div
            key={index}
            className="text-center p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {industry.name}
            </h3>
            <p className="text-xs text-gray-600">{industry.percentage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
