import Image from "next/image";

const imgRectangle87 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Rectangle.svg";

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
    <section className="w-full py-4 sm:py-5 md:py-[22.5px]">
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-[880px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl md:text-[25px] font-bold leading-normal mb-1 sm:mb-1.5 md:mb-[5px]">
          <span className="text-[#0d1b2a]">How It </span>
          <span className="text-[#2ec096]">Works</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-xs sm:text-sm md:text-[12px] font-semibold leading-normal text-[#6b7280] mb-6 sm:mb-8 md:mb-[38.5px]">
          Simple, streamlined processes designed for each type of user in the
          surplus inventory ecosystem
        </p>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-[46px] justify-center">
          {/* Left Column - For Buyers */}
          <div className="w-full lg:w-[300px]">
            <h3 className="text-base sm:text-lg md:text-[17.5px] font-semibold leading-normal text-[#0d1b2a] text-center mb-3 sm:mb-4 md:mb-[17.5px]">
              FOR BUYERS
            </h3>
            <div className="flex flex-col gap-0">
              {buyerSteps.map((step, index) => (
                <>
                  <div
                    key={`step-${index}`}
                    className="flex items-start gap-1.5 sm:gap-2 md:gap-[7px]"
                  >
                    {/* Number Badge */}
                    <div className="bg-[#eeffef] border border-[#2aae7a] rounded-full w-10 h-10 sm:w-11 sm:h-11 md:w-[39.5px] md:h-[40px] flex items-center justify-center shrink-0">
                      <span className="text-lg sm:text-xl md:text-[20px] font-medium leading-normal text-black">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="relative flex-1 min-h-[65px] sm:min-h-[70px] md:min-h-[73px] flex flex-col justify-center rounded-lg sm:rounded-xl md:rounded-[10px] overflow-hidden">
                      {/* Background Image */}
                      <Image
                        src={imgRectangle87}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {/* Content */}
                      <div className="relative px-3 sm:px-3.5 md:px-4 py-2.5 sm:py-2.5 md:py-3">
                        <h4 className="text-sm sm:text-base md:text-[15px] font-semibold leading-tight text-[#1e3a8a] mb-1.5 sm:mb-2">
                          {step.title}
                        </h4>
                        <p className="text-[10px] sm:text-xs md:text-[11px] font-semibold leading-snug text-[#6b7280]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line (except last) */}
                  {index < buyerSteps.length - 1 && (
                    <div
                      key={`line-${index}`}
                      className="flex justify-start py-2 sm:py-2.5 md:py-[8.75px]"
                    >
                      <div className="w-10 sm:w-11 md:w-[39.5px] flex justify-center">
                        <div className="w-0.5 h-full bg-[#2aae7a]" />
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>

          {/* Right Column - For Suppliers */}
          <div className="w-full lg:w-[300px]">
            <h3 className="text-base sm:text-lg md:text-[17.5px] font-semibold leading-normal text-[#0d1b2a] text-center mb-3 sm:mb-4 md:mb-[17.5px]">
              FOR SUPPLIERS
            </h3>
            <div className="flex flex-col gap-0">
              {supplierSteps.map((step, index) => (
                <>
                  <div
                    key={`step-${index}`}
                    className="flex items-start gap-1.5 sm:gap-2 md:gap-[7px]"
                  >
                    {/* Number Badge */}
                    <div className="bg-[#eeffef] border border-[#2aae7a] rounded-full w-10 h-10 sm:w-11 sm:h-11 md:w-[39.5px] md:h-[40px] flex items-center justify-center shrink-0">
                      <span className="text-lg sm:text-xl md:text-[20px] font-medium leading-normal text-black">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="relative flex-1 min-h-[65px] sm:min-h-[70px] md:min-h-[73px] flex flex-col justify-center rounded-lg sm:rounded-xl md:rounded-[10px] overflow-hidden">
                      {/* Background Image */}
                      <Image
                        src={imgRectangle87}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {/* Content */}
                      <div className="relative px-3 sm:px-3.5 md:px-4 py-2.5 sm:py-2.5 md:py-3">
                        <h4 className="text-sm sm:text-base md:text-[15px] font-semibold leading-tight text-[#2ec096] mb-1.5 sm:mb-2">
                          {step.title}
                        </h4>
                        <p className="text-[10px] sm:text-xs md:text-[11px] font-semibold leading-snug text-[#6b7280]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line (except last) */}
                  {index < supplierSteps.length - 1 && (
                    <div
                      key={`line-${index}`}
                      className="flex justify-start py-2 sm:py-2.5 md:py-[8.75px]"
                    >
                      <div className="w-10 sm:w-11 md:w-[39.5px] flex justify-center">
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
