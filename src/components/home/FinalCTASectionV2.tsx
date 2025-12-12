export default function FinalCTASectionV2() {
  return (
    <section className="w-full py-10 px-[82px]">
      <div className="bg-[#39ac7a] rounded-[30px] overflow-hidden w-[1276px] h-[564px] mx-auto px-[179px] py-[60px]">
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center text-center mb-[63px]">
          <h2 className="text-[45px] leading-[55px] font-semibold text-white mb-[20px] max-w-[884px]">
            Start Maximizing Value from Your Surplus Today
          </h2>
          <p className="text-[23px] font-semibold text-gray-700 max-w-[884px]">
            Join thousands of suppliers, buyers, and agents who are already
            transforming surplus inventory into profitable opportunities.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-[90px] justify-center mb-[60px]">
          <button className="bg-[#063576] text-white text-[22px] font-semibold px-[67px] py-[16px] rounded-[12px] h-[59px] w-[280px] hover:opacity-90 transition-opacity">
            Sign Up Free
          </button>
          <button className="bg-white text-[#2aae7a] text-[22px] font-semibold px-[84px] py-[19px] rounded-[12px] h-[60px] w-[280px] hover:opacity-90 transition-opacity">
            Talk to Us
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-end px-[83px]">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <span className="text-[40px] font-bold text-black mb-[23px]">
              10,000+
            </span>
            <span className="text-[23px] font-semibold text-gray-700">
              Active Users
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <span className="text-[40px] font-bold text-black mb-[23px]">
              $2.4B+
            </span>
            <span className="text-[23px] font-semibold text-gray-700">
              Transaction Volume
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <span className="text-[40px] font-bold text-black mb-[17px]">
              95%
            </span>
            <span className="text-[23px] font-semibold text-gray-700">
              Success Rate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
