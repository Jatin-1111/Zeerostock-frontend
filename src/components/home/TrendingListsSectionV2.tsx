"use client";

import Image from "next/image";
import { ArrowUp, ArrowDown } from "lucide-react";

const imgProduct1 = "/22.jpg";
const imgProduct2 = "/196006c025d5e21c3d5e8aae0f4d45da.jpg";
const imgProduct3 =
  "/Industrial-Manufacturing-Services-Header-1200x900-Machine.jpg";
const imgMarketChart =
  "https://www.figma.com/api/mcp/asset/13b91b8d-703d-4d55-be7f-e213f83f1b91";

export default function TrendingListsSectionV2() {
  const products = [
    {
      title: "HR Steel Coils",
      category: "Raw Materials",
      currentPrice: "₹20,00,000",
      originalPrice: "₹25,00,000",
      discount: "Save 15%",
      image: imgProduct1,
    },
    {
      title: "Semiconductor Chips",
      category: "Electronics",
      currentPrice: "₹12,00,000",
      originalPrice: "₹16,00,000",
      discount: "Save 22%",
      image: imgProduct2,
    },
    {
      title: "Kraft Machines",
      category: "Machinery",
      currentPrice: "₹31,00,000",
      originalPrice: "₹35,00,000",
      discount: "Save 18%",
      image: imgProduct3,
    },
  ];

  const marketData = [
    { title: "Steel Prices", change: "2.5%", isUp: true },
    { title: "Copper Demand", change: "1.8%", isUp: false },
    { title: "Logistics Cost", change: "0.7%", isUp: true },
    { title: "Surplus Demand", change: "3.2%", isUp: true },
  ];

  return (
    <section className="bg-[#eefbf6] w-full py-4 sm:py-5 md:py-[22px] px-4 sm:px-6 md:px-8 lg:px-[40px]">
      {/* Title - 75% scaled (50px → 38px) */}
      <h2 className="text-center text-xl sm:text-2xl md:text-[25px] font-bold mb-2 leading-normal">
        <span className="text-[#0d1b2a]">Trending </span>
        <span className="text-[#2ec096]">Lists</span>
        <span className="text-[#0d1b2a]"> & </span>
        <span className="text-[#2ec096]">Market</span>
        <span className="text-[#0d1b2a]"> Analysis</span>
      </h2>

      {/* Subtitle - 75% scaled (25px → 19px) */}
      <p className="text-center text-xs sm:text-sm md:text-[13px] font-semibold text-[#6b7280] mb-6 sm:mb-10 md:mb-[57px] leading-normal max-w-full sm:max-w-md md:max-w-[537px] mx-auto px-4 sm:px-0">
        Discover high-demand inventory and stay informed with real-time market
        insights
      </p>

      {/* Content Grid - 75% scaled gap (39px → 29px) */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-[19px] max-w-full lg:max-w-[633px] mx-auto items-start">
        {/* Left Column - Product Cards, 75% scaled (600px → 450px) */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-[10px] w-full lg:w-[300px]">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-[#063576] rounded-lg sm:rounded-xl md:rounded-[10px] shadow-[0px_0px_7px_1px_rgba(0,0,0,0.25)] min-h-[100px] sm:min-h-[110px] md:min-h-[115px] p-3 sm:p-4 md:p-[14px] flex gap-3 sm:gap-4 md:gap-[14px] relative overflow-hidden"
            >
              {/* Product Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-sm sm:text-base md:text-[15px] font-bold text-[#2bc295] mb-1.5 leading-tight">
                  {product.title}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-[11px] font-semibold text-[#787878] mb-1.5 leading-tight">
                  {product.category}
                </p>
                <div className="flex flex-col mt-auto">
                  <span className="text-sm sm:text-base md:text-[15px] font-bold text-[#0bd600] leading-tight">
                    {product.currentPrice}
                  </span>
                  <span className="text-xs sm:text-sm md:text-[12px] font-bold text-[#9dce98] line-through leading-tight">
                    {product.originalPrice}
                  </span>
                </div>
              </div>

              {/* Product Image - 75% scaled (281px → 211px, 176px → 132px) */}
              <div className="relative w-28 h-20 sm:w-32 sm:h-24 md:w-[141px] md:h-[88px] rounded-lg sm:rounded-xl md:rounded-[10px] overflow-hidden shrink-0">
                <Image
                  alt={product.title}
                  className="object-cover"
                  src={product.image}
                  fill
                  unoptimized
                />
              </div>

              {/* Discount Badge - 75% scaled */}
              <div className="absolute top-2 right-2 bg-[#d0ffdb] px-1 py-[2px] rounded-[5px]">
                <span className="text-[7px] font-bold text-[#18a328] leading-none">
                  {product.discount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Market Analysis, 75% scaled (638px → 479px, 727px → 545px) */}
        <div className="bg-[#063576] rounded-lg sm:rounded-xl md:rounded-[10px] shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] w-full lg:w-[319px] lg:flex-1 p-3 sm:p-4 md:p-[14px] flex flex-col">
          <h3 className="text-base sm:text-lg md:text-[17px] font-extrabold text-[#2bc295] mb-3 leading-normal">
            Live Market Analysis
          </h3>

          {/* Chart Placeholder - 75% scaled (573px → 430px, 284px → 213px) */}
          <div className="relative w-full h-32 sm:h-36 md:h-[142px] rounded-lg sm:rounded-xl md:rounded-[10px] border-[2px] border-[#545f71] overflow-hidden mb-2">
            <Image
              alt="Market Chart"
              className="object-cover"
              src={imgMarketChart}
              fill
              unoptimized
            />
          </div>

          {/* Market Data Grid - 75% scaled gap (20px → 15px) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-[10px]">
            {marketData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-2 sm:p-3 md:p-[10px]"
              >
                <h4 className="text-xs sm:text-sm md:text-[13px] font-bold text-[#2bc295] mb-2 leading-normal">
                  {data.title}
                </h4>
                <div className="flex items-center gap-2">
                  {data.isUp ? (
                    <ArrowUp
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-[17px] md:h-[17px] text-[#0bd600]"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <ArrowDown
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-[17px] md:h-[17px] text-[#ff0404]"
                      strokeWidth={2.5}
                    />
                  )}
                  <span
                    className={`text-lg sm:text-xl md:text-[20px] font-bold leading-normal ${
                      data.isUp ? "text-[#0bd600]" : "text-[#ff0404]"
                    }`}
                  >
                    {data.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
