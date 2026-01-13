import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-[27px] px-[5px] md:py-[43px] md:px-[21px] mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="bg-[#00B67A] rounded-[20px] px-[16px] py-[27px] md:px-[32px] md:py-[43px] text-center">
          <h2 className="text-lg md:text-2xl font-bold text-white mb-[11px] md:mb-[16px] leading-tight">
            Ready to Transform Your Procurement?
          </h2>
          <p className="text-xs md:text-sm text-gray-700 font-semibold mb-[16px] md:mb-[21px] max-w-4xl mx-auto">
            Join thousands of smart buyers who are reducing costs and improving
            efficiency with Zeerostock. Start sourcing surplus inventory today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[11px] md:gap-[21px] mb-[16px] md:mb-[21px]">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-[21px] md:px-[32px] py-[8px] md:py-[11px] bg-[#1E3A8A] text-white rounded-xl text-xs md:text-sm font-medium hover:bg-[#1e40af] transition-colors"
            >
              Create Buyer Account
            </Link>
            <Link
              href="/helpdesk"
              className="w-full sm:w-auto px-[21px] md:px-[32px] py-[8px] md:py-[11px] bg-white text-[#00B67A] rounded-xl text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="text-xs md:text-sm text-white font-medium">
            • No startup fees • Free to join • Start sourcing immediately
          </p>
        </div>
      </div>
    </section>
  );
}
