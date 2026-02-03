import Link from "next/link";

export default function FinalCTASectionV2() {
  return (
    <section className="w-full py-3 sm:py-4 md:py-[17px]">
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-[880px] mx-auto px-4">
        <div className="bg-[#39ac7a] rounded-xl sm:rounded-2xl md:rounded-[15px] overflow-hidden w-full py-6 sm:py-8 md:py-[30px]">
          {/* Title and Subtitle */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-[31.5px]">
            <h2 className="text-lg sm:text-xl md:text-[22.5px] leading-tight sm:leading-normal md:leading-[27.5px] font-semibold text-white mb-2 sm:mb-3 md:mb-[10px] px-3">
              Start Maximizing Value from Your Surplus Today
            </h2>
            <p className="text-xs sm:text-sm md:text-[11.5px] font-semibold leading-normal text-[#374151] px-3">
              Join thousands of suppliers, buyers, and agents who are already
              transforming surplus inventory into profitable opportunities.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-[45px] justify-center mb-6 sm:mb-8 md:mb-[30px] mx-auto items-center">
            <Link
              href="/signup"
              className="bg-[#063576] text-white text-xs sm:text-sm md:text-[11px] font-semibold rounded-md sm:rounded-lg md:rounded-[6px] h-10 sm:h-11 md:h-[29.5px] w-[200px] md:w-[140px] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              Sign Up Free
            </Link>
            <Link
              href="/helpdesk"
              className="bg-white text-[#2aae7a] text-xs sm:text-sm md:text-[11px] font-semibold rounded-md sm:rounded-lg md:rounded-[6px] h-10 sm:h-11 md:h-[30px] w-[200px] md:w-[140px] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              Talk to Us
            </Link>
          </div>

          {/* Stats */}
          <div className="hidden md:flex flex-row flex-wrap justify-center sm:justify-between items-end gap-6 sm:gap-6 px-4 sm:px-24">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl md:text-[20px] font-bold leading-tight sm:leading-normal md:leading-[12.5px] text-black mb-2 sm:mb-3 md:mb-[11.5px]">
                10,000+
              </span>
              <span className="text-xs sm:text-sm md:text-[11.5px] font-semibold leading-normal text-[#374151]">
                Active Users
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl md:text-[20px] font-bold leading-tight sm:leading-normal md:leading-[12.5px] text-black mb-2 sm:mb-3 md:mb-[11.5px]">
                $2.4B+
              </span>
              <span className="text-xs sm:text-sm md:text-[11.5px] font-semibold leading-normal text-[#374151]">
                Transaction Volume
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl md:text-[20px] font-bold leading-tight sm:leading-normal md:leading-[12.5px] text-black mb-2 sm:mb-3 md:mb-[11.5px]">
                95%
              </span>
              <span className="text-xs sm:text-sm md:text-[11.5px] font-semibold leading-normal text-[#374151]">
                Success Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
