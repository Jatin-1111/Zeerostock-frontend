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
    <div className="w-full bg-[#EEFBF6] px-[40px] py-[50px]">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[57px]">
          <h2 className="text-2xl leading-snug font-medium text-[#0d1b2a] mb-[7px]">
            <span className="text-[#2ec096]">High Demand</span> Inventory
            Categories
          </h2>
          <p className="text-sm font-semibold text-[#9c9c9c]">
            Our platform has active buyers seeking these types of surplus
            inventory right now.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[59px] gap-y-[104px]">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-success-bg rounded-2xl shadow-lg p-4 pb-6 relative h-24 max-w-full overflow-visible"
            >
              {/* Category Title */}
              <h3 className="text-sm leading-normal font-semibold text-[#022778] mb-[12px]">
                {category.name}
              </h3>

              {/* Demand Badge - Positioned to top right */}
              <div className="absolute top-4 right-4 bg-secondary rounded-full px-2 py-0.5">
                <p className="text-xs leading-normal font-medium text-white whitespace-nowrap">
                  {category.demand}
                </p>
              </div>

              {/* Description Text */}
              <p className="text-xs leading-normal font-medium text-[#727272]">
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
