"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How quickly can I start selling?",
      answer:
        "You can list your inventory and start receiving inquiries within hours of account creation. Our verification process is streamlined to get you selling as quickly as possible.",
    },
    {
      question: "What types of inventory sell best?",
      answer:
        "Industrial equipment, raw materials, electronics, and construction materials are in highest demand. However, we have buyers for almost every category of surplus inventory.",
    },
    {
      question: "How are payments protected?",
      answer:
        "All payments go through our secure escrow system. Funds are released to you after the buyer confirms delivery, ensuring you're protected throughout the transaction.",
    },
    {
      question: "Do you help with shipping and logistics?",
      answer:
        "Yes, we have partnerships with logistics providers for everything from local pickup to international shipping. We can help coordinate and track shipments.",
    },
    {
      question: "What if a buyer disputes the quality?",
      answer:
        "We have a comprehensive dispute resolution process. Most issues are resolved through our mediation service, and our escrow system protects both parties during the process.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#EEFBF6] px-[40px] py-[50px]">
      <div className="max-w-4xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[87px]">
          <h2 className="text-[26px] leading-[39px] font-medium text-[#0d1b2a] mb-[7px]">
            Frequently Asked Questions
          </h2>
          <p className="text-[12px] font-semibold text-[#9c9c9c]">
            Quick answers to common questions
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-[20px]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#fbfbfb] rounded-[10px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-[15px] py-[15px] text-left"
              >
                <span className="text-[13px] leading-[14px] font-medium text-[#0d1b2a] tracking-[0.5px] pr-4">
                  {faq.question}
                </span>

                {/* Animated the rotation with Motion too, way smoother than class switching */}
                <motion.div
                  animate={{ rotate: openIndex === index ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronUp className="w-4 h-4 text-dark" strokeWidth={2} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    {/* Inner div is needed for padding so it doesn't jerk during animation */}
                    <div className="px-[15px] pb-[15px]">
                      <p className="text-[10px] leading-[14px] font-medium text-[#9c9c9c] tracking-[0.5px]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
