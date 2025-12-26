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
    <section className="py-10 px-2 md:py-16 md:px-8 w-full mx-auto">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight">
            How It Works for <span className="text-[#00B67A]">Buyer</span>
          </h2>
          <p className="text-base md:text-xl text-gray-500 font-semibold">
            Simple, secure and efficient procurement in four easy steps
          </p>
        </div>

        <div className="relative w-full mb-8 md:mb-12">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 hidden md:block" />

          {/* Numbered circles */}
          <div className="relative grid grid-cols-4 gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#EEFBF6] border-2 border-[#2AAE7A] rounded-full flex items-center justify-center text-xl md:text-3xl font-bold text-gray-900 relative z-10">
                  {step.number}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col text-center">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-4">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
