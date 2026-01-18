import { Shield, Lightbulb, Leaf, Globe } from "lucide-react";

export default function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "Every transaction is executed with complete transparency and accountability",
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description:
        "We continuously push boundaries to create better solutions for surplus trade",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Reducing waste and environmental impact through smarter commerce",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Connecting businesses worldwide to create lasting positive change",
    },
  ];

  return (
    <section className="max-w-[1080px] mx-auto bg-[#EEFBF6] py-6 sm:py-8 md:py-10 lg:py-16">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="relative w-full flex flex-col items-center">
            <p className="font-medium text-xs sm:text-sm md:text-[12px] text-center text-[#868181]">
              Our Values
            </p>
            {/* Title */}
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[35px] leading-tight lg:leading-[52px] text-center text-[#0d1b2a] mb-3 sm:mb-4">
              What Drives Us <span className="text-[#2ec096]">Forward</span>
            </h2>

            {/* Subtitle */}
            <p className="font-semibold text-xs sm:text-sm md:text-base lg:text-[13px] leading-relaxed lg:leading-[20px] text-center text-[#868181] max-w-full sm:max-w-xl md:max-w-3xl mb-6 sm:mb-8 md:mb-10 lg:mb-[43px] px-4 sm:px-0">
              Our core values guide every decision we make and every
              relationship we build
            </p>

            {/* Values Grid */}
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[16px]">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={index}
                      className="bg-[#2aae7a] rounded-xl sm:rounded-2xl md:rounded-[20px] p-4 sm:p-5 md:p-[21px] min-h-48 sm:min-h-52 md:min-h-[190px] flex flex-col items-center justify-center text-center"
                    >
                      {/* Icon Circle */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-[47px] md:h-[47px] bg-[#eeffef] rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-[16px]">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-[27px] md:h-[27px] text-[#2aae7a]" />
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-sm sm:text-base md:text-[15px] leading-snug md:leading-[22px] text-[#022778] mb-2 sm:mb-[8px]">
                        {value.title}
                      </h3>

                      {/* Description */}
                      <p className="font-medium text-xs sm:text-sm md:text-[11px] leading-relaxed md:leading-[16px] text-white">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
