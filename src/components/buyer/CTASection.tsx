import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Procurement?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of smart buyers who are reducing costs and improving
          efficiency with Zeerostock. Start sourcing surplus inventory today!
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Start Sourcing
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
