export default function CategorySection() {
  const categories = [
    { name: "All Categories", icon: "🏢" },
    { name: "Construction", icon: "🏗️" },
    { name: "Apparels", icon: "👔" },
    { name: "IT Hardware", icon: "💻" },
    { name: "FMCG", icon: "🛒" },
    { name: "Auto Parts", icon: "🚗" },
    { name: "Chemicals", icon: "🧪" },
    { name: "Machinery", icon: "⚙️" },
    { name: "All Categories", icon: "➕" },
  ];

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-3 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-xs text-center text-gray-700">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
