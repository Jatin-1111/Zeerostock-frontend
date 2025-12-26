export default function MarketplaceCTASection() {
  return (
    <div className="max-w-[1200px] mx-auto py-12 px-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Become a Supplier */}
        <div className="bg-[#f0fdf4] border-2 border-[#10b981] rounded-2xl p-8 flex flex-col items-center justify-center">
          <h3 className="font-poppins font-medium text-2xl text-[#1a1a1a] mb-3 text-center">
            Become a Supplier
          </h3>
          <p className="font-inter text-sm text-gray-600 text-center mb-6 max-w-sm">
            List your surplus inventory and reach thousands of buyers worldwide
          </p>
          <button className="bg-[#2D4A9A] hover:bg-[#3d5aaa] rounded-xl px-12 py-3 border-none cursor-pointer font-poppins font-semibold text-base text-white transition-colors">
            Start Selling
          </button>
        </div>

        {/* Can't find what you need */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center">
          <h3 className="font-poppins font-medium text-2xl text-[#1a1a1a] mb-3 text-center">
            Can't Find What You Need
          </h3>
          <p className="font-inter text-sm text-gray-600 text-center mb-6 max-w-sm">
            Post a buying request and let our suppliers find it for you
          </p>
          <button className="bg-[#2D4A9A] hover:bg-[#3d5aaa] rounded-xl px-12 py-3 border-none cursor-pointer font-poppins font-semibold text-base text-white transition-colors">
            Post Request
          </button>
        </div>
      </div>
    </div>
  );
}
