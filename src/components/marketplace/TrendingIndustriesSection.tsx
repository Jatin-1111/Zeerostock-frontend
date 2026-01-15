export default function TrendingIndustriesSection() {
  const iconChart =
    "https://www.figma.com/api/mcp/asset/360fc98d-2ff6-4b5a-bb40-b552feb4e7ca";
  const industryImage =
    "https://www.figma.com/api/mcp/asset/5e482c2a-ed50-4db0-99d5-b03d01aac5b5";

  const industries = [
    { name: "Construction", image: industryImage },
    { name: "Technology", image: industryImage },
    { name: "Manufacturing", image: industryImage },
    { name: "Pharma", image: industryImage },
    { name: "Agri-export", image: industryImage },
    { name: "Healthcare", image: industryImage },
  ];

  return (
    <div className="mx-auto max-w-[960px] py-[45px]">
      {/* Header with icon and title */}
      <div className="mb-[29px] flex items-center gap-[15px]">
        <img src={iconChart} alt="Chart" className="h-[29px] w-[29px]" />
        <h2 className="m-0 text-[26px] font-semibold text-[#0d1b2a]">
          Trending Industries
        </h2>
        <div className="ml-[15px] rounded-[4px] bg-[#FFF1C2] px-[11px] py-[2px]">
          <span className="text-[15px] font-medium text-[#0d1b2a]">
            Hot Markets
          </span>
        </div>
      </div>

      {/* Industries grid */}
      <div className="grid grid-cols-[repeat(6,138px)] justify-between gap-[15px]">
        {industries.map((industry, index) => (
          <div
            key={index}
            className="h-[138px] w-[138px] cursor-pointer overflow-hidden rounded-full bg-white shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] transition-transform duration-200 hover:scale-105"
          >
            <img
              src={industry.image}
              alt={industry.name}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
