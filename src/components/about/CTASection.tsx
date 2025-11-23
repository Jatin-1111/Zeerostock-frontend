import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Join Our Story?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Whether you&apos;re a business looking to optimize your surplus
          inventory or a professional wanting to make an impact, we&apos;d love
          to have you as part of our journey.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/marketplace"
            className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Explore Opportunities
          </Link>
          <Link
            href="/careers"
            className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Open Positions
          </Link>
        </div>
      </div>
    </section>
  );
}
