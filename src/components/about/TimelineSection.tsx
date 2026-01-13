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
    <section className="w-full bg-[#EEFBF6] py-6 sm:py-8 md:py-10 lg:py-[53px]">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full flex flex-col items-center">
          {/* Subtitle */}
          <p className="font-medium text-xs sm:text-sm md:text-sm text-center text-[#868181] mb-2 sm:mb-[11px]">
            Our Journey
          </p>

          {/* Title */}
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-3xl text-center text-[#0d1b2a] mb-2 sm:mb-[11px]">
            From Idea to <span className="text-[#2ec096]">Global Impact</span>
          </h2>

          {/* Description */}
          <p className="font-semibold text-xs sm:text-sm md:text-sm text-center text-[#868181] max-w-full sm:max-w-xl md:max-w-3xl mb-6 sm:mb-8 md:mb-10 lg:mb-[53px] px-4 sm:px-0">
            See how we&apos;ve grown from a simple idea to a platform
            transforming global commerce
          </p>

          {/* Timeline Container */}
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Timeline vertical line - hidden on mobile, shown on md+ */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#2ec096] -translate-x-1/2" />

            {/* Milestones */}
            <div className="relative space-y-4 sm:space-y-5 md:space-y-[27px]">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot - hidden on mobile, shown on md+ */}
                  <div className="hidden md:block absolute left-1/2 top-[21px] w-[11px] h-[11px] bg-[#2ec096] rounded-full -translate-x-1/2 z-10" />

                  {/* Milestone card */}
                  <div
                    className={`relative w-full md:w-[40%] ${
                      milestone.position === "left"
                        ? "md:mr-auto md:pr-[8px] md:ml-18"
                        : "md:ml-auto md:pl-[8px] md:mr-18"
                    }`}
                  >
                    <div className="bg-[#eeffef] rounded-xl sm:rounded-2xl md:rounded-[20px] shadow-[0px_0px_15px_2px_rgba(24,181,34,0.4)] p-4 sm:p-5 md:p-[21px]">
                      {/* Year */}
                      <p
                        className={`font-semibold text-lg sm:text-xl md:text-2xl text-[#0bcd00] mb-2 sm:mb-[8px] ${
                          milestone.position === "left"
                            ? "text-left md:text-right"
                            : "text-left"
                        }`}
                      >
                        {milestone.year}
                      </p>

                      {/* Title */}
                      <p
                        className={`font-semibold text-base sm:text-lg md:text-xl text-black mb-2 sm:mb-[8px] ${
                          milestone.position === "left"
                            ? "text-left md:text-right"
                            : "text-left"
                        }`}
                      >
                        {milestone.title}
                      </p>

                      {/* Description */}
                      <p
                        className={`font-medium text-xs sm:text-sm md:text-sm text-black leading-relaxed ${
                          milestone.position === "left"
                            ? "text-left md:text-right"
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
