export default function CTASection() {
  return (
    <section className="w-full bg-linear-to-b from-gray-50 to-white py-20 px-6 border-t border-gray-200">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of businesses already monetizing their surplus
          inventory
          <br />
          value
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Sign Up Now
          </button>
          <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-white transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}
