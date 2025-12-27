import { Zap, TrendingUp, BadgeCheck, Users } from "lucide-react";

export default function FeaturesCardsSection() {
  const features = [
    {
      icon: Zap,
      title: "Instant AI Matching",
      description: "Connect with the right partners in seconds",
    },
    {
      icon: TrendingUp,
      title: "Maximize ROI",
      description: "Turn surplus inventory into profitable revenue streams",
    },
    {
      icon: BadgeCheck,
      title: "100% Verified",
      description: "All suppliers and buyers are thoroughly vetted",
    },
    {
      icon: Users,
      title: "Network Effects",
      description: "Join 10,000+ active B2B professionals",
    },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-[1440px] mx-auto px-[60px]">
        <div className="grid grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#2aae7a] rounded-[30px] p-6 flex flex-col items-center text-center h-[215px] justify-center"
              >
                {/* Icon */}
                <div className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center mb-8">
                  <Icon className="w-7 h-7 text-[#2aae7a]" strokeWidth={2.5} />
                </div>

                {/* Title */}
                <h3 className="text-[#022778] text-base font-semibold mb-4 leading-normal font-['Poppins']">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white text-[15px] font-bold leading-normal font-['Poppins']">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
