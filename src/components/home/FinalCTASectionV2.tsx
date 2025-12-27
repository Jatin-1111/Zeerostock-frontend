export default function FinalCTASectionV2() {
  return (
    <section className="w-full py-[25px]">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="bg-[#39ac7a] rounded-[22.5px] overflow-hidden w-full max-w-[957px] mx-auto px-4 py-[45px]">
          {/* Title and Subtitle */}
          <div className="flex flex-col items-center text-center mb-[47.25px]">
            <h2 className="text-[33.75px] leading-[41.25px] font-semibold text-white mb-[15px] max-w-[663px]">
              Start Maximizing Value from Your Surplus Today
            </h2>
            <p className="text-[17.25px] font-semibold leading-normal text-[#374151] max-w-[663px]">
              Join thousands of suppliers, buyers, and agents who are already
              transforming surplus inventory into profitable opportunities.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-[67.5px] justify-center mb-[45px]">
            <button className="bg-[#063576] text-white text-[16.5px] font-semibold rounded-[9px] h-[44.25px] w-[210px] flex items-center justify-center hover:opacity-90 transition-opacity">
              Sign Up Free
            </button>
            <button className="bg-white text-[#2aae7a] text-[16.5px] font-semibold rounded-[9px] h-[45px] w-[210px] flex items-center justify-center hover:opacity-90 transition-opacity">
              Talk to Us
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-end max-w-[663px] mx-auto">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <span className="text-[30px] font-bold leading-[18.75px] text-black mb-[17.25px]">
                10,000+
              </span>
              <span className="text-[17.25px] font-semibold leading-normal text-[#374151]">
                Active Users
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <span className="text-[30px] font-bold leading-[18.75px] text-black mb-[17.25px]">
                $2.4B+
              </span>
              <span className="text-[17.25px] font-semibold leading-normal text-[#374151]">
                Transaction Volume
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <span className="text-[30px] font-bold leading-[18.75px] text-black mb-[17.25px]">
                95%
              </span>
              <span className="text-[17.25px] font-semibold leading-normal text-[#374151]">
                Success Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
