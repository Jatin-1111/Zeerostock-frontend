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
    <div className="w-full bg-[#EEFBF6] px-[60px] py-[75px]">
      <div className="max-w-[1320px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[91px]">
          <h2 className="text-[39px] leading-[59px] font-medium text-[#0d1b2a] mb-[11px]">
            How <span className="text-[#2ec096]">Selling Works</span>
          </h2>
          <p className="text-[18px] font-semibold text-[#9c9c9c]">
            Simple, efficient process to convert surplus inventory into revenue
          </p>
        </div>

        {/* Steps Grid with Line */}
        <div className="relative">
          {/* Horizontal Line positioned absolutely above circles */}
          <div className="absolute top-[23px] left-0 right-0 h-[3px] bg-[#d1d1d1]" />

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[45px]">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                {/* Number Circle */}
                <div className="w-[47px] h-[47px] bg-[#eeffef] border-2 border-[#2aae7a] rounded-[75px] flex items-center justify-center font-semibold text-[23px] text-black mb-[62px] relative z-10">
                  {step.number}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[15px] leading-normal font-medium text-[#0d1b2a] mb-[12px]">
                    {step.title}
                  </h3>
                  <p className="text-[11px] leading-normal text-[#9c9c9c]">
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
