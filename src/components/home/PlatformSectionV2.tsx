import { Package, ShoppingCart } from "lucide-react";

export default function PlatformSectionV2() {
  return (
    <section className="bg-[#eefbf6] w-full py-3 sm:py-4 md:py-[19px] px-4 sm:px-8 md:px-12 lg:px-[75px]">
      {/* Title - 75% scaled (52px → 39px) */}
      <h2 className="text-center text-xl sm:text-2xl md:text-[26px] font-bold mb-2 leading-normal">
        <span className="text-[#0d1b2a]">One Platform, Two </span>
        <span className="text-[#2ec096]">Success Stories</span>
      </h2>

      {/* Subtitle - 75% scaled (24px → 18px) */}
      <p className="text-center text-xs sm:text-sm md:text-[12px] font-semibold text-[#6b7280] mb-4 sm:mb-6 md:mb-[37px] leading-normal px-4 sm:px-0">
        Discover how Zeerostock creates value for every participant in the
        surplus inventory ecosystem
      </p>

      {/* Cards Container - 75% scaled gap (110px → 83px) */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-[55px] justify-center">
        {/* Suppliers Card - 75% scaled (525px → 394px, 400px → 300px) */}
        <div className="bg-[#2aae7a] rounded-2xl sm:rounded-3xl md:rounded-[30px] shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] w-full sm:w-[220px] md:w-[240px] lg:w-[263px] h-auto sm:h-[180px] md:h-[200px] flex flex-col items-center py-3 sm:py-2 md:py-[10px] gap-2">
          {/* Icon - 75% scaled (100px → 75px) */}
          <div className="w-12 h-12 sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] flex items-center justify-center">
            <Package
              className="w-12 h-12 sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] text-white"
              strokeWidth={1.5}
            />
          </div>

          {/* Title - 75% scaled (40px → 30px) */}
          <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-[#022778] text-center drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)] leading-normal">
            SUPPLIERS
          </h3>

          {/* Description - 75% scaled (24px → 18px) */}
          <div className="text-center text-white text-xs sm:text-sm md:text-[12px] font-semibold px-4 sm:px-6 md:px-9 leading-normal">
            <p className="mb-0">
              Transform surplus inventory into revenue streams
            </p>
            <p className="mb-0">Reduce holding costs & maximize returns</p>
          </div>
        </div>

        {/* Buyers Card - 75% scaled (505px → 379px, 400px → 300px) */}
        <div className="bg-[#2aae7a] rounded-2xl sm:rounded-3xl md:rounded-[30px] shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] w-full sm:w-[220px] md:w-[240px] lg:w-[253px] h-auto sm:h-[180px] md:h-[200px] flex flex-col items-center py-3 sm:py-2 md:py-[10px] gap-2">
          {/* Icon - 75% scaled (100px → 75px) */}
          <div className="w-12 h-12 sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[51px] flex items-center justify-center">
            <ShoppingCart
              className="w-12 h-12 sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] text-white"
              strokeWidth={1.5}
            />
          </div>

          {/* Title - 75% scaled (40px → 30px) */}
          <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-[#022778] text-center drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)] leading-normal">
            BUYERS
          </h3>

          {/* Description - 75% scaled (24px → 18px) */}
          <div className="text-center text-white text-xs sm:text-sm md:text-[12px] font-semibold px-4 sm:px-6 md:px-[31px] leading-normal">
            <p className="mb-0">
              Access quality inventory at competitive prices &
            </p>
            <p className="mb-0">
              Building reliable supply chains with verified partners
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
