export default function HeroSectionV2() {
  return (
    <section className="relative w-full h-[751px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="/landing-hero.png"
          alt="Industrial background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540]/90 via-[#0A2540]/70 to-[#2aae7a]/40" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1440px] mx-auto px-20 flex flex-col items-center justify-center text-center">
        {/* Main Headline */}
        <h1 className="text-[80px] leading-[80px] font-extrabold text-white mb-6 text-shadow-lg">
          <span className="block">Transform Surplus into</span>
          <span className="text-[#2aae7a]">Revenue Today</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white text-[20px] leading-[25px] font-semibold max-w-[830px] mb-16">
          The only B2B marketplace you need to buy, sell or broker surplus
          inventory with complete trust and transparency
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-6 mb-20">
          <button className="px-[110px] py-[15px] h-[70px] bg-[#022778] text-white text-[22px] font-semibold rounded-xl hover:bg-[#022778]/90 transition-colors">
            Start Selling
          </button>
          <button className="px-[110px] py-[15px] h-[70px] bg-white text-[#2aae7a] text-[22px] font-semibold rounded-xl hover:bg-white/90 transition-colors">
            Start Buying
          </button>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-[76px] left-0 right-0">
          <div className="max-w-[1440px] mx-auto px-20">
            <div className="flex items-center justify-center gap-16 text-white text-[24px] font-bold">
              <div className="flex items-center gap-2">
                <span>10,000 Businesses Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <span>$50M+ Inventory Traded</span>
              </div>
              <div className="flex items-center gap-2">
                <span>97% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
