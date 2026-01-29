"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Zeerostock has transformed our procurement process. The AI matching is incredible.",
    savings: "$3.2M annual savings",
    entity: "Automotive Supplier",
    location: "California, USA",
  },
  {
    quote:
      "Finally, a reliable platform for sourcing quality OEM surplus parts. The platform is a game changer.",
    savings: "$890K annual savings",
    entity: "Electronics Manufacturer",
    location: "Singapore",
  },
  {
    quote:
      "The verification process gives us complete peace of mind. We've reduced our procurement time significantly.",
    savings: "$2.1M cost reduction",
    entity: "Aerospace Supplier",
    location: "Texas, USA",
  },
];

export default function TestimonialsSection() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  // Update active index on scroll/drag logic could be complex with free scroll,
  // so we'll stick to a simple indicator based on scroll position or just simple dots implementation if we used a slider.
  // For a free-scroll carousel, simple dots might be misleading if they don't snap.
  // Let's implement a snapped carousel or just free scroll.
  // Given "don't mess up with the designing", let's do a smooth snap-like experience or just free scroll with cards.

  return (
    <section className="bg-[#EEFFEF] py-[27px] md:py-[43px] px-0 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto overflow-hidden">
      <div className="w-full max-w-[1080px] mx-auto">
        <div className="text-center mb-[21px] md:mb-[43px] px-4">
          <p className="text-[8px] md:text-[9px] font-semibold text-[#0D1B2A] mb-[3px] tracking-wide uppercase">
            Success Stories
          </p>
          <h2 className="text-[16px] md:text-[27px] font-bold text-[#0D1B2A] mb-[5px] md:mb-[11px] leading-tight">
            Real
            <span className="text-[#2AAE7A]"> Results </span>
            from Real <span className="text-[#2AAE7A]"> Buyers </span>
          </h2>
          <p className="text-[11px] md:text-[13px] text-gray-600">
            See how procurement teams are achieving significant cost savings
          </p>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden md:grid w-full grid-cols-1 md:grid-cols-3 gap-[11px] md:gap-[21px] px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-[11px] md:p-[21px] rounded-2xl shadow-sm flex flex-col h-full"
            >
              <div className="flex items-center gap-[1px] mb-[8px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-[11px] h-[11px] md:w-[13px] md:h-[13px] text-[#DFB769] fill-[#DFB769]"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-[9px] md:text-[11px] mb-[11px] md:mb-[16px] font-medium">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="border-t border-gray-200 pt-[8px] mt-auto">
                <p className="font-bold text-[#2AAE7A] text-[11px] md:text-[12px]">
                  {testimonial.savings}
                </p>
                <p className="text-[8px] md:text-[9px] text-gray-900 font-semibold mt-[3px] md:mt-[5px]">
                  {testimonial.entity}
                </p>
                <p className="text-[8px] md:text-[9px] text-gray-500">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View (Carousel) */}
        <div className="md:hidden w-full pl-4">
          <motion.div ref={carousel} className="cursor-grab overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              whileTap={{ cursor: "grabbing" }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe =
                  Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                if (swipe) {
                  // Logic to snap could go here, but IntersectionObserver handles the "active" state update consistently
                }
              }}
              className="flex gap-[11px]"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                  setActiveIndex={setActiveIndex}
                  carouselRef={carousel}
                />
              ))}
              {/* Spacer for end of carousel */}
              <div className="min-w-[10px]" />
            </motion.div>
          </motion.div>

          {/* Simple Dots */}
          <div className="flex justify-center gap-2 mt-4 pr-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === activeIndex ? "bg-[#2AAE7A]" : "bg-gray-300"}`}
                onClick={() => {
                  // Adding basic click support would require programmatic scrolling which is complex with just drag="x"
                  // For now, we ensure the visuals work seamlessly.
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  setActiveIndex,
  carouselRef,
}: {
  testimonial: any;
  index: number;
  setActiveIndex: (i: number) => void;
  carouselRef: any;
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      {
        root: carouselRef.current,
        threshold: 0.6, // 60% visibility required to be "active"
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [carouselRef, index, setActiveIndex]);

  return (
    <motion.div
      ref={cardRef}
      className="min-w-[85vw] sm:min-w-[300px] bg-white p-[16px] rounded-2xl shadow-sm flex flex-col h-full"
    >
      <div className="flex items-center gap-[1px] mb-[8px]">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-[11px] h-[11px] text-[#DFB769] fill-[#DFB769]"
          />
        ))}
      </div>
      <p className="text-gray-700 text-[10px] mb-[11px] font-medium leading-relaxed">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="border-t border-gray-200 pt-[8px] mt-auto">
        <p className="font-bold text-[#2AAE7A] text-[12px]">
          {testimonial.savings}
        </p>
        <p className="text-[9px] text-gray-900 font-semibold mt-[3px]">
          {testimonial.entity}
        </p>
        <p className="text-[9px] text-gray-500">{testimonial.location}</p>
      </div>
    </motion.div>
  );
}
