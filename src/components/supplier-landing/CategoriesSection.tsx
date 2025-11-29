"use client";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Manufacturing Equipment",
      demand: "High demand",
      demandColor: "text-green-600",
      subtitle: "CNC machines, industrial robots, production lines",
      description:
        "Heavy machinery and production equipment from factory closures or upgrades.",
    },
    {
      name: "Raw Materials",
      demand: "Very high demand",
      demandColor: "text-green-600",
      subtitle: "Steel, aluminum, chemicals, textiles",
      description:
        "Excess raw materials from overstock, cancelled orders, or production changes.",
    },
    {
      name: "Electronics & IT",
      demand: "Extremely high demand",
      demandColor: "text-green-600",
      subtitle: "Servers, networking equipment, components",
      description:
        "Technology hardware from data center upgrades and corporate refreshes.",
    },
    {
      name: "Construction Materials",
      demand: "High demand",
      demandColor: "text-green-600",
      subtitle: "Lumber, concrete, steel beams, equipment",
      description:
        "Building materials from project cancellations or surplus orders.",
    },
  ];

  return (
    <div className="bg-white p-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        High-Demand Inventory Categories
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Our platform has active buyers seeking these types of surplus inventory
        right now.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">
                {category.name}
              </h3>
              <span className={`text-sm font-medium ${category.demandColor}`}>
                {category.demand}
              </span>
            </div>

            <p className="text-sm font-medium text-gray-900 mb-2">
              {category.subtitle}
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
