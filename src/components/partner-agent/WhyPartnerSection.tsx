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
    <section className="py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-[34.67px] font-medium leading-tight sm:leading-[46.67px] text-[#0d1b2a] mb-2 sm:mb-2.5">
            Why Partner with <span className="text-[#2ec096]">Zeerostock</span>
          </h2>
          <p className="text-sm sm:text-base md:text-[16px] font-semibold leading-normal text-[#9c9c9c] px-4 sm:px-0">
            Build a sustainable income stream by connecting suppliers with the
            fastest-growing B2B surplus marketplace
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[15.33px] justify-center items-center">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-[#2aae7a] rounded-[26.67px] min-h-[180px] sm:min-h-[190px] md:h-[190.67px] w-full sm:w-auto lg:w-[200px] relative overflow-hidden p-4 sm:p-5 md:p-0"
                style={{
                  boxShadow: "0px 0px 6.67px 0px rgba(24,181,34,0.5)",
                }}
              >
                {/* Icon Circle */}
                <div className="md:absolute left-1/2 md:-translate-x-1/2 md:top-[20px] bg-[#eeffef] rounded-full p-2 sm:p-2.5 md:p-[10px] w-10 h-10 sm:w-11 sm:h-11 md:w-[46.67px] md:h-[46.67px] flex items-center justify-center mx-auto md:mx-0 mb-3 md:mb-0">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-[26.67px] md:h-[26.67px] text-black" />
                </div>

                {/* Content */}
                <div className="md:absolute md:top-[87.33px] px-2 sm:px-3 md:px-[10.67px] text-center w-full">
                  <h3
                    className="text-sm sm:text-base md:text-[14.67px] font-semibold text-[#022778] mb-2 sm:mb-3 md:mb-[13.33px]"
                    style={{
                      textShadow: "0px 2px 3px rgba(0,0,0,0.25)",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[10.67px] font-semibold leading-normal text-white">
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
