export default function ValuesSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Our Values</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Drives Us Forward
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Our core values guide every decision we make and every relationship we
          build
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 border-2 border-gray-900 rounded-lg">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Cost & Transparency
            </h3>
            <p className="text-gray-600 text-sm">
              Every transaction is executed with complete transparency and
              accountability
            </p>
          </div>
          <div className="bg-white p-6 border-2 border-gray-900 rounded-lg">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Innovation First
            </h3>
            <p className="text-gray-600 text-sm">
              We harness AI and data to drive continuous improvement and deliver
              value
            </p>
          </div>
          <div className="bg-white p-6 border-2 border-gray-900 rounded-lg">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Sustainability
            </h3>
            <p className="text-gray-600 text-sm">
              Reducing waste and promoting circular economy practices in every
              transaction
            </p>
          </div>
          <div className="bg-white p-6 border-2 border-gray-900 rounded-lg">
            <svg
              className="w-8 h-8 text-gray-900 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Global Reach
            </h3>
            <p className="text-gray-600 text-sm">
              Connecting suppliers and buyers across borders to create a truly
              global marketplace
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
