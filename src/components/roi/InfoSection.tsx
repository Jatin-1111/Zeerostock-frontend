export default function InfoSection() {
  return (
    <section className="bg-white">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[59px] mb-[45px]">
          {/* For Buyers */}
          <div className="bg-white rounded-[15px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] p-[23px] h-[275px]">
            <div className="flex items-center gap-[11px] mb-[10px]">
              <svg
                className="w-[23px] h-[23px]"
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
              <h3
                className="text-[17px] font-semibold text-[#0d1b2a]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                For Buyers
              </h3>
            </div>
            <p
              className="text-[14px] font-medium text-[#9c9c9c] mb-[23px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Our buyer calculator helps you evaluate the profitability of
              purchasing surplus inventory by considering:
            </p>
            <ul className="space-y-[8px]">
              <li className="flex items-start gap-[12px]">
                <svg
                  className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
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
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Purchase price and expected retail value
                </span>
              </li>
              <li className="flex items-start gap-[12px]">
                <svg
                  className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
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
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Shipping and processing costs
                </span>
              </li>
              <li className="flex items-start gap-[12px]">
                <svg
                  className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
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
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Volume discounts and break-even analysis
                </span>
              </li>
              <li className="flex items-start gap-[12px]">
                <svg
                  className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
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
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  ROI percentage and profit margins
                </span>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="bg-white rounded-[15px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] p-[23px] h-[275px]">
            <div className="flex items-center gap-[11px] mb-[10px]">
              <span
                className="text-[27px] font-normal text-[#2aae7a]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                ₹
              </span>
              <h3
                className="text-[17px] font-semibold text-[#0d1b2a]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                For Sellers
              </h3>
            </div>
            <p
              className="text-[14px] font-medium text-[#9c9c9c] mb-[23px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Our seller calculator shows the financial benefits of liquidating
              excess inventory through:
            </p>
            <ul className="space-y-[8px]">
              <li className="flex items-start gap-[12px]">
                <svg
                  className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
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
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Holding cost savings from faster liquidation
                </span>
              </li>
              <li className="flex items-start gap-[12px]">
                <svg
                  className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
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
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Marketplace fees and commission structure
                </span>
              </li>
              <li className="flex items-start gap-[12px]">
                <svg
                  className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
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
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Time-to-sell optimization benefits
                </span>
              </li>
              <li className="flex items-start gap-[12px]">
                <svg
                  className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
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
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Net proceeds and cash flow improvement
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-[#c0daff] rounded-[15px] p-[30px] h-[158px]">
          <h4
            className="text-[17px] font-semibold text-[#085396] mb-[12px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Important Note
          </h4>
          <p
            className="text-[14px] font-normal text-[#085396] leading-[23px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
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
