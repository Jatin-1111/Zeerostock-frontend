"use client";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Manufacturing Equipment",
      demand: "High demand",
      subtitle: "CNC machines, industrial robots, production lines.",
      description:
        "Heavy machinery and production equipment from factory closures or upgrades.",
    },
    {
      name: "Raw Materials",
      demand: "Very high demand",
      subtitle: "Steel, aluminum, chemicals, textiles.",
      description:
        "Excess raw materials from overstock, cancelled orders, or production changes.",
    },
    {
      name: "Electronics & IT",
      demand: "Extremely high demand",
      subtitle: "Servers, networking equipment, components.",
      description:
        "Technology hardware from data center upgrades and corporate refreshes.",
    },
    {
      name: "Construction Materials",
      demand: "High demand",
      subtitle: "Lumber, concrete, steel beams, equipment.",
      description:
        "Building materials from project cancellations or surplus orders.",
    },
  ];

  return (
    <div className="w-full bg-[#EEFBF6] px-[60px] py-[75px]">
      {/* Content Container */}
      <div className="max-w-[1320px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[86px]">
          <h2 className="text-[39px] leading-[52px] font-medium text-[#0d1b2a] mb-[11px]">
            <span className="text-[#2ec096]">High Demand</span> Inventory
            Categories
          </h2>
          <p className="text-[18px] font-semibold text-[#9c9c9c]">
            Our platform has active buyers seeking these types of surplus
            inventory right now.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[88px] gap-y-[156px]">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-[#eeffef] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] p-[23px] pb-[33px] relative h-[139.65px] max-w-[95%] overflow-visible"
            >
              {/* Category Title */}
              <h3 className="text-[19px] leading-normal font-semibold text-[#022778] mb-[18px]">
                {category.name}
              </h3>

              {/* Demand Badge - Positioned to top right */}
              <div className="absolute top-[26px] right-[23px] bg-[#2aae7a] rounded-[60px] px-[9px] py-[2px]">
                <p className="text-[11px] leading-normal font-medium text-white whitespace-nowrap">
                  {category.demand}
                </p>
              </div>

              {/* Description Text */}
              <p className="text-[11px] leading-normal font-medium text-[#727272]">
                <span className="inline">{category.subtitle}</span>{" "}
                <span className="inline">{category.description}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
