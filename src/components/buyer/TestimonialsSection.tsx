import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="bg-[#EEFFEF] py-10 px-2 md:py-16 md:px-8 w-full mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <p className="text-xs md:text-sm font-semibold text-[#00B67A] mb-1 tracking-wide uppercase">
            Success Stories
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight">
            Real Results from Real Buyers
          </h2>
          <p className="text-base md:text-xl text-gray-600">
            See how procurement teams are achieving significant cost savings
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Card 1 */}
          <div className="bg-[#EEFFEF] p-4 md:p-8 rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-0.5 mb-3">
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
            <div className="border-t border-gray-200 pt-3 mt-auto">
              <p className="font-bold text-[#2AAE7A] text-base md:text-lg">
                $3.2M annual savings
              </p>
              <p className="text-xs md:text-sm text-gray-900 font-semibold mt-1 md:mt-2">
                Automotive Supplier
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                California, USA
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-[#EEFFEF] p-4 md:p-8 rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#DFB769] fill-[#DFB769]"
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-4 md:mb-6 font-medium">
              &quot;Finally, a reliable platform for sourcing quality OEM
              surplus parts. The platform is a game changer.&quot;
            </p>
            <div className="border-t border-gray-200 pt-3 mt-auto">
              <p className="font-bold text-[#2AAE7A] text-base md:text-lg">
                $890K annual savings
              </p>
              <p className="text-xs md:text-sm text-gray-900 font-semibold mt-1 md:mt-2">
                Electronics Manufacturer
              </p>
              <p className="text-xs md:text-sm text-gray-500">Singapore</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-[#EEFFEF] p-4 md:p-8 rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#DFB769] fill-[#DFB769]"
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-4 md:mb-6 font-medium">
              &quot;The verification process gives us complete peace of mind.
              We&apos;ve reduced our procurement time significantly.&quot;
            </p>
            <div className="border-t border-gray-200 pt-3 mt-auto">
              <p className="font-bold text-[#2AAE7A] text-base md:text-lg">
                $2.1M cost reduction
              </p>
              <p className="text-xs md:text-sm text-gray-900 font-semibold mt-1 md:mt-2">
                Aerospace Supplier
              </p>
              <p className="text-xs md:text-sm text-gray-500">Texas, USA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
