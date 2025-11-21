export default function ProductDescription() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Product Description
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed">
        High-quality Grade A36 industrial steel pipes, ideal for construction,
        plumbing, and structural applications. These pipes are manufactured to
        ASTM A36 specifications and feature excellent weldability,
        machinability, and durability. Available in bulk quantities with
        verified quality certifications. Perfect for contractors, manufacturers,
        and industrial buyers looking for cost-effective surplus steel
        solutions.
      </p>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Key Features:
        </h3>
        <ul className="space-y-2">
          {[
            "ASTM A36 certified",
            "Excellent weldability",
            "High tensile strength",
            "Corrosion resistant",
            "Verified quality",
            "Bulk availability",
          ].map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-700">
              <svg
                className="w-5 h-5 text-green-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Technical Specifications
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Material Grade</span>
              <span className="font-semibold text-gray-900">ASTM A36</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Heat Treatment</span>
              <span className="font-semibold text-gray-900">6161º-6190º</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Coating</span>
              <span className="font-semibold text-gray-900">Hot Indian</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Diameter Range</span>
              <span className="font-semibold text-gray-900">
                2&quot; - 12&quot;
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Length</span>
              <span className="font-semibold text-gray-900">20ft standard</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Certification</span>
              <span className="font-semibold text-gray-900">
                API 5L, ASTM A36
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Shipping Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Weight</span>
              <span className="font-semibold text-gray-900">
                1.5 tonne per unit
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Dimensions</span>
              <span className="font-semibold text-gray-900">
                6.1ft × 06m × 50m
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Shipping Cost</span>
              <span className="font-semibold text-gray-900">
                Calculated at checkout
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Packaging</span>
              <span className="font-semibold text-gray-900">
                via Courier Delivery
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold text-gray-900">
                7-14 business days
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Return Policy
        </h3>
        <p className="text-gray-700 leading-relaxed">
          30-day return policy (if unused). Buyer responsible for return
          shipping costs.
        </p>
      </div>
    </div>
  );
}
