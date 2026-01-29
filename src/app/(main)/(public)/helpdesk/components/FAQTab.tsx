"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Category =
  | "all"
  | "account"
  | "buying"
  | "selling"
  | "payments"
  | "security";

interface FAQ {
  question: string;
  answer: string;
  category: Category;
}

const filterButtons: { id: Category; label: string }[] = [
  { id: "all", label: "All Topics" },
  { id: "account", label: "Account" },
  { id: "buying", label: "Buying" },
  { id: "selling", label: "Selling" },
  { id: "payments", label: "Payments" },
  { id: "security", label: "Security" },
];

const faqs: FAQ[] = [
  {
    category: "account",
    question: "How do I verify my business account?",
    answer:
      "To verify your business account, go to Settings > Account Verification and upload your business registration documents, tax ID, and proof of address. Verification typically takes 2-3 business days.",
  },
  {
    category: "account",
    question: "Can I change my account type from Buyer to Supplier?",
    answer:
      "Yes, you can upgrade your account to have multiple roles. Go to Settings > Account Type to switch roles.",
  },
  {
    category: "security",
    question: "How does the escrow protection work?",
    answer:
      "Our escrow service holds payment until you confirm receipt and satisfaction with the goods. Payment is only released to the supplier after your approval, ensuring secure transactions.",
  },
  {
    category: "buying",
    question: "What happens if I'm not satisfied with my purchase?",
    answer:
      "We offer dispute resolution services. Contact support within 48 hours of delivery, and we'll mediate between you and the supplier to reach a fair solution.",
  },
  {
    category: "selling",
    question: "How do I list surplus inventory?",
    answer:
      "Go to your Supplier Dashboard, click 'Add Listing', fill in product details, upload photos, set pricing, and publish. Our AI will help match you with potential buyers.",
  },
  {
    category: "selling",
    question: "What commission does Zeerostock charge?",
    answer:
      "We charge a 3-5% commission on successful transactions, depending on your membership tier. Premium members get reduced rates and additional benefits.",
  },
  {
    category: "payments",
    question: "When do I receive payment for my sales?",
    answer:
      "Payment is released within 24 hours after the buyer confirms receipt and satisfaction. Funds are transferred to your registered bank account within 1-2 business days.",
  },
  {
    category: "payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, credit cards, and digital wallets. International payments are processed through our secure banking partners.",
  },
  {
    category: "security",
    question: "How do you verify suppliers and buyers?",
    answer:
      "All users undergo KYB (Know Your Business) verification including business registration, financial checks, and identity verification. We also monitor transaction history and user ratings.",
  },
  {
    category: "security",
    question: "Is my business information secure?",
    answer:
      "Yes, we use bank-level encryption and comply with international data protection standards. Your information is never shared without explicit consent.",
  },
];

export default function FAQTab() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filteredFaqs =
    activeFilter === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeFilter);

  const handleFilterChange = (id: Category) => {
    setActiveFilter(id);
    setOpenFaqIndex(null);
  };

  return (
    <div className="overflow-hidden p-2 sm:p-3 md:p-4 lg:p-5">
      {/* FAQ Header */}
      <div className="mb-3 sm:mb-4 md:mb-[16px]">
        <h2 className="mb-1 sm:mb-2 md:mb-[4px] text-base sm:text-lg md:text-[15px] font-semibold text-[#0d1b2a]">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm md:text-[11px] font-medium text-[#9c9c9c]">
          Find answers to common questions about using Zeerotock
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 sm:mb-5 md:mb-[16px] flex flex-wrap gap-2 sm:gap-2.5 md:gap-[4px]">
        {filterButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleFilterChange(button.id)}
            className={`rounded-[7px] px-2 sm:px-3 md:px-[8px] py-1 sm:py-1.5 md:py-[4px] text-[7px] sm:text-[8px] md:text-[8px] font-medium transition-colors ${
              activeFilter === button.id
                ? "border border-[#2aae7a] bg-[#eeffef] text-[#2aae7a]"
                : "border border-gray-300 bg-white text-gray-600 hover:border-[#2aae7a] hover:text-[#2aae7a]"
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <motion.div layout className="space-y-2 sm:space-y-3 md:space-y-[8px]">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={faq.question}
                className="overflow-hidden rounded-[10px] bg-[#fbfbfb] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-3 sm:px-4 md:px-[16px] py-2 sm:py-3 md:py-[13px] text-left"
                >
                  <span className="text-xs sm:text-sm md:text-[13px] font-medium tracking-tight text-black pr-2">
                    {faq.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-[13px] md:w-[13px] shrink-0 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-[13px] md:w-[13px] shrink-0 text-gray-600" />
                  )}
                </button>

                {/* Animated Answer Section */}
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-3 sm:px-4 md:px-[16px] pb-2 sm:pb-3 md:pb-[13px]">
                        <p className="text-[9px] sm:text-[10px] md:text-[10px] font-medium leading-[12px] sm:leading-[13px] md:leading-[13px] tracking-tight text-[#9c9c9c]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[9px] sm:text-[10px] md:text-[10px] text-[#9c9c9c]"
            >
              No FAQs found for this category.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
