export default function AwardsSection() {
  const awards = [
    {
      title: "Forbes Next Billion-Dollar Startup",
      year: "2024",
      description:
        "Recognized for innovative approach to B2B marketplace technology",
    },
    {
      title: "Sustainability Excellence Award",
      year: "2024",
      description:
        "Honored for reducing industrial waste through smart surplus trading",
    },
    {
      title: "TechCrunch Disrupt Winner",
      year: "2023",
      description:
        "First place in B2B SaaS category for revolutionary AI matching",
    },
    {
      title: "Fast Company Most Innovative",
      year: "2023",
      description:
        "Listed among most innovative companies in supply chain technology",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Recognition</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Industry Recognition & Awards
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Awards Column */}
          <div className="space-y-8">
            {awards.map((award, index) => (
              <div key={index} className="flex gap-4">
                <svg
                  className="w-10 h-10 text-gray-900 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {award.title}
                  </h3>
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    {award.year}
                  </p>
                  <p className="text-gray-600">{award.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Section */}
          <div className="lg:pl-8">
            <div className="bg-white border-2 border-gray-900 rounded-lg p-8 sticky top-8">
              <div className="flex items-center gap-2 mb-8">
                <svg
                  className="w-5 h-5 text-gray-900"
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
                <h3 className="text-lg font-bold text-gray-900">Our Impact</h3>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-900">Waste Red</p>
                  <p className="text-lg font-bold text-gray-900">2.3M tons</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-900">CO2 Emis</p>
                  <p className="text-lg font-bold text-gray-900">890K tons</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-900">Jobs Creat</p>
                  <p className="text-lg font-bold text-gray-900">15,000+</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-900">Small Busi</p>
                  <p className="text-lg font-bold text-gray-900">8,500+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
