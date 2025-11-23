export default function IndustriesSection() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Perfect for Every Industry
          </h2>
          <p className="text-xl text-gray-600">
            No matter your industry, find the surplus inventory you need at
            unbeatable prices.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 border-2 border-gray-900 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Manufacturing
            </h3>
            <p className="text-green-600 font-bold mb-2">30-50% cost savings</p>
            <p className="text-sm text-gray-600 mb-4">
              Raw materials & components
            </p>
            <p className="text-gray-600">
              Source surplus steel, aluminum, machinery parts, and raw materials
              from verified industrial suppliers.
            </p>
          </div>
          <div className="bg-white p-6 border-2 border-gray-900 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Construction
            </h3>
            <p className="text-green-600 font-bold mb-2">
              40-60% cost reduction
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Building materials & equipment
            </p>
            <p className="text-gray-600">
              Find surplus cement, rebar/rods, heavy equipment, and construction
              materials for your projects.
            </p>
          </div>
          <div className="bg-white p-6 border-2 border-gray-900 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Healthcare</h3>
            <p className="text-green-600 font-bold mb-2">15-40% savings</p>
            <p className="text-sm text-gray-600 mb-4">
              Medical equipment & supplies
            </p>
            <p className="text-gray-600">
              Access surplus medical devices, laboratory equipment, and
              healthcare supplies from trusted suppliers.
            </p>
          </div>
          <div className="bg-white p-6 border-2 border-gray-900 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Technology</h3>
            <p className="text-green-600 font-bold mb-2">30-50% cost savings</p>
            <p className="text-sm text-gray-600 mb-4">
              IT hardware & components
            </p>
            <p className="text-gray-600">
              Source surplus servers, networking equipment, and electronic
              components for IT infrastructure projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
