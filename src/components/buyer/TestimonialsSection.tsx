import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="bg-[#EEFFEF] py-[27px] px-[5px] md:py-[43px] md:px-[21px] mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="text-center mb-[21px] md:mb-[43px]">
          <p className="text-xs md:text-xs font-semibold text-[#0D1B2A] mb-[3px] tracking-wide uppercase">
            Success Stories
          </p>
          <h2 className="text-lg md:text-2xl font-bold text-[#0D1B2A] mb-[5px] md:mb-[11px] leading-tight">
            Real
            <span className="text-[#2AAE7A]"> Results </span>
            from Real <span className="text-[#2AAE7A]"> Buyers </span>
          </h2>
          <p className="text-xs md:text-sm text-gray-600">
            See how procurement teams are achieving significant cost savings
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[11px] md:gap-[21px]">
          {/* Card 1 */}
          <div className="bg-[#EEFFEF] p-[11px] md:p-[21px] rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-[1px] mb-[8px]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#DFB769] fill-[#DFB769]"
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-4 md:mb-6 font-medium">
              &quot;Zeerostock has transformed our procurement process. The AI
              matching is incredible.&quot;
            </p>
            <div className="border-t border-gray-200 pt-[8px] mt-auto">
              <p className="font-bold text-[#2AAE7A] text-xs md:text-sm">
                $3.2M annual savings
              </p>
              <p className="text-xs md:text-xs text-gray-900 font-semibold mt-[3px] md:mt-[5px]">
                Automotive Supplier
              </p>
              <p className="text-xs md:text-xs text-gray-500">
                California, USA
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-[#EEFFEF] p-[11px] md:p-[21px] rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-[1px] mb-[8px]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-[11px] h-[11px] md:w-[13px] md:h-[13px] text-[#DFB769] fill-[#DFB769]"
                />
              ))}
            </div>
            <p className="text-gray-700 text-xs md:text-xs mb-[11px] md:mb-[16px] font-medium">
              &quot;Finally, a reliable platform for sourcing quality OEM
              surplus parts. The platform is a game changer.&quot;
            </p>
            <div className="border-t border-gray-200 pt-[8px] mt-auto">
              <p className="font-bold text-[#2AAE7A] text-xs md:text-sm">
                $890K annual savings
              </p>
              <p className="text-xs md:text-xs text-gray-900 font-semibold mt-[3px] md:mt-[5px]">
                Electronics Manufacturer
              </p>
              <p className="text-xs md:text-xs text-gray-500">
                Singapore
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-[#EEFFEF] p-[11px] md:p-[21px] rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-[1px] mb-[8px]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-[11px] h-[11px] md:w-[13px] md:h-[13px] text-[#DFB769] fill-[#DFB769]"
                />
              ))}
            </div>
            <p className="text-gray-700 text-xs md:text-xs mb-[11px] md:mb-[16px] font-medium">
              &quot;The verification process gives us complete peace of mind.
              We&apos;ve reduced our procurement time significantly.&quot;
            </p>
            <div className="border-t border-gray-200 pt-[8px] mt-auto">
              <p className="font-bold text-[#2AAE7A] text-xs md:text-sm">
                $2.1M cost reduction
              </p>
              <p className="text-xs md:text-xs text-gray-900 font-semibold mt-[3px] md:mt-[5px]">
                Aerospace Supplier
              </p>
              <p className="text-xs md:text-xs text-gray-500">
                Texas, USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
