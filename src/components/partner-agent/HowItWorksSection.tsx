export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Sign & Be Approved",
      description:
        "Submit your application and get reviewed by our verification team.",
    },
    {
      number: 2,
      title: "Ready Setup",
      description:
        "Get access to the dashboard, tools, and documents to start collaborating.",
    },
    {
      number: 3,
      title: "Prospecting",
      description:
        "Generate requests, track opportunities, send out RFQs via partner support.",
    },
    {
      number: 4,
      title: "Close & Earn",
      description:
        "Help suppliers finalize deals and start earning commissions from deal value.",
    },
  ];

  return (
    <section className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold text-gray-900 mb-3 font-['Poppins']">
            How the Agent Program Works
          </h2>
          <p className="text-[15px] text-gray-600 font-['Poppins']">
            Ready. A step-by-step look at what partnering means
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <span className="text-[16px] font-bold text-gray-900 font-['Poppins']">
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-gray-900 mb-1 font-['Poppins']">
                  {step.title}
                </h3>
                <p className="text-[14px] text-gray-600 font-['Poppins']">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
