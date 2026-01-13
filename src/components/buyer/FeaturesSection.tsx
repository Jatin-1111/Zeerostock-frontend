import {
  Search,
  TrendingUp,
  ShieldCheck,
  ShoppingCart,
  Globe,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-[#EEFFEF] py-[27px] px-[5px] md:py-[43px] md:px-[21px] mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="text-center mb-[21px] md:mb-[43px]">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-[5px] md:mb-[11px] leading-tight">
            Powerful Features for{" "}
            <span className="text-[#00B67A]">Smart Procurement</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-600 font-semibold">
            Everything you need to source, evaluate and purchase surplus
            inventory efficiently
          </p>
        </div>
        <div className="w-full relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[21px]">
          {/* Card 1: Advanced Search & Filtering */}
          <div className="bg-[#00B67A] rounded-[27px] p-[16px] md:p-[21px] flex flex-col items-center text-center h-full">
            <div className="bg-[#EEFFEF] rounded-full p-[8px] md:p-[11px] mb-[11px] md:mb-[16px]">
              <Search className="w-[21px] h-[21px] md:w-[27px] md:h-[27px] text-[#00B67A]" />
            </div>
            <h3 className="text-sm md:text-sm font-bold text-[#022778] mb-[8px] md:mb-[13px]">
              Advance Search & Filtering
            </h3>
            <p className="text-xs md:text-xs text-white font-semibold">
              Find specific products using detailed filters including
              specifications, location, condition, and price range.
            </p>
          </div>

          {/* Card 2: Real-Time Market Data */}
          <div className="bg-[#00B67A] rounded-[27px] p-[16px] md:p-[21px] flex flex-col items-center text-center h-full">
            <div className="bg-[#EEFFEF] rounded-full p-[8px] md:p-[11px] mb-[11px] md:mb-[16px]">
              <TrendingUp className="w-[21px] h-[21px] md:w-[27px] md:h-[27px] text-[#00B67A]" />
            </div>
            <h3 className="text-sm md:text-sm font-bold text-[#022778] mb-[8px] md:mb-[13px]">
              Real-Time Market Data
            </h3>
            <p className="text-xs md:text-xs text-white font-semibold">
              Access current market prices, demand trends, and supplier
              availability to make informed decisions.
            </p>
          </div>

          {/* Card 3: Supplier Verification */}
          <div className="bg-[#00B67A] rounded-[27px] p-[16px] md:p-[21px] flex flex-col items-center text-center h-full">
            <div className="bg-[#EEFFEF] rounded-full p-[8px] md:p-[11px] mb-[11px] md:mb-[16px]">
              <ShieldCheck className="w-[21px] h-[21px] md:w-[27px] md:h-[27px] text-[#00B67A]" />
            </div>
            <h3 className="text-sm md:text-sm font-bold text-[#022778] mb-[8px] md:mb-[13px]">
              Supplier Verification
            </h3>
            <p className="text-xs md:text-xs text-white font-semibold">
              All suppliers undergo rigorous verification including business
              licenses, financial stability, and quality standards.
            </p>
          </div>

          {/* Card 4: Bulk Purchase Tools */}
          <div className="bg-[#00B67A] rounded-[27px] p-[16px] md:p-[21px] flex flex-col items-center text-center h-full md:col-start-2 lg:col-start-auto">
            <div className="bg-[#EEFFEF] rounded-full p-[8px] md:p-[11px] mb-[11px] md:mb-[16px]">
              <ShoppingCart className="w-[21px] h-[21px] md:w-[27px] md:h-[27px] text-[#00B67A]" />
            </div>
            <h3 className="text-sm md:text-sm font-bold text-[#022778] mb-[8px] md:mb-[13px]">
              Bulk Purchase Tools
            </h3>
            <p className="text-xs md:text-xs text-white font-semibold">
              Specialized tools for large-volume purchases including volume
              discounts and consolidated shipping.
            </p>
          </div>

          {/* Card 5: Global Logistics */}
          <div className="bg-[#00B67A] rounded-[27px] p-[16px] md:p-[21px] flex flex-col items-center text-center h-full md:col-start-1 md:col-span-2 lg:col-start-auto lg:col-span-1">
            <div className="bg-[#EEFFEF] rounded-full p-[8px] md:p-[11px] mb-[11px] md:mb-[16px]">
              <Globe className="w-[21px] h-[21px] md:w-[27px] md:h-[27px] text-[#00B67A]" />
            </div>
            <h3 className="text-sm md:text-sm font-bold text-[#022778] mb-[8px] md:mb-[13px]">
              Global Logistics
            </h3>
            <p className="text-xs md:text-xs text-white font-semibold">
              Integrated shipping solutions with tracking, insurance, and
              customs handling for international purchases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
