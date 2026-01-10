import { BadgePercent, Cpu, Send, ShieldCheck } from "lucide-react";

export default function WhyChooseSection() {
  return (
    <section className="py-[40px] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-full mx-auto">
        <div className="text-center mb-[24px]">
          <h2 className="font-medium text-[26px] leading-[35px] text-[#0d1b2a] mb-[8px]">
            Why Smart Buyer Choose{" "}
            <span className="text-[#2ec096]">Zeerostock</span>
          </h2>
          <p className="font-semibold text-[12px] leading-normal text-[#9c9c9c]">
            Join thousands of procurement professional who are transforming
            their sourcing with our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          {/* Card 1 */}
          <div className="relative bg-[#2aae7a] rounded-[20px] shadow-[0px_0px_5px_0px_rgba(24,181,34,0.5)] h-[143px] flex flex-col items-center px-[11px] pt-[21px] pb-[11px]">
            <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-[#eeffef] rounded-full p-[8px] flex items-center justify-center shadow-md">
              <BadgePercent className="w-[20px] h-[20px] text-[#2aae7a]" />
            </div>
            <h3 className="font-semibold text-[11px] text-[#022778] text-center mt-[21px] mb-[5px]">
              Reduce Costs by 30-60%
            </h3>
            <p className="font-semibold text-[8px] text-white text-center">
              Access surplus inventory at significantly discounted prices
              compared to traditional suppliers
            </p>
          </div>
          {/* Card 2 */}
          <div className="relative bg-[#2aae7a] rounded-[20px] shadow-[0px_0px_5px_0px_rgba(24,181,34,0.5)] h-[143px] flex flex-col items-center px-[11px] pt-[21px] pb-[11px]">
            <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-[#eeffef] rounded-full p-[8px] flex items-center justify-center shadow-md">
              <Cpu className="w-[20px] h-[20px] text-[#2aae7a]" />
            </div>
            <h3 className="font-semibold text-[11px] text-[#022778] text-center mt-[21px] mb-[5px]">
              AI-Powered Sourcing
            </h3>
            <p className="font-semibold text-[8px] text-white text-center">
              Our intelligent matching system finds exactly what you need from
              verified suppliers worldwide
            </p>
          </div>
          {/* Card 3 */}
          <div className="relative bg-[#2aae7a] rounded-[20px] shadow-[0px_0px_5px_0px_rgba(24,181,34,0.5)] h-[143px] flex flex-col items-center px-[11px] pt-[21px] pb-[11px]">
            <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-[#eeffef] rounded-full p-[8px] flex items-center justify-center shadow-md">
              <Send className="w-[20px] h-[20px] text-[#2aae7a]" />
            </div>
            <h3 className="font-semibold text-[11px] text-[#022778] text-center mt-[21px] mb-[5px]">
              Faster Procurement
            </h3>
            <p className="font-semibold text-[8px] text-white text-center">
              Cut procurement time from weeks to days with instant supplier
              matching and streamlined processes
            </p>
          </div>
          {/* Card 4 */}
          <div className="relative bg-[#2aae7a] rounded-[20px] shadow-[0px_0px_5px_0px_rgba(24,181,34,0.5)] h-[143px] flex flex-col items-center px-[11px] pt-[21px] pb-[11px]">
            <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-[#eeffef] rounded-full p-[8px] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-[20px] h-[20px] text-[#2aae7a]" />
            </div>
            <h3 className="font-semibold text-[11px] text-[#022778] text-center mt-[21px] mb-[5px]">
              Risk Free Transactions
            </h3>
            <p className="font-semibold text-[8px] text-white text-center">
              Every purchase is protected by escrow payments and comprehensive
              supplier verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
