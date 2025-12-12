const imgSupplierIcon =
  "https://www.figma.com/api/mcp/asset/b4a1a93d-c02a-42f2-99a2-c0c2a7a7512f";
const imgBuyerIcon =
  "https://www.figma.com/api/mcp/asset/f2a1e778-ab7a-478e-b7b7-f45091be88ae";

export default function PlatformSectionV2() {
  return (
    <section className="bg-[#eefbf6] w-full py-[39px] px-[150px]">
      {/* Title */}
      <h2 className="text-center text-[52px] font-bold mb-[10px]">
        <span className="text-[#0d1b2a]">One Platform, Two </span>
        <span className="text-[#2ec096]">Success Stories</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-[24px] font-semibold text-gray-500 mb-[73px]">
        Discover how Zeerostock creates value for every participant in the
        surplus inventory ecosystem
      </p>

      {/* Cards Container */}
      <div className="flex gap-[110px] justify-center">
        {/* Suppliers Card */}
        <div className="bg-[#2aae7a] rounded-[60px] shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] w-[525px] h-[400px] flex flex-col items-center py-[20px]">
          <img
            alt="Suppliers"
            className="w-[100px] h-[100px] object-cover"
            src={imgSupplierIcon}
          />
          <h3 className="text-[40px] font-semibold text-[#022778] text-center mt-[19px] drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
            SUPPLIERS
          </h3>
          <div className="text-center text-white text-[24px] font-semibold mt-[19px] px-[75px] leading-normal">
            <p className="mb-0">
              Transform surplus inventory into revenue streams
            </p>
            <p>Reduce holding costs & maximize returns</p>
          </div>
        </div>

        {/* Buyers Card */}
        <div className="bg-[#2aae7a] rounded-[60px] shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] w-[505px] h-[400px] flex flex-col items-center py-[20px]">
          <img
            alt="Buyers"
            className="w-[100px] h-[101px] object-cover"
            src={imgBuyerIcon}
          />
          <h3 className="text-[40px] font-semibold text-[#022778] text-center mt-[19px] drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
            BUYERS
          </h3>
          <div className="text-center text-white text-[24px] font-semibold mt-[19px] px-[61px] leading-normal">
            <p className="mb-0">
              Access quality inventory at competitive prices &
            </p>
            <p>Building reliable supply chains with verified partners</p>
          </div>
        </div>
      </div>
    </section>
  );
}
