const imgLogo1 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Logo 1.png";
const imgLogo2 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Logo 2.png";
const imgLogo3 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Logo 3.png";
const imgLogo4 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Logo 4.png";
const imgLogo5 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Logo 5.png";

const imgTestimonial1 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Team img 3.png";
const imgTestimonial2 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Team img 2.png";
const imgTestimonial3 =
  "https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Team img 1.png";

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
        <p className="text-center text-xs sm:text-sm md:text-[12px] font-semibold leading-normal text-[#6b7280] mb-6 sm:mb-8 md:mb-[39px]">
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
              <div className="relative h-full sm:h-32 md:h-[110px] w-full overflow-hidden rounded-t-xl sm:rounded-t-2xl md:rounded-t-[15px]">
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
