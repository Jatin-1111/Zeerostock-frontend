const imgLogo1 =
  "https://www.figma.com/api/mcp/asset/a0f8659a-8ed5-4917-8b7a-8d6606722d07";
const imgLogo2 =
  "https://www.figma.com/api/mcp/asset/173b8291-5395-411b-af56-5508b6fc266a";
const imgLogo3 =
  "https://www.figma.com/api/mcp/asset/af1da0a5-d8b5-4a77-b7ca-809142742966";
const imgLogo4 =
  "https://www.figma.com/api/mcp/asset/0f884c48-7b0c-4be4-abb1-3c718a7d0e08";
const imgLogo5 =
  "https://www.figma.com/api/mcp/asset/88d0f6c2-35c1-46d9-a61a-cba5a08dc2fd";

const imgTestimonial1 =
  "https://www.figma.com/api/mcp/asset/76bf0621-9807-4be0-89b7-e33f44e4ed8d";
const imgTestimonial2 =
  "https://www.figma.com/api/mcp/asset/0585261c-111a-4c34-81b8-f602bb91517e";
const imgTestimonial3 =
  "https://www.figma.com/api/mcp/asset/08f9e265-a6c8-45ac-8f14-30a99c0338c4";

export default function TestimonialsSectionV2() {
  const testimonials = [
    {
      quote:
        '"Zerostock helped us liquidate ₹5L worth of idle stock within 2 weeks."',
      name: "Operations Head",
      company: "ABC Manufacturing",
      image: imgTestimonial1,
    },
    {
      quote: `"The platform's AI matching is incredibly accurate. Found a buyer in just 48 hours."`,
      name: "Procurement Manager",
      company: "Global Tech Inc.",
      image: imgTestimonial2,
    },
    {
      quote:
        '"A game-changer for sourcing materials. Trustworthy, efficient, and cost-effective."',
      name: "Supply Chain Director",
      company: "Future Logistics",
      image: imgTestimonial3,
    },
  ];

  return (
    <section className="w-full py-[26px] px-[80px]">
      {/* Title */}
      <h2 className="text-center text-[50px] font-bold mb-[8px]">
        <span className="text-[#2ec096]">Trusted</span>
        <span className="text-[#0d1b2a]"> By Industry Leaders</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-[24px] font-semibold text-gray-500 mb-[38px]">
        See how businesses like yours are maximizing value from surplus
        inventory
      </p>

      {/* Company Logos */}
      <div className="flex justify-center items-center gap-[72px] mb-[46px]">
        <img alt="Company Logo" src={imgLogo1} className="h-[107px] w-auto" />
        <img alt="Company Logo" src={imgLogo2} className="h-[97px] w-auto" />
        <img alt="Company Logo" src={imgLogo3} className="h-[92px] w-auto" />
        <img alt="Company Logo" src={imgLogo4} className="h-[92px] w-auto" />
        <img alt="Company Logo" src={imgLogo5} className="h-[94px] w-auto" />
      </div>

      {/* Testimonial Cards */}
      <div className="flex gap-[39px] justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#eeffef] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] w-[400px] h-[459px] overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-[220px] overflow-hidden rounded-t-[30px]">
              <img
                alt={testimonial.company}
                className="w-full h-full object-cover"
                src={testimonial.image}
              />
            </div>

            {/* Content */}
            <div className="p-[20px] flex flex-col">
              <p className="text-[22px] font-medium text-[#686868] mb-[20px] leading-normal">
                {testimonial.quote}
              </p>
              <h4 className="text-[28px] font-bold text-black mb-[7px]">
                {testimonial.name}
              </h4>
              <p className="text-[21px] font-medium text-black">
                {testimonial.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
