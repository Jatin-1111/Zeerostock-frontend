export default function CommissionSection() {
  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <p className="text-[13px] text-gray-600 mb-2 uppercase tracking-wide">
            COMPENSATION
          </p>
          <h2 className="text-[36px] font-bold text-gray-900 mb-3">
            Transparent Commission Structure
          </h2>
          <p className="text-[15px] text-gray-600 max-w-[700px] mx-auto">
            Earn from leading suppliers through our tiered pay model with no
            hassle or account fees from suppliers
          </p>
        </div>

        {/* Commission Tiers */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* Starter Agent */}
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-8 text-center">
            <p className="text-[14px] text-gray-700 mb-2">
              Starter Agent
            </p>
            <div className="text-[48px] font-bold text-gray-900 mb-2">
              3%
            </div>
            <p className="text-[13px] text-gray-600">
              Commission Rate
            </p>
          </div>

          {/* Growth Agent */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center">
            <p className="text-[14px] text-gray-700 mb-2">
              Growth Agent
            </p>
            <div className="text-[48px] font-bold text-gray-900 mb-2">
              4%
            </div>
            <p className="text-[13px] text-gray-600">
              Commission Rate
            </p>
          </div>

          {/* Elite Agent */}
          <div className="bg-green-100 border border-green-200 rounded-lg p-8 text-center">
            <p className="text-[14px] text-gray-700 mb-2">
              Elite Agent
            </p>
            <div className="text-[48px] font-bold text-gray-900 mb-2">
              5%
            </div>
            <p className="text-[13px] text-gray-600">
              Commission Rate
            </p>
          </div>
        </div>

        {/* Earnings Examples */}
        <div className="bg-white border border-gray-300 rounded-lg p-8">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-6 text-center">
            Example Income Earnings
          </h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-[28px] font-bold text-gray-900 mb-1">
                $2,500+
              </div>
              <p className="text-[13px] text-gray-600 mb-1">
                If deal size 50K+
              </p>
              <p className="text-[12px] text-gray-500">
                If you close 50K per order
              </p>
            </div>

            <div className="text-center">
              <div className="text-[28px] font-bold text-gray-900 mb-1">
                $8,000+
              </div>
              <p className="text-[13px] text-gray-600 mb-1">
                If you close $200K per order
              </p>
              <p className="text-[12px] text-gray-500">
                If you close 200K per order
              </p>
            </div>

            <div className="text-center">
              <div className="text-[28px] font-bold text-gray-900 mb-1">
                $20,000+
              </div>
              <p className="text-[13px] text-gray-600 mb-1">
                If you close $500K per order
              </p>
              <p className="text-[12px] text-gray-500">
                If you close 500K per order
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
