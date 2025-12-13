const imgRectangle87 =
  "https://www.figma.com/api/mcp/asset/620c87a4-7e27-47d2-a178-0367a638a9d4";
const imgRectangle88 =
  "https://www.figma.com/api/mcp/asset/516cb83e-7f59-4469-a0c2-ca209539353f";
const imgLine73 =
  "https://www.figma.com/api/mcp/asset/43a3fd44-9552-44b9-b8be-4b4fceee3902";

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
    <section className="relative w-full py-[45px] px-[80px] bg-white">
      {/* Title */}
      <h2 className="text-center text-[50px] font-bold leading-normal mb-[10px]">
        <span className="text-[#0d1b2a]">How It </span>
        <span className="text-[#2ec096]">Works</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-[24px] font-semibold leading-normal text-gray-500 mb-[77px] max-w-[990px] mx-auto">
        Simple, streamlined processes designed for each type of user in the
        surplus inventory ecosystem
      </p>

      {/* Two Column Layout */}
      <div className="flex gap-[92px] justify-center">
        {/* Left Column - For Buyers */}
        <div className="w-[493px]">
          <h3 className="text-[35px] font-semibold leading-normal text-[#0d1b2a] text-center mb-[35px]">
            FOR BUYERS
          </h3>
          <div className="flex flex-col gap-[35px]">
            {buyerSteps.map((step, index) => (
              <div key={index} className="relative flex items-start gap-[14px]">
                {/* Number Badge */}
                <div className="bg-[#eeffef] border border-[#2aae7a] rounded-full w-[79px] h-[80px] flex items-center justify-center shrink-0">
                  <span className="text-[40px] font-medium leading-normal text-black">
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="relative w-[493px] h-[130px] flex flex-col justify-center">
                  {/* Background Image */}
                  <img
                    src={imgRectangle87}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                  />
                  {/* Content */}
                  <div className="relative px-[26px] py-[25px]">
                    <h4 className="text-[30px] font-bold leading-normal text-blue-900 mb-[5px]">
                      {step.title}
                    </h4>
                    <p className="text-[25px] font-semibold leading-normal text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line (except last) */}
                {index < buyerSteps.length - 1 && (
                  <div className="absolute left-[39.5px] top-[130px] flex items-center justify-center w-0 h-[50px]">
                    <img
                      src={imgLine73}
                      alt=""
                      className="rotate-90 w-[50px] h-0"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - For Suppliers */}
        <div className="w-[503px]">
          <h3 className="text-[35px] font-semibold leading-normal text-[#0d1b2a] text-center mb-[35px]">
            FOR SUPPLIERS
          </h3>
          <div className="flex flex-col gap-[35px]">
            {supplierSteps.map((step, index) => (
              <div key={index} className="relative flex items-start gap-[14px]">
                {/* Number Badge */}
                <div className="bg-[#eeffef] border border-[#2aae7a] rounded-full w-[79px] h-[80px] flex items-center justify-center shrink-0">
                  <span className="text-[40px] font-medium leading-normal text-black">
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="relative w-[503px] h-[130px] flex flex-col justify-center">
                  {/* Background Image */}
                  <img
                    src={imgRectangle88}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                  />
                  {/* Content */}
                  <div className="relative px-[26px] py-[25px]">
                    <h4 className="text-[30px] font-bold leading-normal text-[#2ec096] mb-[5px]">
                      {step.title}
                    </h4>
                    <p className="text-[25px] font-semibold leading-normal text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line (except last) */}
                {index < supplierSteps.length - 1 && (
                  <div className="absolute left-[39.5px] top-[130px] flex items-center justify-center w-0 h-[50px]">
                    <img
                      src={imgLine73}
                      alt=""
                      className="rotate-90 w-[50px] h-0"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
