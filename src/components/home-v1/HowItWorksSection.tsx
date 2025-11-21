export default function HowItWorksSection() {
  const buyerSteps = [
    {
      title: "Browse Listings",
      description: "Search verified surplus inventory",
    },
    {
      title: "Compare Options",
      description: "Use filters and trust scores",
    },
    {
      title: "Place Orders",
      description: "Secure transactions with escrow",
    },
    {
      title: "Track Delivery",
      description: "Real-time shipping updates",
    },
    {
      title: "Rate & Review",
      description: "Build supplier relationships",
    },
  ];

  const sellerSteps = [
    {
      title: "List Inventory",
      description: "Upload surplus stock details",
    },
    {
      title: "Set Pricing",
      description: "Use ROI calculator for optimization",
    },
    {
      title: "Manage Orders",
      description: "Accept bids and negotiate",
    },
    {
      title: "Fulfill Orders",
      description: "Coordinate logistics efficiently",
    },
    {
      title: "Get Paid",
      description: "Secure payment processing",
    },
  ];

  return (
    <section className="bg-white p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-gray-500 text-lg">
          Simple, streamlined processes designed for each type of user in the
          surplus inventory
          <br />
          ecosystem
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Buyer Flow */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Buyers
          </h3>
          <div className="space-y-6">
            {buyerSteps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 border-2 border-gray-900 text-gray-900 rounded-full flex items-center justify-center font-semibold text-lg">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Flow */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Suppliers
          </h3>
          <div className="space-y-6">
            {sellerSteps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 border-2 border-gray-900 text-gray-900 rounded-full flex items-center justify-center font-semibold text-lg">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
