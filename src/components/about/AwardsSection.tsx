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
      value: "2.3M",
      unit: "tons",
      label: "Waste Reduced",
    },
    {
      icon: Cloud,
      value: "890k",
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
    <section className="w-full bg-[#EEFBF6] py-20">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="relative w-full max-w-7xl mx-auto">
            {/* Subtitle */}
            <p className="font-medium text-lg text-center text-[#868181] mb-4">
              Recognitions
            </p>

            {/* Main Title */}
            <h2 className="font-bold text-5xl text-center text-[#0d1b2a] mb-20">
              Industry <span className="text-[#2ec096]">Recognitions</span> &{" "}
              <span className="text-[#2ec096]">Awards</span>
            </h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column - Awards List */}
              <div className="lg:col-span-7 space-y-8">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex gap-6 pb-8 border-b border-gray-200 last:border-b-0"
                  >
                    {/* Medal Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Award className="w-6 h-6 text-[#2ec096]" />
                      </div>
                    </div>

                    {/* Award Content */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xl text-[#0d1b2a] flex-grow pr-4">
                          {award.title}
                        </h3>
                        <span className="font-bold text-xl text-[#0d1b2a] flex-shrink-0">
                          {award.year}
                        </span>
                      </div>
                      <p className="font-medium text-base text-[#868181] leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Impact Cards */}
              <div className="lg:col-span-5">
                <div className="relative h-[420px]">
                  {/* Top Right Card - Our Impact (Waste & CO2) */}
                  <div className="absolute top-[-50px] right-[-10px] w-[320px] bg-[#eeffef] rounded-[30px] shadow-[0px_-1px_30px_0px_rgba(24,181,34,0.25)] p-6 z-20">
                    {/* Title */}
                    <h3 className="font-bold text-[32px] text-black text-center mb-6">
                      Our Impact
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-8 mb-6">
                      {/* Waste Reduced */}
                      <div className="flex flex-col items-center">
                        <div className="w-[33px] h-[31px] mb-4">
                          <Trash2
                            className="w-full h-full text-black"
                            strokeWidth={1.5}
                          />
                        </div>
                        <p className="font-worksans font-semibold text-[36px] leading-[45px] text-black text-center mb-0">
                          2.3M
                        </p>
                        <p className="font-worksans font-semibold text-[36px] leading-[45px] text-black text-center mb-2">
                          tons
                        </p>
                        <p className="font-medium text-[16px] leading-[30px] text-[#8f8f8f] text-center">
                          Waste Reduced
                        </p>
                      </div>

                      {/* CO2 Emissions */}
                      <div className="flex flex-col items-center">
                        <div className="w-[37px] h-[40px] mb-4">
                          <Cloud
                            className="w-full h-full text-black"
                            strokeWidth={1.5}
                          />
                        </div>
                        <p className="font-worksans font-semibold text-[36px] leading-[45px] text-black text-center mb-0">
                          890k
                        </p>
                        <p className="font-worksans font-semibold text-[36px] leading-[45px] text-black text-center mb-2">
                          tons
                        </p>
                        <p className="font-medium text-[15px] leading-[25px] text-[#8f8f8f] text-center">
                          CO2 Emissions Avoided
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Left Card - Small Businesses & Jobs */}
                  <div className="absolute bottom-[-100px] left-[-10px] w-[320px] bg-[#eeffef] rounded-[30px] shadow-[0px_-1px_30px_0px_rgba(24,181,34,0.25)] p-6 z-10">
                    {/* Small Businesses */}
                    <div className="mb-6">
                      <div className="w-10 h-10 mb-3">
                        <Factory
                          className="w-full h-full text-black"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="font-worksans font-semibold text-[36px] leading-normal text-black mb-2">
                        8,500+
                      </p>
                      <p className="font-medium text-[18px] leading-[20px] text-[#8f8f8f] w-[200px]">
                        Small Businesses Supported
                      </p>
                    </div>

                    {/* Jobs Created */}
                    <div className="relative">
                      <div className="absolute right-0 top-0 w-[39px] h-[39px]">
                        <Briefcase
                          className="w-full h-full text-black"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="font-worksans font-semibold text-[36px] leading-normal text-black text-right mb-2 pt-10">
                        15,000+
                      </p>
                      <p className="font-medium text-[18px] leading-[30px] text-[#8f8f8f] text-right">
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
