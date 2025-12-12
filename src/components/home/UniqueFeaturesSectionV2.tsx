import { Cpu, Lock, Info, BarChart3 } from "lucide-react";

export default function UniqueFeaturesSectionV2() {
  const features = [
    {
      icon: Cpu,
      title: "AI Powered Matchmaking",
      description: "Connect with ideal buyers or suppliers in record time",
    },
    {
      icon: BarChart3,
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
    <section className="w-full py-[45px] px-[80px]">
      {/* Title */}
      <h2 className="text-center text-[50px] font-bold mb-[10px] text-[#0d1b2a]">
        <span>Unique Feature That </span>
        <span className="text-[#2ec096]">Drive Results</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-[24px] font-semibold text-gray-500 mb-[72px]">
        Powerful tools and insights that make surplus inventory management
        efficient and profitable
      </p>

      {/* Features Grid - 2x2 */}
      <div className="grid grid-cols-2 gap-x-[78px] gap-y-[40px]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#eeffef] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[150px] flex items-center px-[20px] gap-[20px]"
          >
            {/* Icon Container */}
            <div className="bg-[#063576] rounded-[60px] p-[15px] flex items-center justify-center shrink-0">
              <feature.icon className="w-[40px] h-[40px] text-white" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <h3 className="text-[30px] font-semibold text-black leading-tight mb-[2px]">
                {feature.title}
              </h3>
              <p className="text-[23px] font-semibold text-[#787878]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
