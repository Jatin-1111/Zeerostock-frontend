"use client";

// Custom SVG Components
const SecuritySafeIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.5 2.0625L3.4375 8.25V16.5C3.4375 23.925 8.8 30.8875 16.5 30.9375C24.2 30.8875 29.5625 23.925 29.5625 16.5V8.25L16.5 2.0625Z"
      stroke="#2AAE7A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.375 16.25H25.625V26.25C25.625 27.35 24.725 28.25 23.625 28.25H11.375C10.275 28.25 9.375 27.35 9.375 26.25V16.25Z"
      stroke="#2AAE7A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12.5 16.25V11.25C12.5 8.49 14.74 6.25 17.5 6.25C20.26 6.25 22.5 8.49 22.5 11.25V16.25"
      stroke="#2AAE7A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="17.5" cy="20.5" r="1.5" fill="#2AAE7A" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 2.5L4 7.5V15C4 21.075 8.4 26.55 15 27.5C21.6 26.55 26 21.075 26 15V7.5L15 2.5Z"
      stroke="#2AAE7A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M10 15L13.5 18.5L20 12"
      stroke="#2AAE7A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function SecurityProtection() {
  const securityFeatures = [
    {
      title: "256-bit SSL Encryption",
      description: "Bank-level security",
    },
    {
      title: "Escrow Protection",
      description: "Funds held securely",
    },
    {
      title: "PCI DSS Compliant",
      description: "Industry standard",
    },
    {
      title: "Fraud Detection",
      description: "24/7 monitoring",
    },
  ];

  return (
    <div className="scale-75 origin-top-left w-[133.33%]">
      <div className="bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] relative p-0 h-[524px]">
        {/* Title with Icon */}
        <div className="absolute left-[74px] top-[52px] -translate-y-1/2 flex items-center gap-[15px]">
          <SecuritySafeIcon />
          <h3 className="font-['Poppins'] font-semibold text-[26px] text-[#0D1B2A] tracking-[0.5px] leading-[24px] m-0">
            Security & Protection
          </h3>
        </div>

        {/* Info Box */}
        <div className="absolute left-[83px] right-[83px] top-[132px] bg-[#EEFFEF] border border-[#2AAE7A] rounded-[20px] py-[25px] pl-[25px] pr-[55px] flex gap-[15px] items-center">
          <div className="shrink-0">
            <LockIcon />
          </div>
          <p className="font-['Inter'] font-medium text-[20px] text-[#9C9C9C] leading-normal m-0 flex-1">
            All payment information is encrypted and stored securely. Zeerostock
            uses industry-standard PCI DSS compliance to protect your financial
            data.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="absolute left-[39px] right-[39px] top-[299px] grid grid-cols-2 grid-rows-[repeat(2,75px)] gap-[30px]">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex gap-[12px] items-start">
              <div className="shrink-0 w-[51px] h-[40px] flex items-center justify-center p-[10px]">
                <ShieldCheckIcon />
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className="font-['Poppins'] font-medium text-[30px] text-[#0D1B2A] tracking-[0.5px] leading-[24px] m-0">
                  {feature.title}
                </p>
                <p className="font-['Inter'] font-medium text-[20px] text-[#9C9C9C] leading-[28px] m-0">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
