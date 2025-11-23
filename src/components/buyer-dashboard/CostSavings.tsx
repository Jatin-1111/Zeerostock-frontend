"use client";

export default function CostSavings() {
  const savings = [
    { category: "Electronics", percentage: "-15%" },
    { category: "Automotive", percentage: "-15%" },
    { category: "Medical", percentage: "-15%" },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 rounded p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Cost Savings</h2>

      <div className="text-center mb-8">
        <p className="text-5xl font-bold text-gray-900 mb-2">-23%</p>
        <p className="text-sm text-gray-600">Avg. Cost Reduction</p>
      </div>

      <div className="space-y-4">
        {savings.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
          >
            <span className="text-gray-900 font-medium">{item.category}</span>
            <span className="text-gray-900 font-bold">{item.percentage}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t-2 border-gray-900">
        <p className="text-xs text-gray-600 text-center">
          Sponsor ads showcase
        </p>
      </div>
    </div>
  );
}
