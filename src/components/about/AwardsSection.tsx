import { Award, Trash2, Factory, Cloud, Briefcase } from "lucide-react";

export default function AwardsSection() {
  const awards = [
    {
      title: "Forbes Next Billion-Dollar Startup",
      year: "2024",
      description:
        "Recognized for innovative approach to B2B marketplace technology",
    },
    {
      title: "Sustainability Excellence Award",
      year: "2024",
      description:
        "Honored for reducing industrial waste through smart surplus trading",
    },
    {
      title: "TechCrunch Disrupt Winner",
      year: "2023",
      description:
        "First place in B2B SaaS category for revolutionary AI matching",
    },
    {
      title: "Fast Company Most Innovative",
      year: "2023",
      description:
        "Listed among most innovative companies in supply chain technology",
    },
  ];

  const impactStats = [
    {
      icon: Trash2,
      value: "2.3M+",
      unit: "tons",
      label: "Waste Reduced",
    },
    {
      icon: Cloud,
      value: "890k+",
      unit: "tons",
      label: "CO2 Emissions Avoided",
    },
    {
      icon: Factory,
      value: "8,500+",
      unit: "",
      label: "Small Businesses Supported",
    },
    {
      icon: Briefcase,
      value: "15,000+",
      unit: "",
      label: "Jobs Created",
    },
  ];

  return (
    <section className="max-w-[1080px] mx-auto py-6 sm:py-8 md:py-10 lg:py-[53px]">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="relative w-full max-w-7xl mx-auto">
            {/* Subtitle */}
            <p className="font-medium text-xs sm:text-sm md:text-[12px] text-center text-[#868181] mb-2 sm:mb-[11px]">
              Recognitions
            </p>

            {/* Main Title */}
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-center text-[#0d1b2a] mb-6 sm:mb-8 md:mb-10 lg:mb-[53px]">
              Industry <span className="text-[#2ec096]">Recognitions</span> &{" "}
              <span className="text-[#2ec096]">Awards</span>
            </h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-[32px]">
              {/* Left Column - Awards List */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 md:space-y-[21px]">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex gap-3 sm:gap-4 md:gap-[16px] pb-4 sm:pb-5 md:pb-[21px] border-b border-gray-200 last:border-b-0"
                  >
                    {/* Medal Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-[32px] md:h-[32px] rounded-full bg-white flex items-center justify-center shadow-md">
                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[16px] md:h-[16px] text-[#2ec096]" />
                      </div>
                    </div>

                    {/* Award Content */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xs sm:text-sm md:text-sm text-[#0d1b2a] flex-grow pr-4">
                          {award.title}
                        </h3>
                        <span className="font-bold text-xs sm:text-sm md:text-sm text-[#0d1b2a] flex-shrink-0">
                          {award.year}
                        </span>
                      </div>
                      <p className="font-medium text-xs sm:text-xs md:text-xs text-[#868181] leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Impact Cards */}
              <div className="lg:col-span-5">
                {/* Mobile/Tablet: 2x2 Grid */}
                <div className="lg:hidden">
                  <h3 className="font-bold text-lg sm:text-xl md:text-[21px] text-black text-center mb-4 md:mb-6">
                    Our Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    {impactStats.map((stat, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-[#eeffef] rounded-xl sm:rounded-2xl shadow-[0px_-1px_30px_0px_rgba(24,181,34,0.25)] p-4 sm:p-5 flex flex-col items-center justify-center h-32 sm:h-36 md:h-40"
                        >
                          <p className="font-worksans font-semibold text-xl sm:text-2xl leading-normal text-black text-center">
                            {stat.value}
                          </p>
                          <p className="font-worksans font-semibold text-xl sm:text-2xl leading-normal text-black text-center mb-1 min-h-[1.75rem] sm:min-h-[2rem]">
                            {stat.unit || "\u00A0"}
                          </p>
                          <p className="font-medium text-[10px] sm:text-xs leading-tight text-[#8f8f8f] text-center">
                            {stat.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop: Overlapping Cards Layout */}
                <div className="hidden lg:block relative h-[280px]">
                  {/* Top Right Card - Our Impact (Waste & CO2) */}
                  <div className="absolute top-[-33px] right-[20px] w-[213px] bg-[#eeffef] rounded-[20px] shadow-[0px_-1px_30px_0px_rgba(24,181,34,0.25)] p-[16px] z-20">
                    {/* Title */}
                    <h3 className="font-bold text-2xl text-black text-center mb-[16px]">
                      Our Impact
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-[21px] mb-[16px]">
                      {/* Waste Reduced */}
                      <div className="flex flex-col items-center">
                        <div className="w-[22px] h-[21px] mb-[11px]">
                          <Trash2
                            className="w-full h-full text-black"
                            strokeWidth={1.5}
                          />
                        </div>
                        <p className="font-worksans font-semibold text-[24px] leading-[30px] text-black text-center mb-0">
                          2.3M
                        </p>
                        <p className="font-worksans font-semibold text-[24px] leading-[30px] text-black text-center mb-[5px]">
                          tons
                        </p>
                        <p className="font-medium text-xs leading-normal text-[#8f8f8f] text-center">
                          Waste Reduced
                        </p>
                      </div>

                      {/* CO2 Emissions */}
                      <div className="flex flex-col items-center">
                        <div className="w-[25px] h-[27px] mb-[11px]">
                          <Cloud
                            className="w-full h-full text-black"
                            strokeWidth={1.5}
                          />
                        </div>
                        <p className="font-worksans font-semibold text-[24px] leading-[30px] text-black text-center mb-0">
                          890k
                        </p>
                        <p className="font-worksans font-semibold text-[24px] leading-[30px] text-black text-center mb-[5px]">
                          tons
                        </p>
                        <p className="font-medium text-xs leading-tight text-[#8f8f8f] text-center">
                          CO2 Emissions Avoided
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Left Card - Small Businesses & Jobs */}
                  <div className="absolute bottom-[-67px] left-[28px] w-[213px] bg-[#eeffef] rounded-[20px] shadow-[0px_-1px_30px_0px_rgba(24,181,34,0.25)] p-[16px] z-10">
                    {/* Small Businesses */}
                    <div className="mb-[16px]">
                      <div className="w-[27px] h-[27px] mb-[8px]">
                        <Factory
                          className="w-full h-full text-black"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="font-worksans font-semibold text-[24px] leading-normal text-black mb-[5px]">
                        8,500+
                      </p>
                      <p className="font-medium text-sm leading-tight text-[#8f8f8f] w-[133px]">
                        Small Businesses Supported
                      </p>
                    </div>

                    {/* Jobs Created */}
                    <div className="relative">
                      <div className="absolute right-0 top-0 w-[26px] h-[26px]">
                        <Briefcase
                          className="w-full h-full text-black"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="font-worksans font-semibold text-[24px] leading-normal text-black text-right mb-[5px] pt-[27px]">
                        15,000+
                      </p>
                      <p className="font-medium text-sm leading-normal text-[#8f8f8f] text-right">
                        Jobs Created
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
