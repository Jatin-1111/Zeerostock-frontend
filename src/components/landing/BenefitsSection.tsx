import { Check } from "lucide-react";
import Link from "next/link";

export default function BenefitsSection() {
  const features = [
    { title: "AI-Powered Smart Matching" },
    { title: "Real-Time ROI Calculator" },
    { title: "Live Market Analytics" },
    { title: "Supplier Trust Scores" },
    { title: "WhatsApp Integration" },
    { title: "Escrow Protection" },
  ];

  return (
    <section className="relative h-[500px] sm:h-[550px] md:h-[600px] bg-[#fefefe]">
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="Landing Page (Explore features).png"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative h-full max-w-[412px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center">
        {/* Headline */}
        <div className="text-center mb-6 sm:mb-7 md:mb-8 max-w-[380px] sm:max-w-[450px] md:max-w-[483px]">
          <h2 className="text-[25px] sm:text-[30px] md:text-[35px] leading-[34px] sm:leading-[35px] font-medium text-[#0a2540]">
            Everything You Need To
          </h2>
          <h2 className="text-[25px] sm:text-[30px] md:text-[35px] leading-[34px] sm:leading-[35px] font-medium text-[#2aae7a] mb-2 sm:mb-3">
            Succeed
          </h2>
          <p className="text-[14px] sm:text-[13px] md:text-[12px] font-semibold text-[#868181]">
            Complete tools for smart trading
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-3 sm:gap-y-4 mb-6 sm:mb-7 md:mb-8 max-w-[380px] sm:max-w-[450px] md:max-w-[491px]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3">
              <div className="w-[21px] sm:w-[23px] md:w-[25px] h-[21px] sm:h-[23px] md:h-[24px] flex items-center justify-center bg-[#2aae7a] rounded-lg shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-[20px] sm:text-[16px] md:text-[14px] leading-[33px] sm:leading-[20px] md:leading-[17px] text-[#0a2540] font-medium">
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/marketplace"
          className="w-[279px] sm:w-[220px] md:w-[200px] h-[35px] sm:h-[36px] md:h-[35px] bg-[#1e3a8a] text-white text-[14px] font-medium rounded-[10px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center"
        >
          Explore Features
        </Link>
      </div>
    </section>
  );
}
