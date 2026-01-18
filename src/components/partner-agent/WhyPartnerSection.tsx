import { DollarSign, Users, Clock, ShieldCheck } from "lucide-react";

export default function WhyPartnerSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn High Commissions",
      description:
        "3-5% recurring commission on every supplier you onboard, plus performance bonuses",
    },
    {
      icon: Users,
      title: "Build Your Network",
      description:
        "Connect with suppliers worldwide and grow your professional network exponentially",
    },
    {
      icon: Clock,
      title: "Work Flexibly",
      description:
        "Set your own schedule and work from anywhere as an independent agent partner",
    },
    {
      icon: ShieldCheck,
      title: "Full Support",
      description:
        "Access training, marketing materials, and dedicated support to help you succeed",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[34.67px] font-medium leading-[46.67px] text-[#0d1b2a] mb-2.5">
            Why Partner with <span className="text-[#2ec096]">Zeerostock</span>
          </h2>
          <p className="text-[16px] font-semibold leading-normal text-[#9c9c9c]">
            Build a sustainable income stream by connecting suppliers with the
            fastest-growing B2B surplus marketplace
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-4 gap-[15.33px] justify-center items-center">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-[#2aae7a] rounded-[26.67px] h-[190.67px] w-[200px] relative overflow-hidden"
                style={{
                  boxShadow: "0px 0px 6.67px 0px rgba(24,181,34,0.5)",
                }}
              >
                {/* Icon Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[20px] bg-[#eeffef] rounded-full p-[10px] w-[46.67px] h-[46.67px] flex items-center justify-center">
                  <IconComponent className="w-[26.67px] h-[26.67px] text-black" />
                </div>

                {/* Content */}
                <div className="absolute top-[87.33px] px-[10.67px] text-center w-full">
                  <h3
                    className="text-[14.67px] font-semibold text-[#022778] mb-[13.33px]"
                    style={{
                      textShadow: "0px 2px 3px rgba(0,0,0,0.25)",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-[10.67px] font-semibold leading-normal text-white">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
