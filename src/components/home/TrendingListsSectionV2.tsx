"use client";

import Image from "next/image";
import { ArrowUp, ArrowDown } from "lucide-react";

const imgProduct1 =
  "https://www.figma.com/api/mcp/asset/2d45e833-8ce6-4e4a-915a-9d4acc9fe20a";
const imgProduct2 =
  "https://www.figma.com/api/mcp/asset/9a62cc83-6787-4773-af15-f17846a54887";
const imgProduct3 =
  "https://www.figma.com/api/mcp/asset/1004f5d2-edf7-4f22-9226-14fd2eb4ced8";
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
    <section className="bg-[#eefbf6] w-full py-[33px] px-[60px]">
      {/* Title - 75% scaled (50px → 38px) */}
      <h2 className="text-center text-[38px] font-bold mb-2 leading-normal">
        <span className="text-[#0d1b2a]">Trending </span>
        <span className="text-[#2ec096]">Lists</span>
        <span className="text-[#0d1b2a]"> & </span>
        <span className="text-[#2ec096]">Market</span>
        <span className="text-[#0d1b2a]"> Analysis</span>
      </h2>

      {/* Subtitle - 75% scaled (25px → 19px) */}
      <p className="text-center text-[19px] font-semibold text-[#6b7280] mb-[86px] leading-normal max-w-[806px] mx-auto">
        Discover high-demand inventory and stay informed with real-time market
        insights
      </p>

      {/* Content Grid - 75% scaled gap (39px → 29px) */}
      <div className="flex gap-[29px] max-w-[950px] mx-auto items-start">
        {/* Left Column - Product Cards, 75% scaled (600px → 450px) */}
        <div className="flex flex-col gap-[15px] w-[450px]">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-[#063576] rounded-[15px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] min-h-[172px] p-[21px] flex gap-[21px] relative overflow-hidden"
            >
              {/* Product Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-[23px] font-bold text-[#2bc295] mb-1.5 leading-tight">
                  {product.title}
                </h3>
                <p className="text-[17px] font-semibold text-[#787878] mb-1.5 leading-tight">
                  {product.category}
                </p>
                <div className="flex flex-col mt-auto">
                  <span className="text-[23px] font-bold text-[#0bd600] leading-tight">
                    {product.currentPrice}
                  </span>
                  <span className="text-[18px] font-bold text-[#9dce98] line-through leading-tight">
                    {product.originalPrice}
                  </span>
                </div>
              </div>

              {/* Product Image - 75% scaled (281px → 211px, 176px → 132px) */}
              <div className="relative w-[211px] h-[132px] rounded-[15px] overflow-hidden shrink-0">
                <Image
                  alt={product.title}
                  className="object-cover"
                  src={product.image}
                  fill
                  unoptimized
                />
              </div>

              {/* Discount Badge - 75% scaled */}
              <div className="absolute top-3.5 right-3.5 bg-[#d0ffdb] px-2 py-[3px] rounded-[7px]">
                <span className="text-[11px] font-bold text-[#18a328] leading-none">
                  {product.discount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Market Analysis, 75% scaled (638px → 479px, 727px → 545px) */}
        <div className="bg-[#063576] rounded-[15px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] w-[479px] flex-1 p-[21px] flex flex-col">
          <h3 className="text-[26px] font-extrabold text-[#2bc295] mb-5 leading-normal">
            Live Market Analysis
          </h3>

          {/* Chart Placeholder - 75% scaled (573px → 430px, 284px → 213px) */}
          <div className="relative w-full h-[213px] rounded-[15px] border-[3px] border-[#545f71] overflow-hidden mb-3.5">
            <Image
              alt="Market Chart"
              className="object-cover"
              src={imgMarketChart}
              fill
              unoptimized
            />
          </div>

          {/* Market Data Grid - 75% scaled gap (20px → 15px) */}
          <div className="grid grid-cols-2 gap-[15px]">
            {marketData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-[15px]"
              >
                <h4 className="text-[19px] font-bold text-[#2bc295] mb-3 leading-normal">
                  {data.title}
                </h4>
                <div className="flex items-center gap-2">
                  {data.isUp ? (
                    <ArrowUp
                      className="w-[26px] h-[26px] text-[#0bd600]"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <ArrowDown
                      className="w-[26px] h-[26px] text-[#ff0404]"
                      strokeWidth={2.5}
                    />
                  )}
                  <span
                    className={`text-[30px] font-bold leading-normal ${
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
