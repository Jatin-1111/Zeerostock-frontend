export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Post your requirements",
      description:
        "Create detailed RFQs with specifications, quantities, budget, and timeline. Our AI optimizes your request to attract the best suppliers.",
    },
    {
      number: "2",
      title: "Get Matched with Suppliers",
      description:
        "Receive instant matches from verified suppliers who have exactly what you need. View supplier profiles, ratings, and preliminary quotes.",
    },
    {
      number: "3",
      title: "Compare & Negotiate",
      description:
        "Review detailed quotes, compare options, and negotiate through our secure platform. Access supplier verification documents and quality certificates.",
    },
    {
      number: "4",
      title: "Complete Purchase",
      description:
        "Finalize your order with escrow protection and integrated logistics support. Track shipments and confirm delivery before payment release.",
    },
  ];

  return (
    <section className="py-[27px] px-[5px] md:py-[43px] md:px-[21px] mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="text-center mb-[21px] md:mb-[32px]">
          <h2 className="text-[16px] md:text-[27px] font-bold text-gray-900 mb-[5px] md:mb-[11px] leading-tight">
            How It Works for <span className="text-[#00B67A]">Buyer</span>
          </h2>
          <p className="text-[11px] md:text-[13px] text-gray-500 font-semibold">
            Simple, secure and efficient procurement in four easy steps
          </p>
        </div>

        <div className="relative w-full mb-[21px] md:mb-[32px]">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 hidden md:block" />

          {/* Numbered circles */}
          <div className="relative grid grid-cols-4 gap-[11px] md:gap-[21px]">
            {steps.map((step, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-[32px] h-[32px] md:w-[43px] md:h-[43px] bg-[#EEFBF6] border-2 border-[#2AAE7A] rounded-full flex items-center justify-center text-[13px] md:text-[20px] font-bold text-gray-900 relative z-10">
                  {step.number}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[21px]">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col text-center">
              <h3 className="text-[11px] md:text-[12px] font-bold text-gray-900 mb-[5px] md:mb-[11px]">
                {step.title}
              </h3>
              <p className="text-[8px] md:text-[9px] text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
