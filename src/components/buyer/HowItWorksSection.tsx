export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Post your requirements",
      description: "Tell us what you need, including quantity and specs.",
    },
    {
      number: "2",
      title: "Get matched",
      description: "Our AI finds suppliers with matching surplus inventory.",
    },
    {
      number: "3",
      title: "Compare & Negotiate",
      description: "Review offers and negotiate terms directly.",
    },
    {
      number: "4",
      title: "Complete Purchase",
      description: "Pay securely and track your shipment.",
    },
  ];

  return (
    <section className="bg-[#EEFBF6] py-[27px] md:py-[43px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1080px] mx-auto">
      <div className="w-full max-w-[500px] mx-auto">
        <div className="text-center mb-[21px] md:mb-[32px]">
          <h2 className="text-[16px] md:text-[21px] font-bold text-gray-900 mb-[5px] md:mb-[8px] leading-tight">
            How It Works for <span className="text-[#2AAE7A]">Buyer</span>
          </h2>
          <p className="text-[11px] md:text-[13px] text-gray-500 font-medium">
            Simple, secure and efficient procurement in four easy steps
          </p>
        </div>

        <div className="relative px-[20px]">
          {/* Steps Container */}
          <div className="flex flex-col gap-[20px] md:gap-[32px]">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-[16px] md:gap-[24px] relative"
              >
                {/* Connecting Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[20px] md:left-[25px] top-[40px] md:top-[50px] bottom-[-20px] md:bottom-[-32px] w-[1.5px] bg-[#0d1b2a]" />
                )}

                {/* Number Circle */}
                <div className="shrink-0 w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-[#EEFFEF] border border-[#2AAE7A] rounded-full flex items-center justify-center text-[18px] md:text-[22px] font-medium text-black z-10 shadow-sm">
                  {step.number}
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-[15px] md:text-[18px] font-bold text-[#2AAE7A] mb-[4px] md:mb-[6px]">
                    {step.title}
                  </h3>
                  <p className="text-[12px] md:text-[14px] text-gray-600 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
