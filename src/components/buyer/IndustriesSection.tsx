import { Factory, Building2, Stethoscope, Monitor } from "lucide-react";

export default function IndustriesSection() {
  return (
    <section className="bg-[#EEFBF6] py-10 px-2 md:py-16 md:px-8 w-full mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight">
            Perfect for Every Industry
          </h2>
          <p className="text-base md:text-xl text-gray-600">
            No matter your industry, find the surplus inventory you need at
            unbeatable prices.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Manufacturing */}
          <div className="bg-[#EEFFEF] p-4 md:p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center mb-3">
              <Factory className="w-6 h-6 text-[#00B67A] mr-2" />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Manufacturing
              </h3>
            </div>
            <p className="text-[#00B67A] font-bold mb-1 md:mb-2 text-sm md:text-base">
              30-50% cost savings
            </p>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
              Raw materials & components
            </p>
            <p className="text-gray-600 text-xs md:text-base">
              Source surplus steel, aluminum, machinery parts, and raw materials
              from verified industrial suppliers.
            </p>
          </div>
          {/* Construction */}
          <div className="bg-[#EEFFEF] p-4 md:p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center mb-3">
              <Building2 className="w-6 h-6 text-[#00B67A] mr-2" />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Construction
              </h3>
            </div>
            <p className="text-[#00B67A] font-bold mb-1 md:mb-2 text-sm md:text-base">
              40-60% cost reduction
            </p>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
              Building materials & equipment
            </p>
            <p className="text-gray-600 text-xs md:text-base">
              Find surplus cement, rebar/rods, heavy equipment, and construction
              materials for your projects.
            </p>
          </div>
          {/* Healthcare */}
          <div className="bg-[#EEFFEF] p-4 md:p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center mb-3">
              <Stethoscope className="w-6 h-6 text-[#00B67A] mr-2" />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Healthcare
              </h3>
            </div>
            <p className="text-[#00B67A] font-bold mb-1 md:mb-2 text-sm md:text-base">
              15-40% savings
            </p>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
              Medical equipment & supplies
            </p>
            <p className="text-gray-600 text-xs md:text-base">
              Access surplus medical devices, laboratory equipment, and
              healthcare supplies from trusted suppliers.
            </p>
          </div>
          {/* Technology */}
          <div className="bg-[#EEFFEF] p-4 md:p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col h-full">
            <div className="flex items-center mb-3">
              <Monitor className="w-6 h-6 text-[#00B67A] mr-2" />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Technology
              </h3>
            </div>
            <p className="text-[#00B67A] font-bold mb-1 md:mb-2 text-sm md:text-base">
              30-50% cost savings
            </p>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
              IT hardware & components
            </p>
            <p className="text-gray-600 text-xs md:text-base">
              Source surplus servers, networking equipment, and electronic
              components for IT infrastructure projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
