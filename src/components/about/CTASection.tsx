import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full bg-[#EEFBF6] py-3 sm:py-4 md:py-[16px] px-4 sm:px-6 md:px-[27px] lg:px-[43px]">
      <div className="w-full max-w-full mx-auto">
        <div className="bg-[#39ac7a] rounded-xl sm:rounded-2xl md:rounded-[15px] overflow-hidden relative px-4 sm:px-5 md:px-[16px] py-6 sm:py-7 md:py-[30px]">
          {/* Content Container */}
          <div className="flex flex-col gap-2.5 items-center text-center mx-auto max-w-full sm:max-w-xl md:max-w-2xl">
            <h2 className="font-worksans font-medium text-xl sm:text-2xl md:text-2xl leading-normal text-white w-full px-4 sm:px-0">
              Ready to Join Our Story?
            </h2>
            <p className="font-semibold text-xs sm:text-sm md:text-xs leading-normal text-[#374151] w-full px-4 sm:px-0">
              Whether you&apos;re a business looking to optimize your surplus
              inventory or a professional wanting to make an impact, we&apos;d
              love to have you as part of our journey.
            </p>
          </div>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mt-6 sm:mt-8 md:mt-12">
            <Link
              href="/marketplace"
              className="bg-primary rounded-md sm:rounded-lg py-2 h-auto sm:h-8 flex items-center justify-center w-44 md:w-36"
            >
              <span className="font-montserrat font-medium text-xs sm:text-sm md:text-xs leading-normal text-white">
                Explore Opportunities
              </span>
            </Link>
            <Link
              href="/careers"
              className="bg-white rounded-md sm:rounded-lg py-2 h-auto sm:h-8 flex items-center justify-center w-44 md:w-36"
            >
              <span className="font-montserrat font-medium text-xs sm:text-sm md:text-xs leading-tight text-[#2aae7a]">
                View Open Positions
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
