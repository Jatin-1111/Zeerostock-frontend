"use client";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "List Your Inventory",
      description:
        "Upload detailed listings with photos, specifications, and condition reports. Our AI suggests optimal pricing and categorization",
    },
    {
      number: 2,
      title: "Get Discovered",
      description:
        "Automatic promotion to relevant buyers through AI matching and search optimization. Track views, inquiries, and buyer interest in real-time",
    },
    {
      number: 3,
      title: "Negotiate & Close",
      description:
        "Communicate with Zeerostock team through secure messaging and finalize terms. Access buyer verification reports and credit information",
    },
    {
      number: 4,
      title: "Get Paid",
      description:
        "Secure payment processing with fast payouts after delivery confirmation. Multiple payout options with detailed transaction reporting",
    },
  ];

  return (
    <div className="w-full bg-[#EEFBF6] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-[50px]">
      <div className="max-w-[1080px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[61px]">
          <h2 className="text-[26px] leading-[39px] font-medium text-[#0d1b2a] mb-[7px]">
            How <span className="text-[#2ec096]">Selling Works</span>
          </h2>
          <p className="text-[12px] font-semibold text-[#9c9c9c]">
            Simple, efficient process to convert surplus inventory into revenue
          </p>
        </div>

        <div className="relative">
          {/* Horizontal Line (Desktop) */}
          <div className="hidden md:block absolute top-[15px] left-0 right-0 h-[2px] bg-[#d1d1d1]" />
          {/* Horizontal Line (Desktop) */}
          <div className="hidden md:block absolute top-[15px] left-0 right-0 h-[2px] bg-[#d1d1d1]" />

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-[30px]">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-0 after:content-[''] after:absolute after:left-[14.5px] after:top-[15px] after:h-[calc(100%+32px)] after:w-[2px] after:bg-[#d1d1d1] after:md:hidden after:-z-0 last:after:hidden"
              >
                {/* Number Circle */}
                <div className="w-[31px] h-[31px] bg-[#eeffef] border-2 border-[#2aae7a] rounded-[50px] flex items-center justify-center font-semibold text-base text-black md:mb-[41px] shrink-0 relative z-10">
                  {step.number}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[16px] md:text-[10px] leading-normal font-bold md:font-medium text-[#2ec096] md:text-[#0d1b2a] mb-1 md:mb-[8px]">
                    {step.title}
                  </h3>
                  <p className="text-[13px] md:text-[7px] leading-normal text-[#585858] md:text-[#9c9c9c]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
