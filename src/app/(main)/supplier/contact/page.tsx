"use client";

import { MessageCircle, Mail, Phone, ChevronRight } from "lucide-react";
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
      question: "How quickly can I get started?",
      answer:
        "You can create an account and start browsing inventory within minutes. Full verification typically takes 24-48 hours.",
    },
    {
      question: "What are your service fees?",
      answer:
        "We offer transparent pricing with no hidden fees. Check our Pricing page for detailed information on all plan options.",
    },
    {
      question: "Do you provide training?",
      answer:
        "Yes, we offer comprehensive onboarding and training for all users. Enterprise clients receive dedicated training for their teams.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-level security with 256-bit SSL encryption and are SOC 2 Type II certified.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Get in Touch
          </h1>
          <p className="text-sm text-gray-600">
            Have questions? We&apos;re here to help. Choose your preferred way
            to reach us.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>

            <form className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    placeholder="smith@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Company Name*
                </label>
                <input
                  type="text"
                  placeholder="Acme Company Ltd"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Message*
                </label>
                <textarea
                  rows={4}
                  placeholder="Please tell us your inquiry, including any questions or requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column - Quick Contact */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Contact
            </h2>

            <div className="space-y-6">
              {/* WhatsApp Business */}
              <div className="border border-gray-300 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 border border-green-300 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      WhatsApp Business
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Get instant responses via WhatsApp
                    </p>
                    <p className="text-sm font-medium text-gray-900 mb-3">
                      +91 91 6783408823
                    </p>
                    <button className="w-full py-2 bg-white border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors">
                      Chat on WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Support */}
              <div className="border border-gray-300 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 border border-blue-300 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Email Support
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Send us a detailed message
                    </p>
                    <p className="text-sm font-medium text-gray-900 mb-3">
                      support@zeerostock.com
                    </p>
                    <button className="w-full py-2 bg-white border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors">
                      Send Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone Support */}
              <div className="border border-gray-300 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 border border-red-300 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Phone Support
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Speak with our team directly
                    </p>
                    <p className="text-sm font-medium text-gray-900 mb-3">
                      +91 91 6783408823
                    </p>
                    <button className="w-full py-2 bg-white border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors">
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Need Immediate Assistance?
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Our support team is standing by to help you succeed with Zeerostock.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Chat with support
            </button>
            <button className="px-8 py-3 bg-white border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors">
              Schedule call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
