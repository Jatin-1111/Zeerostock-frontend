import Link from "next/link";

export default function MarketplaceCTASection() {
  return (
    <div className="max-w-[900px] mx-auto py-9 px-3">
      <div className="grid grid-cols-2 gap-[18px]">
        {/* Become a Supplier */}
        <div className="bg-[#f0fdf4] border-2 border-[#10b981] rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="font-medium text-xl text-[#1a1a1a] mb-2 text-center">
            Become a Supplier
          </h3>
          <p className="text-xs text-gray-600 text-center mb-[18px] max-w-sm">
            List your surplus inventory and reach thousands of buyers worldwide
          </p>
          <Link
            href="/become-supplier"
            className="bg-[#2D4A9A] hover:bg-[#3d5aaa] rounded-xl px-9 py-2 border-none cursor-pointer font-semibold text-sm text-white transition-colors inline-block"
          >
            Start Selling
          </Link>
        </div>

        {/* Can't find what you need */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="font-medium text-xl text-[#1a1a1a] mb-2 text-center">
            Can't Find What You Need
          </h3>
          <p className="text-xs text-gray-600 text-center mb-[18px] max-w-sm">
            Post a buying request and let our suppliers find it for you
          </p>
          <Link
            href="/buyer/rfq/post"
            className="bg-[#2D4A9A] hover:bg-[#3d5aaa] rounded-xl px-9 py-2 border-none cursor-pointer font-semibold text-sm text-white transition-colors inline-block"
          >
            Post Request
          </Link>
        </div>
      </div>
    </div>
  );
}
