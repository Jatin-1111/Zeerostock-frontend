export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Apply & Get Approved",
      description:
        "Submit your application and complete our quick verification process",
    },
    {
      number: 2,
      title: "Access Training",
      description:
        "Get trained on the platform, tools, and best practices for supplier onboarding",
    },
    {
      number: 3,
      title: "Find Suppliers",
      description:
        "Use your network and our lead generation tools to identify potential suppliers",
    },
    {
      number: 4,
      title: "Onboard & Earn",
      description:
        "Help suppliers list their stock and earn ongoing commissions from their sales",
    },
  ];

  return (
    <section className="bg-white py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-[34.67px] font-medium leading-tight sm:leading-normal text-[#0d1b2a] mb-2 sm:mb-2.5">
            How the Agent <span className="text-[#2ec096]">Program Works</span>
          </h2>
          <p className="text-sm sm:text-base md:text-[16px] font-semibold leading-normal text-[#9c9c9c] px-4 sm:px-0">
            Simple 4-step process to start earning commissions
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-6 sm:mt-8 md:mt-[35.33px]">
          {/* Horizontal line separator */}
          <div className="hidden lg:block absolute top-[20.67px] left-[31.5px] right-[31.5px] h-[1.33px] bg-[#2aae7a]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 lg:gap-[74px] relative">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                {/* Step Number Circle */}
                <div className="bg-[#eeffef] border-[1.33px] border-[#2aae7a] rounded-full w-10 h-10 sm:w-11 sm:h-11 md:w-[42px] md:h-[41.33px] flex items-center justify-center py-1.5 sm:py-2 md:py-[6.67px] mb-4 sm:mb-5 md:mb-[20px] relative z-10">
                  <span className="text-lg sm:text-xl md:text-[20px] font-semibold text-black">
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-sm sm:text-base md:text-[13.33px] font-medium text-[#0d1b2a] mb-2 sm:mb-3 md:mb-[10.67px]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[10px] font-medium leading-normal text-[#9c9c9c]">
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
