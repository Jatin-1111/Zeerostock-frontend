"use client";

import { useState } from "react";

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I earn commission?",
      answer:
        "You earn a commission for every successful transaction facilitated through your referrals or brokerage. The more transactions you complete, the higher your commission tier.",
    },
    {
      question: "When do I get paid?",
      answer:
        "Commission payments are processed monthly, typically within 7 business days after the end of each month. Payments are made via your preferred payment method.",
    },
    {
      question: "Is there a minimum requirement?",
      answer:
        "Yes, you must facilitate at least 3 successful transactions per month to maintain active agent status. There is also a minimum threshold of $100 for commission payouts.",
    },
    {
      question: "Do I need prior experience?",
      answer:
        "While prior experience in B2B sales or procurement is helpful, it is not required. We provide comprehensive training and support to all new agents.",
    },
    {
      question: "Can I work from anywhere?",
      answer:
        "Yes! As long as you have an internet connection, you can work as a Zeerostock agent from anywhere in the world. We support remote work and global partnerships.",
    },
    {
      question: "What support do I get?",
      answer:
        "You'll have access to training materials, marketing resources, a dedicated support team, and ongoing assistance to help you succeed as an agent.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-600">
            Everything you need to know about becoming an agent
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 max-w-[900px] mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-gray-900">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expandedIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-base text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
