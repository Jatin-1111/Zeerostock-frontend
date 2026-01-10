import { Cpu, Lock, Info, TrendingUp } from "lucide-react";

export default function UniqueFeaturesSectionV2() {
  const features = [
    {
      icon: Cpu,
      title: "AI Powered Matchmaking",
      description: "Connect with ideal buyers or suppliers in record time",
    },
    {
      icon: TrendingUp,
      title: "Trending Lists & Insights",
      description:
        "Stay ahead with market trends, demand patterns, and pricing intelligence",
    },
    {
      icon: Lock,
      title: "Supplier Trust Scores",
      description: "Trade with confidence with our protected system",
    },
    {
      icon: Info,
      title: "Auction Alerts Via WhatsApp",
      description: "Trade with confidence with our protected system",
    },
  ];

  return (
    <section className="w-full py-[23px] px-[40px]">
      {/* Title - 75% scaled (50px → 38px) */}
      <h2 className="text-center text-[25px] font-bold mb-2 text-[#0d1b2a] leading-normal">
        <span>Unique Feature That </span>
        <span className="text-[#2ec096]">Drive Results</span>
      </h2>

      {/* Subtitle - 75% scaled (24px → 18px) */}
      <p className="text-center text-[12px] font-semibold text-[#6b7280] mb-[36px] leading-normal max-w-[527px] mx-auto">
        Powerful tools and insights that make surplus inventory management
        efficient and profitable
      </p>

      {/* Features Grid - 2x2, 75% scaled (600px → 450px width, 150px → 113px height) */}
      <div className="grid grid-cols-2 gap-x-[39px] gap-y-[20px] max-w-[639px] mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#eeffef] rounded-[15px] shadow-[0px_0px_7px_0px_rgba(24,181,34,0.5)] h-[75px] flex items-center px-[10px] gap-[10px]"
          >
            {/* Icon Container - 75% scaled (70px → 53px container, 40px → 30px icon) */}
            <div className="bg-[#063576] rounded-[30px] p-[7px] flex items-center justify-center shrink-0">
              <feature.icon
                className="w-[20px] h-[20px] text-white"
                strokeWidth={2}
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              {/* Title - 75% scaled (30px → 23px) */}
              <h3 className="text-[15px] font-semibold text-[#0d1b2a] leading-tight mb-0.5">
                {feature.title}
              </h3>
              {/* Description - 75% scaled (23px → 17px) */}
              <p className="text-[11px] font-semibold text-[#787878] leading-normal">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
