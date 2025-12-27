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
    { image: imgLogo1, width: "111.75px", height: "80.25px" },
    { image: imgLogo2, width: "129px", height: "72.75px" },
    { image: imgLogo3, width: "108px", height: "69px" },
    { image: imgLogo4, width: "136.5px", height: "69px" },
    { image: imgLogo5, width: "110.25px", height: "70.5px" },
  ];

  return (
    <section className="w-full py-[19.5px]">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-[37.5px] font-bold leading-normal mb-[6px]">
          <span className="text-[#2ec096]">Trusted</span>
          <span className="text-[#0d1b2a]"> By Industry Leaders</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[18px] font-semibold leading-normal text-[#6b7280] mb-[58.5px] max-w-[772.5px] mx-auto">
          See how businesses like yours are maximizing value from surplus
          inventory
        </p>

        {/* Logos */}
        <div className="flex items-center justify-center gap-[30px] mb-[67.5px]">
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
        <div className="flex gap-[59.25px] justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#eeffef] rounded-[22.5px] shadow-[0px_0px_7.5px_0px_rgba(24,181,34,0.5)] w-[300px] overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-[165px] w-full overflow-hidden rounded-t-[22.5px]">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="px-[15px] py-[30px]">
                {/* Quote */}
                <p className="text-[16.5px] font-medium leading-normal text-[#686868] mb-[30px]">
                  {testimonial.quote}
                </p>

                {/* Name */}
                <p className="text-[21px] font-bold leading-normal text-black mb-[7.5px]">
                  {testimonial.name}
                </p>

                {/* Company */}
                <p className="text-[15.75px] font-medium leading-normal text-black">
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
