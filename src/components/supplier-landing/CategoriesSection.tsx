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
    <div className="w-full bg-[#EEFBF6] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 md:py-[50px]">
      {/* Content Container */}
      <div className="max-w-[1080px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[57px]">
          <h2 className="text-[22px] md:text-[26px] leading-tight md:leading-[35px] font-medium text-[#0d1b2a] mb-[7px]">
            <span className="text-[#2ec096]">High Demand</span> Inventory
            Categories
          </h2>
          <p className="text-[11px] md:text-[12px] font-semibold text-[#9c9c9c]">
            Our platform has active buyers seeking these types of surplus
            inventory right now.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-x-[59px] md:gap-y-[60px]">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-[#eeffef] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] p-5 relative overflow-visible"
            >
              <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start mb-[12px] gap-2">
                {/* Category Title */}
                <h3 className="text-[13px] md:text-[15px] leading-normal font-semibold text-[#022778]">
                  {category.name}
                </h3>

                {/* Demand Badge */}
                <div className="bg-[#2aae7a] rounded-[40px] px-[6px] py-[1px] shrink-0">
                  <p className="text-[10px] md:text-xs leading-normal font-medium text-white whitespace-nowrap">
                    {category.demand}
                  </p>
                </div>
              </div>

              {/* Description Text */}
              <p className="text-[10px] md:text-[11px] lg:text-xs leading-normal font-medium text-[#727272]">
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
