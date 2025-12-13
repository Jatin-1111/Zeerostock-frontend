export default function CTASection() {
  return (
    <section className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="border border-gray-300 rounded-lg p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-700"
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

          <h2 className="text-[32px] font-bold text-gray-900 mb-3 font-['Poppins']">
            Ready to Start Earning?
          </h2>
          <p className="text-[15px] text-gray-600 mb-8 max-w-[600px] mx-auto font-['Poppins']">
            Join Zeerostock as an independent agent partner and build a
            sustainable income stream where everyone wins. Our platform.
          </p>

          <button className="px-8 py-3 bg-gray-900 text-white text-[15px] font-semibold rounded-lg hover:bg-gray-800 transition-colors font-['Poppins']">
            Submit Application
          </button>

          <p className="text-[13px] text-gray-500 mt-6 font-['Poppins']">
            You will receive confirmation of receiving your application by
            sending process
          </p>
        </div>
      </div>
    </section>
  );
}
