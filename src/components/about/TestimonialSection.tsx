"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "motion/react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-8, 0, 8]);
  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.5, 0.8, 1, 0.8, 0.5]
  );
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);

  const testimonials = [
    {
      text: "Zeerostock transformed how we handle excess inventory. We've reduced holding costs by 45% and attracted serious buyers for components we thought were worthless.",
      author: "Sarah Mitchell",
      company: "Global Tech Inc.",
      badge: "Verified Supplier",
    },
    {
      text: "The platform's transparency and vetted buyer network gave us confidence to list our surplus materials. Within weeks, we cleared $200K in dead stock and recovered valuable warehouse space.",
      author: "James Rodriguez",
      company: "Industrial Solutions Ltd.",
      badge: "Premium Member",
    },
    {
      text: "Finding quality surplus inventory used to take weeks of phone calls. Now we source everything through Zeerostock - competitive pricing, reliable sellers, and seamless transactions every time.",
      author: "Emily Chen",
      company: "Manufacturing Plus Co.",
      badge: "Top Buyer",
    },
    {
      text: "The RFQ system changed our procurement process. We can now compare offers from multiple suppliers instantly and negotiate better deals on surplus components.",
      author: "Michael Thompson",
      company: "Tech Innovations Inc.",
      badge: "Verified Buyer",
    },
  ];

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      nextTestimonial();
    } else if (offset > threshold || velocity > 500) {
      prevTestimonial();
    }

    x.set(0);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -250 : 250,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="w-full bg-[#EEFBF6] py-6 sm:py-8 md:py-10 lg:py-[43px]">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full flex flex-col items-center">
          {/* Title */}
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-3xl leading-tight lg:leading-snug text-center text-[#0d1b2a] mb-2 sm:mb-[8px]">
            <span className="text-[#2ec096]">Trusted</span> By Industry Leaders
          </h2>

          {/* Subtitle */}
          <p className="font-semibold text-xs sm:text-sm md:text-xs leading-relaxed lg:leading-normal text-center text-[#686868] max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl mb-6 sm:mb-8 md:mb-[43px] px-4 sm:px-0">
            See how businesses like yours are maximizing value from surplus
            inventory
          </p>

          {/* Testimonial Card Container */}
          <div className="relative w-full max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-8 sm:px-10 md:px-[32px] lg:px-[43px]">
            {/* Left Arrow - Hidden on mobile */}
            <button
              onClick={prevTestimonial}
              className="hidden md:block absolute left-[-20px] sm:left-[-27px] md:left-[-33px] top-1/2 -translate-y-1/2 z-10 hover:opacity-80 transition-opacity bg-white rounded-full p-1.5 sm:p-2 shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-[16px] md:h-[16px] text-[#2ec096]" />
            </button>

            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{ x, rotate, scale }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                dragTransition={{
                  power: 0.3,
                  timeConstant: 200,
                  modifyTarget: (target) => Math.round(target / 100) * 100,
                }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                whileTap={{ cursor: "grabbing" }}
                className="relative bg-[#eeffef] rounded-xl sm:rounded-2xl md:rounded-[20px] p-4 sm:p-6 md:p-[21px] lg:p-[32px] min-h-52 sm:min-h-56 md:min-h-[240px] flex flex-col justify-center shadow-sm touch-pan-y cursor-grab select-none"
              >
                {/* Content */}
                <div className="text-center flex flex-col items-center gap-3 sm:gap-4 md:gap-[16px]">
                  {/* Quote */}
                  <p className="font-medium text-sm sm:text-base md:text-lg lg:text-base leading-relaxed lg:leading-normal text-[#686868]">
                    &quot;{testimonials[currentIndex].text}&quot;
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-[21px]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-[16px] md:h-[16px] fill-[#2ec096] text-[#2ec096]"
                      />
                    ))}
                  </div>

                  {/* Divider Line */}
                  <div className="w-full h-[1px] bg-gray-300 my-2" />

                  {/* Author Info */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-bold text-base sm:text-lg md:text-xl lg:text-xl leading-tight text-black">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-base leading-tight text-black">
                      {testimonials[currentIndex].company}
                    </p>
                    <p className="font-medium text-xs sm:text-sm md:text-base lg:text-xs leading-relaxed lg:leading-tight text-[#3f3737]">
                      {testimonials[currentIndex].badge}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Arrow - Hidden on mobile */}
            <button
              onClick={nextTestimonial}
              className="hidden md:block absolute right-[-20px] sm:right-[-27px] md:right-[-33px] top-1/2 -translate-y-1/2 z-10 hover:opacity-80 transition-opacity bg-white rounded-full p-1.5 sm:p-2 shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-[16px] md:h-[16px] text-[#2ec096]" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-[11px] mt-4 sm:mt-5 md:mt-[21px]">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-[7px] h-[7px] rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-[#2ec096]"
                      : "bg-[#d9d9d9] hover:bg-[#2ec096]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
