import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transforming Global Surplus Trade
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We&apos;re on a mission to optimize waste and minimize value by
              connecting suppliers with surplus inventory to buyers around the
              world.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/marketplace"
                className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Start Marketplace
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Learn About
              </Link>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center border-2 border-gray-900">
            <span className="text-gray-400">Image/Illustration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
