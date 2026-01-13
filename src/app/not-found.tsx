import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#eefbf6] to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[180px] md:text-[220px] font-extrabold leading-none">
            <span className="bg-linear-to-r from-[#022778] to-[#2aae7a] bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-3xl font-bold text-[#0d1e23] mb-4">
          Page Not Found
        </h2>

        <p className="text-xl md:text-xl text-gray-600 mb-12 max-w-lg mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-[220px] h-[60px] bg-[#022778] text-white text-xl font-semibold rounded-xl hover:bg-[#022778]/90 transition-colors flex items-center justify-center"
          >
            Go to Home
          </Link>
          <Link
            href="/marketplace"
            className="w-full sm:w-[220px] h-[60px] bg-white border-2 border-[#2aae7a] text-[#2aae7a] text-xl font-semibold rounded-xl hover:bg-[#2aae7a]/5 transition-colors flex items-center justify-center"
          >
            Visit Marketplace
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 opacity-20">
          <svg
            className="w-32 h-32 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
