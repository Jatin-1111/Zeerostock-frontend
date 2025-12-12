export default function BenefitsSection() {
  const features = [
    { icon: "✓", title: "AI-Powered Smart Matching" },
    { icon: "✓", title: "Real-Time ROI Calculator" },
    { icon: "✓", title: "Live Market Analytics" },
    { icon: "✓", title: "Supplier Trust Scores" },
    { icon: "✓", title: "WhatsApp Integration" },
    { icon: "✓", title: "Escrow Protection" },
  ];

  return (
    <section className="relative w-full h-[899px] bg-[#fefefe] overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative h-full max-w-[1440px] mx-auto px-20 flex flex-col items-center justify-center">
        {/* Headline */}
        <div className="text-center mb-16 max-w-[967px]">
          <h2 className="text-[70px] leading-[70px] font-medium text-[#0a2540] mb-4 font-['Poppins']">
            Everything You Need To
          </h2>
          <h2 className="text-[70px] leading-[70px] font-medium text-[#2aae7a] mb-6 font-['Poppins']">
            Succeed
          </h2>
          <p className="text-[24px] font-semibold text-[#868181] font-['Poppins']">
            Powerful tools and features designed specifically for B2B surplus
            inventory trading
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-x-32 gap-y-8 mb-16 max-w-[983px]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-[51px] h-[48px] flex items-center justify-center bg-[#2aae7a] rounded-lg shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-[28px] leading-[33px] text-[#0a2540] font-medium font-['Poppins']">
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-[460px] h-[71px] bg-[#022778] text-white text-[28px] font-medium rounded-[20px] hover:bg-[#022778]/90 transition-colors font-['Poppins']">
          Explore Features
        </button>
      </div>
    </section>
  );
}
