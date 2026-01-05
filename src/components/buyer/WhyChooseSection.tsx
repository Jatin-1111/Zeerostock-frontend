import { BadgePercent, Cpu, Send, ShieldCheck } from "lucide-react";

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-[#EEFBF6] py-15 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-full mx-auto">
        <div className="text-center mb-9">
          <h2 className="font-medium text-[39px] leading-[52.5px] text-[#0d1b2a] mb-[11.25px]">
            Why Smart Buyer Choose{" "}
            <span className="text-[#2ec096]">Zeerostock</span>
          </h2>
          <p className="font-semibold text-[18px] leading-normal text-[#9c9c9c]">
            Join thousands of procurement professional who are transforming
            their sourcing with our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="relative bg-[#2aae7a] rounded-[30px] shadow-[0px_0px_7.5px_0px_rgba(24,181,34,0.5)] h-[214.5px] flex flex-col items-center px-4 pt-8 pb-4">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#eeffef] rounded-full p-[11.25px] flex items-center justify-center shadow-md">
              <BadgePercent className="w-[30px] h-[30px] text-[#2aae7a]" />
            </div>
            <h3 className="font-semibold text-[16.5px] text-[#022778] text-center mt-8 mb-2">
              Reduce Costs by 30-60%
            </h3>
            <p className="font-semibold text-[12px] text-white text-center">
              Access surplus inventory at significantly discounted prices
              compared to traditional suppliers
            </p>
          </div>
          {/* Card 2 */}
          <div className="relative bg-[#2aae7a] rounded-[30px] shadow-[0px_0px_7.5px_0px_rgba(24,181,34,0.5)] h-[214.5px] flex flex-col items-center px-4 pt-8 pb-4">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#eeffef] rounded-full p-[11.25px] flex items-center justify-center shadow-md">
              <Cpu className="w-[30px] h-[30px] text-[#2aae7a]" />
            </div>
            <h3 className="font-semibold text-[16.5px] text-[#022778] text-center mt-8 mb-2">
              AI-Powered Sourcing
            </h3>
            <p className="font-semibold text-[12px] text-white text-center">
              Our intelligent matching system finds exactly what you need from
              verified suppliers worldwide
            </p>
          </div>
          {/* Card 3 */}
          <div className="relative bg-[#2aae7a] rounded-[30px] shadow-[0px_0px_7.5px_0px_rgba(24,181,34,0.5)] h-[214.5px] flex flex-col items-center px-4 pt-8 pb-4">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#eeffef] rounded-full p-[11.25px] flex items-center justify-center shadow-md">
              <Send className="w-[30px] h-[30px] text-[#2aae7a]" />
            </div>
            <h3 className="font-semibold text-[16.5px] text-[#022778] text-center mt-8 mb-2">
              Faster Procurement
            </h3>
            <p className="font-semibold text-[12px] text-white text-center">
              Cut procurement time from weeks to days with instant supplier
              matching and streamlined processes
            </p>
          </div>
          {/* Card 4 */}
          <div className="relative bg-[#2aae7a] rounded-[30px] shadow-[0px_0px_7.5px_0px_rgba(24,181,34,0.5)] h-[214.5px] flex flex-col items-center px-4 pt-8 pb-4">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#eeffef] rounded-full p-[11.25px] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-[30px] h-[30px] text-[#2aae7a]" />
            </div>
            <h3 className="font-semibold text-[16.5px] text-[#022778] text-center mt-8 mb-2">
              Risk Free Transactions
            </h3>
            <p className="font-semibold text-[12px] text-white text-center">
              Every purchase is protected by escrow payments and comprehensive
              supplier verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
