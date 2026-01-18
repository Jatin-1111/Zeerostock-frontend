export default function CommissionSection() {
  const tiers = [
    {
      name: "Starter Agent",
      rate: "3%",
      suppliers: "1-5 supplier",
      description: "Commission on every transaction from your supplier.",
    },
    {
      name: "Growth Agent",
      rate: "4%",
      suppliers: "6-15 suppliers",
      description: "Commission on every transaction from your supplier.",
    },
    {
      name: "Elite Agent",
      rate: "5%",
      suppliers: "16+ suppliers",
      description: "Commission on every transaction from your supplier.",
    },
  ];

  const examples = [
    {
      amount: "$2,500+",
      description: "5 suppliers doing $15K/month each @ 3% commission rate",
    },
    {
      amount: "$8,000+",
      description: "10 suppliers doing $20K/month each @ 4% commission rate",
    },
    {
      amount: "$20,000",
      description: "20 suppliers doing $20K/month each @ 5% commission rate",
    },
  ];

  return (
    <div>
      {/* Commission Structure Section */}
      <section
        className="bg-[#eeffef] py-10 relative"
        style={{ boxShadow: "0px 1px 4px 0px rgba(24,181,34,0.25)" }}
      >
        <div className="max-w-[960px] mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-[14px] font-medium text-black mb-4">
              Commission Tiers
            </p>
            <h2 className="text-[34.67px] font-medium leading-[46.67px] text-[#0d1b2a] mb-2.5">
              Transparent <span className="text-[#2ec096]">Commission</span>{" "}
              Structure
            </h2>
            <p className="text-[16px] font-semibold leading-normal text-[#9c9c9c] max-w-[728px] mx-auto">
              Earn recurring commissions on all sales made by suppliers you
              onboard. The more suppliers you bring, the higher your commission
              rate grows.
            </p>
          </div>

          {/* Commission Tiers Grid */}
          <div className="grid grid-cols-3 gap-[80px] mt-[43px]">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="bg-[#fbfbfb] border-[1.33px] border-[#1e3a8a] rounded-[13.33px] h-[180px] w-[275px] relative overflow-hidden"
              >
                <p className="absolute left-[26px] top-[16px] text-[14.67px] font-medium text-black text-left">
                  {tier.name}
                </p>
                <p className="absolute left-[26px] top-[38px] text-[33.33px] font-semibold text-[#1e3a8a] text-left">
                  {tier.rate}
                </p>
                <p className="absolute left-[26px] top-[86.67px] text-[13.33px] font-semibold text-[#7d7d7d] text-left">
                  {tier.suppliers}
                </p>
                <p className="absolute left-[26px] top-[112.67px] text-[12px] font-medium text-[#9c9c9c] w-[182px]">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Monthly Earnings Section */}
      <section
        className="bg-[#fbfbfb] py-[28.67px] relative"
        style={{ boxShadow: "0px 2px 4.5px 0px rgba(0,0,0,0.25)" }}
      >
        <div className="max-w-[960px] mx-auto px-8">
          <h3 className="text-[20px] font-medium leading-[23.33px] text-[#0d1b2a] text-center mb-[56.67px]">
            Example Monthly Earnings
          </h3>

          <div className="grid grid-cols-3 gap-[125.33px]">
            {examples.map((example, index) => (
              <div key={index} className="text-center">
                <p className="text-[26.67px] font-semibold leading-[26.67px] text-black mb-[10px]">
                  {example.amount}
                </p>
                <p className="text-[12px] font-medium leading-[19.22px] text-[#9c9c9c]">
                  <span className="font-semibold">
                    {example.description.split("@")[0]}
                  </span>
                  {example.description.includes("@") &&
                    `@ ${example.description.split("@")[1]}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
