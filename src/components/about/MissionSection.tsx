export default function MissionSection() {
  return (
    <section className="w-full bg-[#EEFBF6] py-[43px]">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full flex flex-col items-center">
          <p className="font-medium text-[12px] text-center text-[#868181]">
            Our Mission
          </p>
          {/* Title */}
          <h2 className="font-semibold text-[40px] leading-tight lg:leading-[47px] text-center text-[#0d1b2a] max-w-4xl mb-[16px] px-4">
            Building a Sustainable Future Through{" "}
            <span className="text-[#2ec096]">Smart Commerce</span>
          </h2>

          {/* Description */}
          <p className="font-semibold text-[11px] leading-relaxed lg:leading-[17px] text-center text-[#868181] max-w-5xl mb-[43px] px-4">
            Every year, billions of dollars in surplus inventory goes to waste.
            We believe there&apos;s a better way, By connecting suppliers with
            buyers through intelligent matching
          </p>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] max-w-7xl mx-auto px-4">
            {/* Active Businesses */}
            <div className="bg-[#eeffef] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[93px] flex flex-col items-center justify-center text-center px-4">
              <p className="font-semibold text-[12px] text-black mb-[5px]">
                Active Businesses
              </p>
              <p className="font-bold text-[27px] text-black">10,000+</p>
            </div>

            {/* Total Transaction Volume */}
            <div className="bg-[#eeffef] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[93px] flex flex-col items-center justify-center text-center px-4">
              <p className="font-semibold text-[12px] text-black mb-[5px]">
                Total Transaction Volume
              </p>
              <p className="font-bold text-[27px] text-black">$2.4B+</p>
            </div>

            {/* Customer Satisfaction */}
            <div className="bg-[#eeffef] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[93px] flex flex-col items-center justify-center text-center px-4">
              <p className="font-semibold text-[12px] text-black mb-[5px]">
                Customer Satisfaction
              </p>
              <p className="font-bold text-[27px] text-black">95%</p>
            </div>

            {/* Countries Served */}
            <div className="bg-[#eeffef] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[93px] flex flex-col items-center justify-center text-center px-4">
              <p className="font-semibold text-[12px] text-black mb-[5px]">
                Countries Served
              </p>
              <p className="font-bold text-[27px] text-black">50+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
