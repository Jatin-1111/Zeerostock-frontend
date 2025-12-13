import { Zap, TrendingUp, BadgeCheck, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center">
          <Zap className="w-10 h-10 text-[#022778]" strokeWidth={2.5} />
        </div>
      ),
      title: "Instant AI Matching",
      description: "Connect with the right partners in seconds",
    },
    {
      icon: (
        <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center">
          <TrendingUp className="w-10 h-10 text-[#022778]" strokeWidth={2.5} />
        </div>
      ),
      title: "Maximize ROI",
      description: "Turn surplus inventory into profitable revenue streams",
    },
    {
      icon: (
        <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center">
          <BadgeCheck className="w-10 h-10 text-[#022778]" strokeWidth={2.5} />
        </div>
      ),
      title: "100% Verified",
      description: "All suppliers and buyers are thoroughly vetted",
    },
    {
      icon: (
        <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center">
          <Users className="w-10 h-10 text-[#022778]" strokeWidth={2.5} />
        </div>
      ),
      title: "Network Effects",
      description: "Join 10,000+ active B2B professionals",
    },
  ];

  return (
    <section className="w-full bg-[#eefbf6] py-20">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#2aae7a] rounded-[40px] overflow-hidden h-[286px] flex flex-col items-center justify-center px-8 text-center"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-[22px] font-bold text-[#022778] mb-1 font-['Poppins']">
                {feature.title}
              </h3>
              <p className="text-[20px] font-semibold text-[#ffffff]  font-['Poppins']">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
