export default function InfoSection() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Understanding ROI Calculations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* For Buyers */}
          <div className="p-6 border-2 border-gray-900 rounded">
            <h3 className="text-xl font-bold text-gray-900 mb-4">For Buyers</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our ROI calculator helps buyers understand their potential savings
              and returns when purchasing through Zeerostock.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span className="text-sm">
                  Purchase price and expected retail value
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span className="text-sm">
                  Logistics and procurement cost savings
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span className="text-sm">
                  Volume discounts and bulk order benefits
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span className="text-sm">
                  Platform fees and transaction costs
                </span>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="p-6 border-2 border-gray-900 rounded">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              For Sellers
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Sellers can evaluate their returns by comparing current holding
              costs to expected proceeds from listing on Zeerostock.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span className="text-sm">
                  Current inventory value and storage costs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span className="text-sm">
                  Expected sale price from marketplace
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span className="text-sm">
                  Time-to-sale and cash conversion benefits
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span className="text-sm">
                  Platform fees and service charges
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-yellow-50 border-2 border-yellow-400 rounded">
          <p className="text-sm text-gray-900">
            <strong>Important Note:</strong> These calculations are estimates
            based on the inputs provided and industry averages. Actual results
            may vary depending on product condition, market demand, shipping
            costs, and other factors. Please contact our sales team for detailed
            ROI analysis tailored to your specific needs.
          </p>
        </div>
      </div>
    </section>
  );
}
