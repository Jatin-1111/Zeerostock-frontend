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
    <section className="relative h-[600px] bg-[#fefefe]">
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="Landing Page (Explore features).png"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative h-full max-w-[960px] mx-auto flex flex-col items-center justify-center">
        {/* Headline */}
        <div className="text-center mb-8 max-w-[483px]">
          <h2 className="text-[35px] leading-[35px] font-medium text-[#0a2540]">
            Everything You Need To
          </h2>
          <h2 className="text-[35px] leading-[35px] font-medium text-[#2aae7a] mb-3">
            Succeed
          </h2>
          <p className="text-[12px] font-semibold text-[#868181]">
            Powerful tools and features designed specifically for B2B surplus
            inventory trading
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 mb-8 max-w-[491px]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-[25px] h-[24px] flex items-center justify-center bg-[#2aae7a] rounded-lg shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-[14px] leading-[17px] text-[#0a2540] font-medium">
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/marketplace"
          className="w-[200px] h-[35px] bg-[#1e3a8a] text-white text-[14px] font-medium rounded-[10px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center"
        >
          Explore Features
        </Link>
      </div>
    </section>
  );
}
