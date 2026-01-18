"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const faqs = [
    {
      question: "How quickly can I start selling?",
      answer:
        "You can list your inventory and start receiving inquiries within hours of account creation. Our verification process is streamlined to get you selling as quickly as possible.",
    },
    {
      question: "What are your service fees?",
      answer:
        "We offer transparent pricing with no hidden fees. Check our Pricing page for detailed information on all plan options.",
    },
    {
      question: "Do you provide training?",
      answer:
        "Yes, we offer comprehensive onboarding and training for all users, with additional advanced training for Enterprise clients.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-level security with 256-bit SSL encryption and are SOC 2 Type II certified.",
    },
  ];

  // SVG Icons
  const WhatsAppIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M14 0C6.268 0 0 6.268 0 14c0 2.468 0.648 4.788 1.784 6.8L0.092 27.908l7.296-1.912C9.316 27.28 11.576 28 14 28c7.732 0 14-6.268 14-14S21.732 0 14 0z"
          fill="#25D366"
        />
        <path
          d="M20.5 16.8c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-.95 1.2-.15.2-.3.225-.6.075-.3-.15-1.3-.48-2.475-1.53-.915-.82-1.53-1.83-1.71-2.13-.18-.3-.02-.465.13-.615.135-.135.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.7-1.68-.96-2.3-.255-.6-.51-.51-.7-.51h-.6c-.2 0-.525.075-.8.375s-1.05 1.025-1.05 2.5 1.075 2.9 1.225 3.1c.15.2 2.1 3.2 5.1 4.5.7.3 1.25.48 1.68.615.7.225 1.34.195 1.845.12.56-.09 1.8-.735 2.055-1.445.255-.71.255-1.32.18-1.445-.075-.12-.27-.195-.57-.345z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const GmailIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="white" />
      <path d="M12 16l12 9 12-9v-4l-12 9-12-9v4z" fill="#EA4335" />
      <path
        d="M36 32V16l-12 9-12-9v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2z"
        fill="#34A853"
      />
      <path
        d="M36 16v16l6-4V14c0-1.66-1.9-2.6-3.23-1.6L36 16z"
        fill="#FBBC04"
      />
      <path
        d="M12 16v16l-6-4V14c0-1.66 1.9-2.6 3.23-1.6L12 16z"
        fill="#4285F4"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      width="13.29"
      height="13.06"
      viewBox="0 0 26.572 26.114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.5 19.25v3.5c0 .97-.78 1.75-1.75 1.75-11.32 0-20.5-9.18-20.5-20.5C2.25 2.03 3.03 1.25 4 1.25h3.5c.97 0 1.75.78 1.75 1.75 0 1.38.23 2.71.66 3.96.17.5.02 1.06-.39 1.42l-2.19 1.94c1.61 3.06 4.17 5.62 7.23 7.23l1.94-2.19c.36-.41.92-.56 1.42-.39 1.25.43 2.58.66 3.96.66.97 0 1.75.78 1.75 1.75z"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 7L17.5 14L10.5 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="min-h-screen">
      {/* Main Content - Scaled to 50% */}
      <div className="w-[720px] mx-auto px-[40px] py-[6px]">
        {/* Header */}
        <div className="text-center mb-[44.5px] mt-[27.5px]">
          <h1 className="font-semibold text-[20px] text-[#0D1B2A] leading-[30px] mb-[7px]">
            Get in Touch
          </h1>
          <p className="font-medium text-[12px] text-[#9C9C9C] leading-[14.5px]">
            Have questions? We&apos;re here to help. Choose your preferred way
            to reach us.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-[17.5px] mb-[12.5px]">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px] min-h-[460px] w-[413px]">
            <h2 className="font-semibold text-[12px] text-[#0D1B2A] leading-normal mb-[5.5px]">
              Send us a message
            </h2>
            <p className="font-medium text-[9px] text-[#9C9C9C] leading-normal mb-[30px]">
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>

            <form className="space-y-0" onSubmit={(e) => e.preventDefault()}>
              {/* Name Row */}
              <div className="flex gap-[22.5px] mb-[16px]">
                <div className="flex-1">
                  <label className="block font-medium text-[8.5px] text-[#0D1B2A] leading-normal mb-[8px]">
                    First Name<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full h-[28px] px-[8px] border border-[#BEBEBE] rounded-[5px] text-[8px] text-[#9C9C9C] placeholder:text-[#9C9C9C] focus:outline-none focus:ring-1 focus:ring-[#0D1B2A] focus:border-[#0D1B2A]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-medium text-[8.5px] text-[#0D1B2A] leading-normal mb-[8px]">
                    Last Name<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full h-[28px] px-[8px] border border-[#BEBEBE] rounded-[5px] text-[8px] text-[#9C9C9C] placeholder:text-[#9C9C9C] focus:outline-none focus:ring-1 focus:ring-[#0D1B2A] focus:border-[#0D1B2A]"
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="flex gap-[22.5px] mb-[16px]">
                <div className="flex-1">
                  <label className="block font-medium text-[8.5px] text-[#0D1B2A] leading-normal mb-[8px]">
                    Email Address<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="xyz@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full h-[28px] px-[8px] border border-[#BEBEBE] rounded-[5px] text-[8px] text-[#9C9C9C] placeholder:text-[#9C9C9C] focus:outline-none focus:ring-1 focus:ring-[#0D1B2A] focus:border-[#0D1B2A]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-medium text-[8.5px] text-[#0D1B2A] leading-normal mb-[8px]">
                    Phone Number<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 8088808008"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full h-[28px] px-[8px] border border-[#BEBEBE] rounded-[5px] text-[8px] text-[#9C9C9C] placeholder:text-[#9C9C9C] focus:outline-none focus:ring-1 focus:ring-[#0D1B2A] focus:border-[#0D1B2A]"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="mb-[16px]">
                <label className="block font-medium text-[8.5px] text-[#0D1B2A] leading-normal mb-[8px]">
                  Company Name<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Company Ltd."
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full h-[28px] px-[8px] border border-[#BEBEBE] rounded-[5px] text-[8px] text-[#9C9C9C] placeholder:text-[#9C9C9C] focus:outline-none focus:ring-1 focus:ring-[#0D1B2A] focus:border-[#0D1B2A]"
                />
              </div>

              {/* Message */}
              <div className="mb-[30px]">
                <label className="block font-medium text-[8.5px] text-[#0D1B2A] leading-normal mb-[8px]">
                  Message<span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Details about your inquiry, including any questions or requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full h-[65px] px-[8px] py-[6px] border border-[#BEBEBE] rounded-[5px] text-[8px] text-[#9C9C9C] placeholder:text-[#9C9C9C] focus:outline-none focus:ring-1 focus:ring-[#0D1B2A] focus:border-[#0D1B2A] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-[120px] h-[32.5px] bg-[#1E3A8A] text-white font-semibold text-[10px] leading-[11px] rounded-[6px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center gap-[5px]"
              >
                Send Message
                <ArrowRightIcon />
              </button>
            </form>
          </div>

          {/* Right Column - Quick Contact */}
          <div className="flex flex-col gap-[12.5px]">
            {/* WhatsApp Business */}
            <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px] h-[147.5px] w-[208.5px] relative">
              <div className="absolute left-[15px] top-[15px] bg-[#F4F2ED] p-[5px] rounded-[6px]">
                <WhatsAppIcon />
              </div>
              <h3 className="absolute left-[46.5px] top-[26.75px] -translate-y-1/2 font-semibold text-[11px] text-[#0D1B2A] leading-normal">
                WhatsApp Business
              </h3>
              <p className="absolute left-[15px] top-[58px] -translate-y-1/2 font-medium text-[9px] text-[#9C9C9C] leading-normal w-[172px]">
                Get instant responses via WhatsApp
              </p>
              <p className="absolute left-[15px] top-[79.25px] -translate-y-1/2 font-medium text-[11px] text-[#0D1B2A] leading-normal">
                +91 89568 35375
              </p>
              <button className="absolute left-[15px] top-[105px] w-[178.5px] h-[27.5px] bg-[#128C7E] text-white font-semibold text-[10px] leading-[11px] rounded-[6px] hover:bg-[#128C7E]/90 transition-colors">
                Chat on WhatsApp
              </button>
            </div>

            {/* Email Support */}
            <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px] h-[147.5px] w-[208.5px] relative">
              <div className="absolute left-[15px] top-[15px]">
                <GmailIcon />
              </div>
              <h3 className="absolute left-[46.5px] top-[26.75px] -translate-y-1/2 font-semibold text-[11px] text-[#0D1B2A] leading-normal">
                Email Support
              </h3>
              <p className="absolute left-[15px] top-[58px] -translate-y-1/2 font-medium text-[9px] text-[#9C9C9C] leading-normal w-[172px]">
                Send us a detailed mesage
              </p>
              <p className="absolute left-[15px] top-[79.25px] -translate-y-1/2 font-medium text-[11px] text-[#0D1B2A] leading-normal">
                contact@zeerostock.com
              </p>
              <button className="absolute left-[15px] top-[105px] w-[178.5px] h-[27.5px] bg-white border border-[#9C9C9C] text-[#9C9C9C] font-semibold text-[10px] leading-[11px] rounded-[6px] hover:bg-gray-50 transition-colors">
                Send Email
              </button>
            </div>

            {/* Phone Support */}
            <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px] h-[147.5px] w-[208.5px] relative">
              <div className="absolute left-[15px] top-[15px] bg-[#F4F2ED] p-[5px] rounded-[6px]">
                <PhoneIcon />
              </div>
              <h3 className="absolute left-[46.5px] top-[26.75px] -translate-y-1/2 font-semibold text-[11px] text-[#0D1B2A] leading-normal">
                Phone Support
              </h3>
              <p className="absolute left-[15px] top-[58px] -translate-y-1/2 font-medium text-[9px] text-[#9C9C9C] leading-normal w-[172px]">
                Speak with our team directly
              </p>
              <p className="absolute left-[15px] top-[79.25px] -translate-y-1/2 font-medium text-[11px] text-[#0D1B2A] leading-normal">
                +91 89568 35375
              </p>
              <button className="absolute left-[15px] top-[105px] w-[178.5px] h-[27.5px] bg-white border border-[#9C9C9C] text-[#9C9C9C] font-semibold text-[10px] leading-[11px] rounded-[6px] hover:bg-gray-50 transition-colors">
                Call Now
              </button>
            </div>
          </div>
        </div>

        {/* Become an Agent Banner */}
        <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] h-[64px] mb-[46.5px] relative">
          <h3 className="absolute left-[12.5px] top-[19px] -translate-y-1/2 font-medium text-[12px] text-[#0D1B2A] leading-normal">
            Become an Agent
          </h3>
          <p className="absolute left-[12.5px] top-[44px] -translate-y-1/2 font-medium text-[9px] text-[#9C9C9C] leading-normal w-[243.5px]">
            Be a verified Zeerstock agent and unlock exclusive commissions.
          </p>
          <Link href={"/partner-agent"}>
            <button className="absolute right-[17.5px] top-1/2 -translate-y-1/2 w-[120px] h-[32.5px] bg-[#1E3A8A] text-white font-semibold text-[10px] leading-[11px] rounded-[6px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center gap-[5px]">
              Join as a Agent
              <ArrowRightIcon />
            </button>
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mt-[64.5px] mb-[34.5px]">
          <div className="text-center mb-[37.5px]">
            <h2 className="font-semibold text-[26px] text-[#0D1B2A] leading-[39px] mb-[7.5px] tracking-[0.25px]">
              Frequently Asked Questions
            </h2>
            <p className="font-medium text-[10.5px] text-[#9C9C9C] leading-[12.5px]">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-[19px] gap-y-[11.5px]">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px] min-h-[98px]"
              >
                <h3 className="font-medium text-[13px] text-[#0D1B2A] leading-[14px] tracking-[0.25px] mb-[11px]">
                  {faq.question}
                </h3>
                <p className="font-medium text-[10px] text-[#9C9C9C] leading-[14px]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#2AAE7A] rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] h-[170px] relative px-[79.5px] py-[25px]">
          <div className="text-center">
            <h2 className="font-semibold text-[22.5px] text-white leading-normal mb-[10px]">
              Need Immediate Assistance?
            </h2>
            <p className="font-semibold text-[11px] text-[#374151] leading-normal mb-[27.5px]">
              Our support team is standing by to help you succeed with
              Zeerostock.
            </p>
            <div className="flex items-center justify-center gap-[45px]">
              <Link href="/helpdesk">
                <button className="w-[145px] h-[35px] bg-[#1E3A8A] text-white font-medium text-[11px] leading-normal rounded-[6px] hover:bg-[#1e3a8a]/90 transition-colors">
                  Chat with support
                </button>
              </Link>
              <Link href="/helpdesk">
                <button className="w-[145px] h-[35px] bg-white text-[#2AAE7A] font-medium text-[11px] leading-[11px] rounded-[6px] hover:bg-gray-50 transition-colors">
                  Schedule call
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
