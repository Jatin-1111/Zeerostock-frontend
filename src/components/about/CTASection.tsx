import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full bg-[#EEFBF6] py-[16px] px-[27px] sm:px-6 lg:px-[43px]">
      <div className="w-full max-w-full mx-auto">
        <div className="bg-[#39ac7a] rounded-[15px] overflow-hidden relative px-[16px] py-[30px]">
          {/* Content Container */}
          <div className="flex flex-col gap-[10px] items-center text-center mx-auto max-w-[667px]">
            <h2 className="font-worksans font-medium text-[22.5px] leading-normal text-white w-full">
              Ready to Join Our Story?
            </h2>
            <p className="font-semibold text-[11.5px] leading-normal text-[#374151] w-full">
              Whether you&apos;re a business looking to optimize your surplus
              inventory or a professional wanting to make an impact, we&apos;d
              love to have you as part of our journey.
            </p>
          </div>

          {/* Buttons Container */}
          <div className="flex items-end justify-center gap-[45px] mt-[47px]">
            <Link
              href="/marketplace"
              className="bg-[#1e3a8a] rounded-[6px] py-[7.5px] h-[30px] flex items-center justify-center w-[145px]"
            >
              <span className="font-montserrat font-medium text-[11px] leading-normal text-white">
                Explore Opportunities
              </span>
            </Link>
            <Link
              href="/careers"
              className="bg-white rounded-[6px] py-[7.5px] h-[30px] flex items-center justify-center w-[145px]"
            >
              <span className="font-montserrat font-medium text-[11px] leading-[11px] text-[#2aae7a]">
                View Open Positions
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
