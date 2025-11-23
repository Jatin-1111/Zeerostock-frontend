export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-600 mb-2">
            Success Stories
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Buyers
          </h2>
          <p className="text-xl text-gray-600">
            See how procurement teams are achieving significant cost savings
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              &quot;Zeerostock has transformed our procurement process. The AI
              matching is incredible.&quot;
            </p>
            <div className="border-t-2 border-gray-300 pt-4">
              <p className="font-bold text-gray-900 text-lg">
                $3.2M annual savings
              </p>
              <p className="text-sm text-gray-900 font-medium mt-2">
                Automotive Supplier
              </p>
              <p className="text-sm text-gray-600">California, USA</p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              &quot;Finally, a reliable platform for sourcing quality OEM
              surplus parts. The platform is a game changer.&quot;
            </p>
            <div className="border-t-2 border-gray-300 pt-4">
              <p className="font-bold text-gray-900 text-lg">
                $890K annual savings
              </p>
              <p className="text-sm text-gray-900 font-medium mt-2">
                Electronics Manufacturer
              </p>
              <p className="text-sm text-gray-600">Singapore</p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              &quot;The verification process gives us complete peace of mind.
              We&apos;ve reduced our procurement time significantly.&quot;
            </p>
            <div className="border-t-2 border-gray-300 pt-4">
              <p className="font-bold text-gray-900 text-lg">
                $2.1M cost reduction
              </p>
              <p className="text-sm text-gray-900 font-medium mt-2">
                Aerospace Supplier
              </p>
              <p className="text-sm text-gray-600">Texas, USA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
