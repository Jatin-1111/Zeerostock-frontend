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
    <section className="w-full py-[34px] px-[60px]">
      {/* Title - 75% scaled (50px → 38px) */}
      <h2 className="text-center text-[38px] font-bold mb-2 text-[#0d1b2a] leading-normal">
        <span>Unique Feature That </span>
        <span className="text-[#2ec096]">Drive Results</span>
      </h2>

      {/* Subtitle - 75% scaled (24px → 18px) */}
      <p className="text-center text-[18px] font-semibold text-[#6b7280] mb-[54px] leading-normal max-w-[791px] mx-auto">
        Powerful tools and insights that make surplus inventory management
        efficient and profitable
      </p>

      {/* Features Grid - 2x2, 75% scaled (600px → 450px width, 150px → 113px height) */}
      <div className="grid grid-cols-2 gap-x-[59px] gap-y-[30px] max-w-[959px] mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#eeffef] rounded-[23px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[113px] flex items-center px-[15px] gap-[15px]"
          >
            {/* Icon Container - 75% scaled (70px → 53px container, 40px → 30px icon) */}
            <div className="bg-[#063576] rounded-[45px] p-[11px] flex items-center justify-center shrink-0">
              <feature.icon
                className="w-[30px] h-[30px] text-white"
                strokeWidth={2}
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              {/* Title - 75% scaled (30px → 23px) */}
              <h3 className="text-[23px] font-semibold text-[#0d1b2a] leading-tight mb-0.5">
                {feature.title}
              </h3>
              {/* Description - 75% scaled (23px → 17px) */}
              <p className="text-[17px] font-semibold text-[#787878] leading-normal">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
