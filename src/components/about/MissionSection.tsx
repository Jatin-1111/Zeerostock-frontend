export default function MissionSection() {
  return (
    <section className="w-full bg-[#EEFBF6] py-16">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full flex flex-col items-center">
          {/* Title */}
          <h2 className="font-poppins font-semibold text-5xl leading-tight lg:leading-[70px] text-center text-[#0d1b2a] max-w-4xl mb-6 px-4">
            Building a Sustainable Future Through{" "}
            <span className="text-[#2ec096]">Smart Commerce</span>
          </h2>

          {/* Description */}
          <p className="font-inter font-semibold text-base leading-relaxed lg:leading-[25px] text-center text-[#868181] max-w-5xl mb-16 px-4">
            Every year, billions of dollars in surplus inventory goes to waste.
            We believe there&apos;s a better way, By connecting suppliers with
            buyers through intelligent matching
          </p>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
            {/* Active Businesses */}
            <div className="bg-[#eeffef] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[140px] flex flex-col items-center justify-center text-center px-4">
              <p className="font-inter font-semibold text-[18px] text-black mb-2">
                Active Businesses
              </p>
              <p className="font-inter font-bold text-[40px] text-black">
                10,000+
              </p>
            </div>

            {/* Total Transaction Volume */}
            <div className="bg-[#eeffef] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[140px] flex flex-col items-center justify-center text-center px-4">
              <p className="font-inter font-semibold text-[18px] text-black mb-2">
                Total Transaction Volume
              </p>
              <p className="font-inter font-bold text-[40px] text-black">
                $2.4B+
              </p>
            </div>

            {/* Customer Satisfaction */}
            <div className="bg-[#eeffef] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[140px] flex flex-col items-center justify-center text-center px-4">
              <p className="font-inter font-semibold text-[18px] text-black mb-2">
                Customer Satisfaction
              </p>
              <p className="font-inter font-bold text-[40px] text-black">95%</p>
            </div>

            {/* Countries Served */}
            <div className="bg-[#eeffef] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] h-[140px] flex flex-col items-center justify-center text-center px-4">
              <p className="font-inter font-semibold text-[18px] text-black mb-2">
                Countries Served
              </p>
              <p className="font-inter font-bold text-[40px] text-black">50+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
