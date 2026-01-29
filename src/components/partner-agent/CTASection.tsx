import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-14 lg:py-16 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="border border-gray-300 rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-gray-900 mb-2 sm:mb-3">
            Ready to Start Earning?
          </h2>
          <p className="text-sm sm:text-base md:text-[15px] text-gray-600 mb-6 sm:mb-8 max-w-full sm:max-w-[600px] mx-auto px-4 sm:px-0">
            Join Zeerostock as an independent agent partner and build a
            sustainable income stream where everyone wins. Our platform.
          </p>

          <Link
            href="/contact"
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 text-white text-sm sm:text-base md:text-[15px] font-semibold rounded-lg hover:bg-gray-800 transition-colors inline-block"
          >
            Submit Application
          </Link>

          <p className="text-xs sm:text-sm md:text-[13px] text-gray-500 mt-4 sm:mt-5 md:mt-6 px-4 sm:px-0">
            You will receive confirmation of receiving your application by
            sending process
          </p>
        </div>
      </div>
    </section>
  );
}
