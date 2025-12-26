import {
  Search,
  TrendingUp,
  ShieldCheck,
  ShoppingCart,
  Globe,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-[#EEFFEF] py-10 px-2 md:py-16 md:px-8 w-full mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight">
            Powerful Features for{" "}
            <span className="text-[#00B67A]">Smart Procurement</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 font-semibold">
            Everything you need to source, evaluate and purchase surplus
            inventory efficiently
          </p>
        </div>
        <div className="w-full relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Advanced Search & Filtering */}
          <div className="bg-[#00B67A] rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center h-full">
            <div className="bg-[#EEFFEF] rounded-full p-3 md:p-4 mb-4 md:mb-6">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-[#00B67A]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#022778] mb-3 md:mb-5">
              Advance Search & Filtering
            </h3>
            <p className="text-sm md:text-base text-white font-semibold">
              Find specific products using detailed filters including
              specifications, location, condition, and price range.
            </p>
          </div>

          {/* Card 2: Real-Time Market Data */}
          <div className="bg-[#00B67A] rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center h-full">
            <div className="bg-[#EEFFEF] rounded-full p-3 md:p-4 mb-4 md:mb-6">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-[#00B67A]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#022778] mb-3 md:mb-5">
              Real-Time Market Data
            </h3>
            <p className="text-sm md:text-base text-white font-semibold">
              Access current market prices, demand trends, and supplier
              availability to make informed decisions.
            </p>
          </div>

          {/* Card 3: Supplier Verification */}
          <div className="bg-[#00B67A] rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center h-full">
            <div className="bg-[#EEFFEF] rounded-full p-3 md:p-4 mb-4 md:mb-6">
              <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#00B67A]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#022778] mb-3 md:mb-5">
              Supplier Verification
            </h3>
            <p className="text-sm md:text-base text-white font-semibold">
              All suppliers undergo rigorous verification including business
              licenses, financial stability, and quality standards.
            </p>
          </div>

          {/* Card 4: Bulk Purchase Tools */}
          <div className="bg-[#00B67A] rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center h-full md:col-start-2 lg:col-start-auto">
            <div className="bg-[#EEFFEF] rounded-full p-3 md:p-4 mb-4 md:mb-6">
              <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-[#00B67A]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#022778] mb-3 md:mb-5">
              Bulk Purchase Tools
            </h3>
            <p className="text-sm md:text-base text-white font-semibold">
              Specialized tools for large-volume purchases including volume
              discounts and consolidated shipping.
            </p>
          </div>

          {/* Card 5: Global Logistics */}
          <div className="bg-[#00B67A] rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center h-full md:col-start-1 md:col-span-2 lg:col-start-auto lg:col-span-1">
            <div className="bg-[#EEFFEF] rounded-full p-3 md:p-4 mb-4 md:mb-6">
              <Globe className="w-8 h-8 md:w-10 md:h-10 text-[#00B67A]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#022778] mb-3 md:mb-5">
              Global Logistics
            </h3>
            <p className="text-sm md:text-base text-white font-semibold">
              Integrated shipping solutions with tracking, insurance, and
              customs handling for international purchases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
