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
    <section className="w-full bg-[#EEFBF6] py-16">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="relative w-full flex flex-col items-center">
            {/* Title */}
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[52px] leading-tight lg:leading-[78px] text-center text-[#0d1b2a] mb-4">
              What Drives Us <span className="text-[#2ec096]">Forward</span>
            </h2>

            {/* Subtitle */}
            <p className="font-inter font-semibold text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[30px] text-center text-[#868181] max-w-3xl mb-16">
              Our core values guide every decision we make and every
              relationship we build
            </p>

            {/* Values Grid */}
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={index}
                      className="bg-[#2aae7a] rounded-[30px] p-8 min-h-[285px] flex flex-col items-center justify-center text-center"
                    >
                      {/* Icon Circle */}
                      <div className="w-[70px] h-[70px] bg-[#eeffef] rounded-full flex items-center justify-center mb-6">
                        <Icon className="w-[40px] h-[40px] text-[#2aae7a]" />
                      </div>

                      {/* Title */}
                      <h3 className="font-inter font-semibold text-[22px] leading-[33px] text-[#022778] mb-3">
                        {value.title}
                      </h3>

                      {/* Description */}
                      <p className="font-inter font-medium text-[16px] leading-[24px] text-white">
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
