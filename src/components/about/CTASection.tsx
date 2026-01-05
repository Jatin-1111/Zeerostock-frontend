import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full bg-[#EEFBF6] py-6 px-10 sm:px-6 lg:px-16">
      <div className="w-full max-w-full mx-auto">
        <div className="bg-[#39ac7a] rounded-[22.5px] overflow-hidden relative px-6 py-[45px]">
          {/* Content Container */}
          <div className="flex flex-col gap-[15px] items-center text-center mx-auto max-w-[1000px]">
            <h2 className="font-worksans font-medium text-[33.75px] leading-normal text-white w-full">
              Ready to Join Our Story?
            </h2>
            <p className="font-semibold text-[17.25px] leading-normal text-[#374151] w-full">
              Whether you&apos;re a business looking to optimize your surplus
              inventory or a professional wanting to make an impact, we&apos;d
              love to have you as part of our journey.
            </p>
          </div>

          {/* Buttons Container */}
          <div className="flex items-end justify-center gap-[67.5px] mt-[70px]">
            <Link
              href="/marketplace"
              className="bg-[#1e3a8a] rounded-[9px] py-[11.25px] h-[45px] flex items-center justify-center w-[217.5px]"
            >
              <span className="font-montserrat font-medium text-[16.5px] leading-normal text-white">
                Explore Opportunities
              </span>
            </Link>
            <Link
              href="/careers"
              className="bg-white rounded-[9px] py-[11.25px] h-[45px] flex items-center justify-center w-[217.5px]"
            >
              <span className="font-montserrat font-medium text-[16.5px] leading-[16.5px] text-[#2aae7a]">
                View Open Positions
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
