export default function TimelineSection() {
  const milestones = [
    {
      year: "2021",
      title: "Company Founded",
      description:
        "Zeerostock launched with the mission to transform surplus inventory trading",
      position: "left",
    },
    {
      year: "2022",
      title: "First $10M in Transactions",
      description: "Reached our first major milestone with 500+ active users",
      position: "right",
    },
    {
      year: "2023",
      title: "AI Matching Launch",
      description:
        "Introduced AI-powered supplier-buyer matching, increasing success rates by 300%",
      position: "left",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description:
        "Expanded to 15+ countries with over 10,000 registered businesses",
      position: "right",
    },
    {
      year: "2025",
      title: "Series A Funding",
      description:
        "Raised $25M to accelerate growth and enhance platform capabilities",
      position: "left",
    },
  ];

  return (
    <section className="w-full bg-[#EEFBF6] py-20">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full flex flex-col items-center">
          {/* Subtitle */}
          <p className="font-inter font-medium text-lg text-center text-[#868181] mb-4">
            Our Journey
          </p>

          {/* Title */}
          <h2 className="font-poppins font-bold text-5xl text-center text-[#0d1b2a] mb-4">
            From Idea to <span className="text-[#2ec096]">Global Impact</span>
          </h2>

          {/* Description */}
          <p className="font-inter font-semibold text-lg text-center text-[#868181] max-w-3xl mb-20">
            See how we&apos;ve grown from a simple idea to a platform
            transforming global commerce
          </p>

          {/* Timeline Container */}
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Timeline vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#2ec096] -translate-x-1/2" />

            {/* Milestones */}
            <div className="relative space-y-10">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-8 w-4 h-4 bg-[#2ec096] rounded-full -translate-x-1/2 z-10" />

                  {/* Milestone card */}
                  <div
                    className={`relative w-[48%] ${
                      milestone.position === "left"
                        ? "mr-auto pr-12"
                        : "ml-auto pl-12"
                    }`}
                  >
                    <div className="bg-[#eeffef] rounded-[30px] shadow-[0px_0px_15px_2px_rgba(24,181,34,0.4)] p-8">
                      {/* Year */}
                      <p
                        className={`font-inter font-semibold text-3xl text-[#0bcd00] mb-3 ${
                          milestone.position === "left"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {milestone.year}
                      </p>

                      {/* Title */}
                      <p
                        className={`font-inter font-semibold text-2xl text-black mb-3 ${
                          milestone.position === "left"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {milestone.title}
                      </p>

                      {/* Description */}
                      <p
                        className={`font-inter font-medium text-lg text-black leading-relaxed ${
                          milestone.position === "left"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
