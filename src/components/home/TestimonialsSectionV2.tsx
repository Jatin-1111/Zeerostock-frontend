const imgLogo1 =
  "https://www.figma.com/api/mcp/asset/5319ae99-4ad2-4126-b596-c117e94da6cc";
const imgLogo2 =
  "https://www.figma.com/api/mcp/asset/115e5d88-23f4-47d5-ba51-96eebb312bde";
const imgLogo3 =
  "https://www.figma.com/api/mcp/asset/1d99c889-3af4-41cb-a874-ca4b0c93e7de";
const imgLogo4 =
  "https://www.figma.com/api/mcp/asset/de98641d-7456-400f-a65a-40e062f13499";
const imgLogo5 =
  "https://www.figma.com/api/mcp/asset/0e0c689d-91d0-45f3-beb6-65b8726e822c";

const imgTestimonial1 =
  "https://www.figma.com/api/mcp/asset/13bb304d-983f-41fc-8346-be8051c0cd31";
const imgTestimonial2 =
  "https://www.figma.com/api/mcp/asset/0af2817d-4603-4093-9428-f261ea1d5d66";
const imgTestimonial3 =
  "https://www.figma.com/api/mcp/asset/f180d6e2-94cc-49f1-8289-508ac1d16a5f";

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

  const logos = [
    { image: imgLogo1, width: "74.5px", height: "53.5px" },
    { image: imgLogo2, width: "86px", height: "48.5px" },
    { image: imgLogo3, width: "72px", height: "46px" },
    { image: imgLogo4, width: "91px", height: "46px" },
    { image: imgLogo5, width: "73.5px", height: "47px" },
  ];

  return (
    <section className="w-full py-2 sm:py-3 md:py-[13px]">
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-[880px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl md:text-[25px] font-bold leading-normal mb-1 sm:mb-1.5 md:mb-[4px]">
          <span className="text-[#2ec096]">Trusted</span>
          <span className="text-[#0d1b2a]"> By Industry Leaders</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-xs sm:text-sm md:text-[12px] font-semibold leading-normal text-[#6b7280] mb-6 sm:mb-8 md:mb-[39px] max-w-full sm:max-w-md md:max-w-[515px] mx-auto px-4 sm:px-0">
          See how businesses like yours are maximizing value from surplus
          inventory
        </p>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-[20px] mb-6 sm:mb-8 md:mb-[45px]">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
              style={{
                width: logo.width,
                height: logo.height,
              }}
            >
              <img
                src={logo.image}
                alt={`Partner logo ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-[39.5px] justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#eeffef] rounded-xl sm:rounded-2xl md:rounded-[15px] shadow-[0px_0px_5px_0px_rgba(24,181,34,0.5)] w-full max-w-sm sm:max-w-xs md:max-w-[200px] overflow-hidden mx-auto"
            >
              {/* Image */}
              <div className="relative h-28 sm:h-32 md:h-[110px] w-full overflow-hidden rounded-t-xl sm:rounded-t-2xl md:rounded-t-[15px]">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="px-3 sm:px-4 md:px-[10px] py-4 sm:py-5 md:py-[20px]">
                {/* Quote */}
                <p className="text-xs sm:text-sm md:text-[11px] font-medium leading-normal text-[#686868] mb-4 sm:mb-5 md:mb-[20px]">
                  {testimonial.quote}
                </p>

                {/* Name */}
                <p className="text-sm sm:text-base md:text-[14px] font-bold leading-normal text-black mb-1 sm:mb-1.5 md:mb-[5px]">
                  {testimonial.name}
                </p>

                {/* Company */}
                <p className="text-[10px] sm:text-xs md:text-[10.5px] font-medium leading-normal text-black">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
