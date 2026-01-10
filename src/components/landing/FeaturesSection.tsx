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
    <section className="w-full bg-[#eefbf6] py-13">
      <div className="max-w-[960px] mx-auto px-13">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#2aae7a] rounded-[27px] overflow-hidden h-[191px] flex flex-col items-center justify-center px-5 text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-[15px] font-bold text-[#022778] mb-1">
                {feature.title}
              </h3>
              <p className="text-[13px] font-semibold text-[#ffffff] ">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
