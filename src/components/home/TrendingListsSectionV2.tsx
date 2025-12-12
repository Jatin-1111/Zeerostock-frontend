"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

const imgProduct1 =
  "https://www.figma.com/api/mcp/asset/bbf8158b-2af6-4ce3-8a97-001c1166d9b1";
const imgProduct2 =
  "https://www.figma.com/api/mcp/asset/3c3c0f3a-95cd-4555-8071-5d3d981bf43b";
const imgProduct3 =
  "https://www.figma.com/api/mcp/asset/de50ea87-9c86-4d5e-8736-4b9c19254182";
const imgMarketChart =
  "https://www.figma.com/api/mcp/asset/7c032063-570a-4802-b408-201f452f7166";

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
    <section className="bg-[#eefbf6] w-full py-[44px] px-[80px]">
      {/* Title */}
      <h2 className="text-center text-[50px] font-bold mb-[10px]">
        <span className="text-[#0d1b2a]">Trending </span>
        <span className="text-[#2ec096]">Lists</span>
        <span className="text-[#0d1b2a]"> & </span>
        <span className="text-[#2ec096]">Market</span>
        <span className="text-[#0d1b2a]"> Analysis</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-[25px] font-semibold text-gray-500 mb-[114px]">
        Discover high-demand inventory and stay informed with real-time market
        insights
      </p>

      {/* Content Grid */}
      <div className="flex gap-[39px]">
        {/* Left Column - Product Cards */}
        <div className="flex flex-col gap-[20px] w-[600px]">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-[#063576] rounded-[20px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] h-[229px] p-[28px] flex gap-[28px] relative"
            >
              {/* Product Info */}
              <div className="flex flex-col flex-1">
                <h3 className="text-[30px] font-bold text-[#2bc295] mb-[10px]">
                  {product.title}
                </h3>
                <p className="text-[23px] font-semibold text-[#787878] mb-[10px]">
                  {product.category}
                </p>
                <div className="flex flex-col">
                  <span className="text-[30px] font-bold text-[#0bd600]">
                    {product.currentPrice}
                  </span>
                  <span className="text-[24px] font-bold text-[#9dce98] line-through">
                    {product.originalPrice}
                  </span>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative w-[281px] h-[176px] rounded-[20px] overflow-hidden">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover"
                  src={product.image}
                />
              </div>

              {/* Discount Badge */}
              <div className="absolute top-[18px] right-[18px] bg-[#d0ffdb] px-[10px] py-[4px] rounded-[9px]">
                <span className="text-[14px] font-bold text-[#18a328]">
                  {product.discount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Market Analysis */}
        <div className="bg-[#063576] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] w-[638px] h-[727px] p-[28px]">
          <h3 className="text-[35px] font-extrabold text-[#2bc295] mb-[26px]">
            Live Market Analysis
          </h3>

          {/* Chart Placeholder */}
          <div className="relative w-full h-[281px] rounded-[20px] border-4 border-[#545f71] overflow-hidden mb-[19px]">
            <img
              alt="Market Chart"
              className="w-full h-full object-cover"
              src={imgMarketChart}
            />
          </div>

          {/* Market Data Grid */}
          <div className="grid grid-cols-2 gap-[20px]">
            {marketData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-[20px]"
              >
                <h4 className="text-[25px] font-bold text-[#2bc295] mb-[16px]">
                  {data.title}
                </h4>
                <div className="flex items-center gap-[10px]">
                  {data.isUp ? (
                    <ArrowUp className="w-[34px] h-[34px] text-[#0bd600]" />
                  ) : (
                    <ArrowDown className="w-[34px] h-[34px] text-[#ff0404]" />
                  )}
                  <span
                    className={`text-[40px] font-bold ${
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
