"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <div className="bg-white p-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Quick answers to common questions
      </p>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-start justify-between text-left"
            >
              <span className="font-bold text-gray-900 pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-900 transition-transform shrink-0 mt-0.5 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
