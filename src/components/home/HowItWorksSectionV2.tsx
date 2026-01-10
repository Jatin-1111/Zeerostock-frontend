const imgRectangle87 =
  "https://www.figma.com/api/mcp/asset/8972b95b-591c-4538-9412-e75fba85500e";
const imgRectangle88 =
  "https://www.figma.com/api/mcp/asset/7a4e6c4a-939a-4c90-a5e5-99aa2a21d0d7";

export default function HowItWorksSectionV2() {
  const buyerSteps = [
    {
      number: 1,
      title: "BROWSE LISTINGS",
      description: "Search verified surplus inventory",
    },
    {
      number: 2,
      title: "COMPARE OPTIONS",
      description: "Use filters and trust scores",
    },
    {
      number: 3,
      title: "PLACE ORDERS",
      description: "Secure transactions with escrow",
    },
    {
      number: 4,
      title: "TRACK DELIVERY",
      description: "Real-Time shipping updates",
    },
    {
      number: 5,
      title: "RATE & REVIEW",
      description: "Build supplier relationships",
    },
  ];

  const supplierSteps = [
    {
      number: 1,
      title: "LIST INVENTORY",
      description: "Upload surplus stock details",
    },
    {
      number: 2,
      title: "SET PRICING",
      description: "Use ROI calculator for optimization",
    },
    {
      number: 3,
      title: "MANAGE ORDERS",
      description: "Accept bids and negotiate",
    },
    {
      number: 4,
      title: "FULFILL ORDERS",
      description: "Coordinate logistics efficiently",
    },
    {
      number: 5,
      title: "GET PAID",
      description: "Secure payment processing",
    },
  ];

  return (
    <section className="w-full py-[22.5px]">
      <div className="max-w-[880px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-[25px] font-bold leading-normal mb-[5px]">
          <span className="text-[#0d1b2a]">How It </span>
          <span className="text-[#2ec096]">Works</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[12px] font-semibold leading-normal text-[#6b7280] mb-[38.5px] max-w-[495px] mx-auto">
          Simple, streamlined processes designed for each type of user in the
          surplus inventory ecosystem
        </p>

        {/* Two Column Layout */}
        <div className="flex gap-[46px] justify-center">
          {/* Left Column - For Buyers */}
          <div className="w-[300px]">
            <h3 className="text-[17.5px] font-semibold leading-normal text-[#0d1b2a] text-center mb-[17.5px]">
              FOR BUYERS
            </h3>
            <div className="flex flex-col gap-0">
              {buyerSteps.map((step, index) => (
                <>
                  <div
                    key={`step-${index}`}
                    className="flex items-start gap-[7px]"
                  >
                    {/* Number Badge */}
                    <div className="bg-[#eeffef] border border-[#2aae7a] rounded-full w-[39.5px] h-[40px] flex items-center justify-center shrink-0">
                      <span className="text-[20px] font-medium leading-normal text-black">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="relative flex-1 min-h-[73px] flex flex-col justify-center rounded-[10px] overflow-hidden">
                      {/* Background Image */}
                      <img
                        src={imgRectangle87}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Content */}
                      <div className="relative px-4 py-3">
                        <h4 className="text-[15px] font-semibold leading-tight text-[#1e3a8a] mb-2">
                          {step.title}
                        </h4>
                        <p className="text-[11px] font-semibold leading-snug text-[#6b7280]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line (except last) */}
                  {index < buyerSteps.length - 1 && (
                    <div
                      key={`line-${index}`}
                      className="flex justify-start py-[8.75px]"
                    >
                      <div className="w-[39.5px] flex justify-center">
                        <div className="w-0.5 h-full bg-[#2aae7a]" />
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>

          {/* Right Column - For Suppliers */}
          <div className="w-[300px]">
            <h3 className="text-[17.5px] font-semibold leading-normal text-[#0d1b2a] text-center mb-[17.5px]">
              FOR SUPPLIERS
            </h3>
            <div className="flex flex-col gap-0">
              {supplierSteps.map((step, index) => (
                <>
                  <div
                    key={`step-${index}`}
                    className="flex items-start gap-[7px]"
                  >
                    {/* Number Badge */}
                    <div className="bg-[#eeffef] border border-[#2aae7a] rounded-full w-[39.5px] h-[40px] flex items-center justify-center shrink-0">
                      <span className="text-[20px] font-medium leading-normal text-black">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="relative flex-1 min-h-[73px] flex flex-col justify-center rounded-[10px] overflow-hidden">
                      {/* Background Image */}
                      <img
                        src={imgRectangle88}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Content */}
                      <div className="relative px-4 py-3">
                        <h4 className="text-[15px] font-semibold leading-tight text-[#2ec096] mb-2">
                          {step.title}
                        </h4>
                        <p className="text-[11px] font-semibold leading-snug text-[#6b7280]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line (except last) */}
                  {index < supplierSteps.length - 1 && (
                    <div
                      key={`line-${index}`}
                      className="flex justify-start py-[8.75px]"
                    >
                      <div className="w-[39.5px] flex justify-center">
                        <div className="w-0.5 h-full bg-[#2aae7a]" />
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
