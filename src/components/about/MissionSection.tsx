export default function MissionSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">Our Mission</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-6 max-w-4xl">
          Building a Sustainable Future Through Smart Commerce
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Every year, billions of dollars in surplus inventory goes to waste. We
          believe there&apos;s a better way. By connecting suppliers, buyers
          through intelligent matching and transparent pricing.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">$2.4B+</div>
            <p className="text-sm text-gray-600">Total Transaction Volume</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
            <p className="text-sm text-gray-600">Active Businesses</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
            <p className="text-sm text-gray-600">Customer Satisfaction</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
            <p className="text-sm text-gray-600">Countries Served</p>
          </div>
        </div>
      </div>
    </section>
  );
}
