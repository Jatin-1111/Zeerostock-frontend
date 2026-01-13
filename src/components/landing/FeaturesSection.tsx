import { Zap, TrendingUp, BadgeCheck, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <div className="w-[53px] h-[53px] bg-white rounded-full flex items-center justify-center">
          <Zap className="w-7 h-7 text-[#022778]" strokeWidth={2.5} />
        </div>
      ),
      title: "Instant AI Matching",
      description: "Connect with the right partners in seconds",
    },
    {
      icon: (
        <div className="w-[53px] h-[53px] bg-white rounded-full flex items-center justify-center">
          <TrendingUp className="w-7 h-7 text-[#022778]" strokeWidth={2.5} />
        </div>
      ),
      title: "Maximize ROI",
      description: "Turn surplus inventory into profitable revenue streams",
    },
    {
      icon: (
        <div className="w-[53px] h-[53px] bg-white rounded-full flex items-center justify-center">
          <BadgeCheck className="w-7 h-7 text-[#022778]" strokeWidth={2.5} />
        </div>
      ),
      title: "100% Verified",
      description: "All suppliers and buyers are thoroughly vetted",
    },
    {
      icon: (
        <div className="w-[53px] h-[53px] bg-white rounded-full flex items-center justify-center">
          <Users className="w-7 h-7 text-[#022778]" strokeWidth={2.5} />
        </div>
      ),
      title: "Network Effects",
      description: "Join 10,000+ active B2B professionals",
    },
  ];

  return (
    <section className="w-full bg-[#eefbf6] py-8 sm:py-10 md:py-12 lg:py-13">
      <div className="max-w-[412px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 lg:px-13">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#2aae7a] rounded-[20px] sm:rounded-[25px] md:rounded-[27px] overflow-hidden h-[180px] sm:h-[185px] md:h-[191px] flex flex-col items-center justify-center px-4 sm:px-5 text-center"
            >
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-base font-bold text-[#022778] mb-1 sm:mb-1">
                {feature.title}
              </h3>
              <p className="text-base sm:text-sm font-semibold text-[#ffffff]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
