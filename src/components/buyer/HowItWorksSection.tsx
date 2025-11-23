export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Post Your Requirements",
      description: "Tell us what you need",
      highlight: "Our AI optimizes your request to attract the best suppliers",
    },
    {
      number: "2",
      title: "Get Matched with Suppliers",
      description: "Receive competitive quotes",
      highlight: "View supplier profiles, ratings, and preliminary quotes",
    },
    {
      number: "3",
      title: "Compare & Negotiate",
      description: "Review detailed quotes",
      highlight:
        "Access supplier verification documents and quality certificates",
    },
    {
      number: "4",
      title: "Complete Purchase",
      description: "Finalize your order",
      highlight: "Track shipments and confirm delivery before payment release",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works for Buyers
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Simple, secure, and efficient procurement in four easy steps
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className="shrink-0">
                <div className="w-16 h-16 border-2 border-gray-900 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-2">{step.description}</p>
                <p className="text-gray-900 font-medium">{step.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
