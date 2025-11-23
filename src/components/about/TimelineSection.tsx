export default function TimelineSection() {
  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description:
        "Zeerostock launches with the mission to transform surplus inventory trading",
    },
    {
      year: "2020",
      title: "First $10M in Transactions",
      description: "Reached our first major milestone with 500+ active users",
    },
    {
      year: "2021",
      title: "AI Matching Launch",
      description:
        "Introduced AI-powered intelligent buyer-matching, increasing success rates by 300%",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description:
        "Expanded to 40+ countries with over 10,000 registered businesses",
    },
    {
      year: "2023",
      title: "Series A Funding",
      description:
        "Raised $12M to accelerate growth and enhance platform capabilities",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          From Idea to Global Impact
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          See how we&apos;ve grown from a simple idea to a platform transforming
          global commerce
        </p>
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-gray-900 flex items-center justify-center text-sm font-bold text-gray-900 bg-white shrink-0">
                  {milestone.year}
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="bg-white border-2 border-gray-900 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
