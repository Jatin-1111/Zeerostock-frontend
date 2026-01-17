import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-[27px] md:py-[43px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto">
      <div className="w-full max-w-[1080px] mx-auto">
        <div className="bg-[#00B67A] rounded-[20px] px-[16px] py-[27px] md:px-[32px] md:py-[43px] text-center">
          <h2 className="text-[16px] md:text-[27px] font-bold text-white mb-[11px] md:mb-[16px] leading-tight">
            Ready to Transform Your Procurement?
          </h2>
          <p className="text-[11px] md:text-[13px] text-gray-700 font-semibold mb-[16px] md:mb-[21px] max-w-4xl mx-auto">
            Join thousands of smart buyers who are reducing costs and improving
            efficiency with Zeerostock. Start sourcing surplus inventory today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[11px] md:gap-[21px] mb-[16px] md:mb-[21px]">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-[21px] md:px-[32px] py-[8px] md:py-[11px] bg-[#1E3A8A] text-white rounded-xl text-[11px] md:text-[13px] font-medium hover:bg-[#1e40af] transition-colors"
            >
              Create Buyer Account
            </Link>
            <Link
              href="/helpdesk"
              className="w-full sm:w-auto px-[21px] md:px-[32px] py-[8px] md:py-[11px] bg-white text-[#00B67A] rounded-xl text-[11px] md:text-[13px] font-medium hover:bg-gray-50 transition-colors"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="text-[9px] md:text-[12px] text-white font-medium">
            • No startup fees • Free to join • Start sourcing immediately
          </p>
        </div>
      </div>
    </section>
  );
}
