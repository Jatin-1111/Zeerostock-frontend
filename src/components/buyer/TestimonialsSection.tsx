import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="bg-[#EEFFEF] py-[27px] md:py-[43px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto">
      <div className="w-full max-w-[1080px] mx-auto">
        <div className="text-center mb-[21px] md:mb-[43px]">
          <p className="text-[8px] md:text-[9px] font-semibold text-[#0D1B2A] mb-[3px] tracking-wide uppercase">
            Success Stories
          </p>
          <h2 className="text-[16px] md:text-[27px] font-bold text-[#0D1B2A] mb-[5px] md:mb-[11px] leading-tight">
            Real
            <span className="text-[#2AAE7A]"> Results </span>
            from Real <span className="text-[#2AAE7A]"> Buyers </span>
          </h2>
          <p className="text-[11px] md:text-[13px] text-gray-600">
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
              <p className="font-bold text-[#2AAE7A] text-[11px] md:text-[12px]">
                $3.2M annual savings
              </p>
              <p className="text-[8px] md:text-[9px] text-gray-900 font-semibold mt-[3px] md:mt-[5px]">
                Automotive Supplier
              </p>
              <p className="text-[8px] md:text-[9px] text-gray-500">
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
            <p className="text-gray-700 text-[9px] md:text-[11px] mb-[11px] md:mb-[16px] font-medium">
              &quot;Finally, a reliable platform for sourcing quality OEM
              surplus parts. The platform is a game changer.&quot;
            </p>
            <div className="border-t border-gray-200 pt-[8px] mt-auto">
              <p className="font-bold text-[#2AAE7A] text-[11px] md:text-[12px]">
                $890K annual savings
              </p>
              <p className="text-[8px] md:text-[9px] text-gray-900 font-semibold mt-[3px] md:mt-[5px]">
                Electronics Manufacturer
              </p>
              <p className="text-[8px] md:text-[9px] text-gray-500">
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
            <p className="text-gray-700 text-[9px] md:text-[11px] mb-[11px] md:mb-[16px] font-medium">
              &quot;The verification process gives us complete peace of mind.
              We&apos;ve reduced our procurement time significantly.&quot;
            </p>
            <div className="border-t border-gray-200 pt-[8px] mt-auto">
              <p className="font-bold text-[#2AAE7A] text-[11px] md:text-[12px]">
                $2.1M cost reduction
              </p>
              <p className="text-[8px] md:text-[9px] text-gray-900 font-semibold mt-[3px] md:mt-[5px]">
                Aerospace Supplier
              </p>
              <p className="text-[8px] md:text-[9px] text-gray-500">
                Texas, USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
