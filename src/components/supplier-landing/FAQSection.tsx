"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

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
    <div className="w-full bg-[#EEFBF6] px-[60px] py-[75px]">
      <div className="max-w-[1320px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[130px]">
          <h2 className="text-[39px] leading-[59px] font-medium text-[#0d1b2a] mb-[11px]">
            Frequently Asked Questions
          </h2>
          <p className="text-[18px] font-semibold text-[#9c9c9c]">
            Quick answers to common questions
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-[30px]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#fbfbfb] rounded-[15px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-[23px] py-[23px] text-left"
              >
                <span className="text-[20px] leading-[21px] font-medium text-[#0d1b2a] tracking-[0.5px] pr-4">
                  {faq.question}
                </span>
                <ChevronUp
                  className={`w-[21px] h-[21px] text-[#0d1b2a] transition-transform shrink-0 ${
                    openIndex === index ? "" : "rotate-180"
                  }`}
                  strokeWidth={2}
                />
              </button>
              {openIndex === index && (
                <div className="px-[23px] pb-[23px]">
                  <p className="text-[15px] leading-[21px] font-medium text-[#9c9c9c] tracking-[0.5px]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
