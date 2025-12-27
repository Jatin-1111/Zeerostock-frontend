import { Check } from "lucide-react";

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
    <section className="relative w-full h-[674px] bg-[#fefefe] overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative h-full max-w-[1440px] mx-auto flex flex-col items-center justify-center">
        {/* Headline */}
        <div className="text-center mb-12 max-w-[725px]">
          <h2 className="text-[52px] leading-[52px] font-medium text-[#0a2540] font-['Poppins']">
            Everything You Need To
          </h2>
          <h2 className="text-[52px] leading-[52px] font-medium text-[#2aae7a] mb-5 font-['Poppins']">
            Succeed
          </h2>
          <p className="text-lg font-semibold text-[#868181] font-['Poppins']">
            Powerful tools and features designed specifically for B2B surplus
            inventory trading
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-x-24 gap-y-6 mb-12 max-w-[737px]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-[38px] h-[36px] flex items-center justify-center bg-[#2aae7a] rounded-lg shrink-0">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className="text-[21px] leading-[25px] text-[#0a2540] font-medium font-['Poppins']">
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-[345px] h-[53px] bg-[#1e3a8a] text-white text-[21px] font-medium rounded-[15px] hover:bg-[#1e3a8a]/90 transition-colors font-['Poppins']">
          Explore Features
        </button>
      </div>
    </section>
  );
}
