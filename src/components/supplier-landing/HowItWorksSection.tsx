"use client";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "List Your Inventory",
      description:
        "Upload detailed listings with photos, specifications, and condition reports.",
      highlight: "Our AI suggests optimal pricing and categorization",
    },
    {
      number: 2,
      title: "Get Discovered",
      description:
        "Automatic promotion to relevant buyers through AI matching and search optimization.",
      highlight: "Track views, inquiries, and buyer interest in real-time",
    },
    {
      number: 3,
      title: "Negotiate & Close",
      description:
        "Communicate with Zeerostock team through secure messaging and finalize terms.",
      highlight: "Access buyer verification reports and credit information",
    },
    {
      number: 4,
      title: "Get Paid",
      description:
        "Secure payment processing with fast payouts after delivery confirmation.",
      highlight: "Multiple payout options with detailed transaction reporting",
    },
  ];

  return (
    <div className="bg-white p-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        How Selling Works
      </h2>
      <p className="text-gray-600 text-center mb-12">
        Simple, efficient process to convert surplus inventory into revenue
      </p>

      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-6 items-start">
            {/* Number Circle */}
            <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center font-bold text-xl shrink-0 text-black">
              {step.number}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{step.description}</p>
              <p className="text-sm font-medium text-gray-900">
                {step.highlight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
