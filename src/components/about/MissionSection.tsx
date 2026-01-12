export default function MissionSection() {
  return (
    <section className="w-full bg-[#EEFBF6] py-6 sm:py-8 md:py-10 lg:py-[43px]">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full flex flex-col items-center">
          <p className="font-medium text-xs sm:text-sm md:text-[12px] text-center text-[#868181]">
            Our Mission
          </p>
          {/* Title */}
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight lg:leading-[47px] text-center text-[#0d1b2a] max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mb-3 sm:mb-4 md:mb-[16px] px-4">
            Building a Sustainable Future Through{" "}
            <span className="text-[#2ec096]">Smart Commerce</span>
          </h2>

          {/* Description */}
          <p className="font-semibold text-xs sm:text-sm md:text-[11px] leading-relaxed lg:leading-[17px] text-center text-[#868181] max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl mb-6 sm:mb-8 md:mb-[43px] px-4">
            Every year, billions of dollars in surplus inventory goes to waste.
            We believe there&apos;s a better way, By connecting suppliers with
            buyers through intelligent matching
          </p>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[16px] max-w-7xl mx-auto px-4">
            {/* Active Businesses */}
            <div className="bg-[#eeffef] rounded-xl sm:rounded-2xl md:rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-20 sm:h-24 md:h-[93px] flex flex-col items-center justify-center text-center px-3 sm:px-4">
              <p className="font-semibold text-[10px] sm:text-xs md:text-[12px] text-black mb-1 sm:mb-[5px]">
                Active Businesses
              </p>
              <p className="font-bold text-xl sm:text-2xl md:text-[27px] text-black">
                10,000+
              </p>
            </div>

            {/* Total Transaction Volume */}
            <div className="bg-[#eeffef] rounded-xl sm:rounded-2xl md:rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-20 sm:h-24 md:h-[93px] flex flex-col items-center justify-center text-center px-3 sm:px-4">
              <p className="font-semibold text-[10px] sm:text-xs md:text-[12px] text-black mb-1 sm:mb-[5px]">
                Total Transaction Volume
              </p>
              <p className="font-bold text-xl sm:text-2xl md:text-[27px] text-black">
                $2.4B+
              </p>
            </div>

            {/* Customer Satisfaction */}
            <div className="bg-[#eeffef] rounded-xl sm:rounded-2xl md:rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-20 sm:h-24 md:h-[93px] flex flex-col items-center justify-center text-center px-3 sm:px-4">
              <p className="font-semibold text-[10px] sm:text-xs md:text-[12px] text-black mb-1 sm:mb-[5px]">
                Customer Satisfaction
              </p>
              <p className="font-bold text-xl sm:text-2xl md:text-[27px] text-black">
                95%
              </p>
            </div>

            {/* Countries Served */}
            <div className="bg-[#eeffef] rounded-xl sm:rounded-2xl md:rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-20 sm:h-24 md:h-[93px] flex flex-col items-center justify-center text-center px-3 sm:px-4">
              <p className="font-semibold text-[10px] sm:text-xs md:text-[12px] text-black mb-1 sm:mb-[5px]">
                Countries Served
              </p>
              <p className="font-bold text-xl sm:text-2xl md:text-[27px] text-black">
                50+
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
