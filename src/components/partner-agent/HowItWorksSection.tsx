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
    <section className="bg-white py-16">
      <div className="max-w-[960px] mx-auto px-8">
        <div className="text-center mb-10">
          <h2 className="text-[34.67px] font-medium leading-normal text-[#0d1b2a] mb-2.5">
            How the Agent <span className="text-[#2ec096]">Program Works</span>
          </h2>
          <p className="text-[16px] font-semibold leading-normal text-[#9c9c9c]">
            Simple 4-step process to start earning commissions
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-[35.33px]">
          {/* Horizontal line separator */}
          <div className="absolute top-[20.67px] left-[31.5px] right-[31.5px] h-[1.33px] bg-[#2aae7a]" />

          <div className="grid grid-cols-4 gap-[74px] relative">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                {/* Step Number Circle */}
                <div className="bg-[#eeffef] border-[1.33px] border-[#2aae7a] rounded-full w-[42px] h-[41.33px] flex items-center justify-center py-[6.67px] mb-[20px] relative z-10">
                  <span className="text-[20px] font-semibold text-black">
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-[13.33px] font-medium text-[#0d1b2a] mb-[10.67px]">
                    {step.title}
                  </h3>
                  <p className="text-[10px] font-medium leading-normal text-[#9c9c9c]">
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
