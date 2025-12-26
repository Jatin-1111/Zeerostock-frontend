import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-10 px-2 md:py-16 md:px-8 w-full mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="bg-[#00B67A] rounded-[30px] px-6 py-10 md:px-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Ready to Transform Your Procurement?
          </h2>
          <p className="text-base md:text-xl text-gray-700 font-semibold mb-6 md:mb-8 max-w-4xl mx-auto">
            Join thousands of smart buyers who are reducing costs and improving
            efficiency with Zeerostock. Start sourcing surplus inventory today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 mb-6 md:mb-8">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 md:px-12 py-3 md:py-4 bg-[#1E3A8A] text-white rounded-xl text-base md:text-xl font-medium hover:bg-[#1e40af] transition-colors"
            >
              Create Buyer Account
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 md:px-12 py-3 md:py-4 bg-white text-[#00B67A] rounded-xl text-base md:text-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="text-sm md:text-lg text-white font-medium">
            • No startup fees • Free to join • Start sourcing immediately
          </p>
        </div>
      </div>
    </section>
  );
}
