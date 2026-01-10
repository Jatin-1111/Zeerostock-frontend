export default function InfoSection() {
  return (
    <section>
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[39px] mb-[30px]">
          {/* For Buyers */}
          <div className="bg-white rounded-[10px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] p-[15px] h-[183px]">
            <div className="flex items-center gap-[7px] mb-[7px]">
              <svg
                className="w-[15px] h-[15px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                  stroke="#2AAE7A"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                  stroke="#2AAE7A"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                  stroke="#2AAE7A"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8H21"
                  stroke="#2AAE7A"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-[11px] font-semibold text-[#0d1b2a]">
                For Buyers
              </h3>
            </div>
            <p className="text-[9px] font-medium text-[#9c9c9c] mb-[15px]">
              Our buyer calculator helps you evaluate the profitability of
              purchasing surplus inventory by considering:
            </p>
            <ul className="space-y-[5px]">
              <li className="flex items-start gap-[8px]">
                <svg
                  className="w-[13px] h-[13px] mt-[1px] flex-shrink-0"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 13L11.5 16L17.5 10"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#0d1b2a]">
                  Purchase price and expected retail value
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <svg
                  className="w-[13px] h-[13px] mt-[1px] flex-shrink-0"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 13L11.5 16L17.5 10"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#0d1b2a]">
                  Shipping and processing costs
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <svg
                  className="w-[13px] h-[13px] mt-[1px] flex-shrink-0"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 13L11.5 16L17.5 10"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#0d1b2a]">
                  Volume discounts and break-even analysis
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <svg
                  className="w-[13px] h-[13px] mt-[1px] flex-shrink-0"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 13L11.5 16L17.5 10"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#0d1b2a]">
                  ROI percentage and profit margins
                </span>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="bg-white rounded-[10px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] p-[15px] h-[183px]">
            <div className="flex items-center gap-[7px] mb-[7px]">
              <span className="text-[18px] font-normal text-[#2aae7a]">₹</span>
              <h3 className="text-[11px] font-semibold text-[#0d1b2a]">
                For Sellers
              </h3>
            </div>
            <p className="text-[9px] font-medium text-[#9c9c9c] mb-[15px]">
              Our seller calculator shows the financial benefits of liquidating
              excess inventory through:
            </p>
            <ul className="space-y-[5px]">
              <li className="flex items-start gap-[8px]">
                <svg
                  className="w-[13px] h-[13px] mt-[1px] flex-shrink-0"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 13L11.5 16L17.5 10"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#0d1b2a]">
                  Holding cost savings from faster liquidation
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <svg
                  className="w-[13px] h-[13px] mt-[1px] flex-shrink-0"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 13L11.5 16L17.5 10"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#0d1b2a]">
                  Marketplace fees and commission structure
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <svg
                  className="w-[13px] h-[13px] mt-[1px] flex-shrink-0"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 13L11.5 16L17.5 10"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#0d1b2a]">
                  Time-to-sell optimization benefits
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <svg
                  className="w-[13px] h-[13px] mt-[1px] flex-shrink-0"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 13L11.5 16L17.5 10"
                    stroke="#2AAE7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#0d1b2a]">
                  Net proceeds and cash flow improvement
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-[#c0daff] rounded-[10px] p-[20px] h-[105px]">
          <h4 className="text-[11px] font-semibold text-[#085396] mb-[8px]">
            Important Note
          </h4>
          <p className="text-[9px] font-normal text-[#085396] leading-[15px]">
            These calculations are estimates based on the inputs provided and
            industry averages. Actual results may vary depending on market
            conditions, product specifics, and execution. Always conduct your
            own due diligence before making investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
