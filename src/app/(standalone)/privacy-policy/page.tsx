"use client";

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "user-accounts", label: "User Accounts & Eligibility" },
    { id: "marketplace", label: "Marketplace Policies" },
    { id: "buying-rules", label: "Buying Rules" },
    { id: "selling-rules", label: "Selling Rules" },
    { id: "payment-fees", label: "Payment & Fees" },
    { id: "shipping", label: "Shipping & Logistics" },
    { id: "intellectual", label: "Intellectual Property" },
    { id: "liabilities", label: "Liabilities & Limitations" },
    { id: "termination", label: "Termination of Service" },
    { id: "governing-law", label: "Governing Law" },
    { id: "contact", label: "Contact Information" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#eefbf6]">
      {/* Hero Section with Gradient */}
      <div
        className="h-[100px] sm:h-[115px] md:h-[130px] overflow-hidden"
        style={{
          background:
            "linear-gradient(179.81deg, rgb(208, 255, 237) 0.93%, rgb(255, 255, 255) 99.09%)",
        }}
      >
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-9 md:pt-12">
          <h1 className="text-[20px] sm:text-[25px] md:text-[30px] font-semibold leading-normal mb-1 sm:mb-1.5 md:mb-2 text-[#0d1b2a]">
            Privacy Policy
          </h1>
          <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#9c9c9c]">
            Understand how Zeerostock collects, uses, stores and protects your
            data
          </p>
        </div>
      </div>

      {/* Last Updated Banner */}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mt-4 sm:mt-6 md:mt-9">
        <div className="bg-white rounded-[5px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] h-auto sm:h-[57.5px] px-3 sm:px-[15px] py-2.5 sm:py-0 flex flex-col justify-center">
          <p className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-black mb-0.5 sm:mb-1">
            <span className="inline-block">Last Updated:</span>{" "}
            <span className="font-medium text-[#9c9c9c]">October 26, 2024</span>
          </p>
          <p className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-black">
            <span className="inline-block">Applies To:</span>{" "}
            <span className="font-medium text-[#9c9c9c]">
              Buyers, Suppliers and Partners on Zeerostock
            </span>
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mt-4 sm:mt-6 md:mt-8 pb-6 sm:pb-8 md:pb-10 flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Left Sidebar - On This Page */}
        <div className="w-full lg:w-[159px] shrink-0 hidden lg:block">
          <div className="bg-white rounded-[10px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] p-2.5 sticky top-[20px]">
            <h3 className="text-[11px] font-semibold text-black pb-1.5 mb-2 border-b border-[#e5e7eb]">
              On This Page
            </h3>
            <nav className="space-y-1">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-2.5 py-1.5 text-[10px] font-medium rounded-[5px] transition-colors ${
                    index === 0
                      ? "bg-[#eeffef] text-[#2aae7a]"
                      : "text-black hover:bg-gray-50"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Key Points Grid - 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-4 sm:mb-5 md:mb-6">
            <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[10px] p-2 sm:p-2.5 h-auto sm:h-[103.5px]">
              <svg
                className="w-3 h-3 mb-2 sm:mb-4"
                fill="none"
                stroke="#1e3a8a"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <h3 className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[#1e3a8a] mb-1 sm:mb-1.5">
                Transparency
              </h3>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-normal">
                We are clear about what data we collect and why.
              </p>
            </div>

            <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[10px] p-2 sm:p-2.5 h-auto sm:h-[103.5px]">
              <svg
                className="w-3 h-3 mb-2 sm:mb-4"
                fill="none"
                stroke="#1e3a8a"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[#1e3a8a] mb-1 sm:mb-1.5">
                Data Protection
              </h3>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-normal">
                We are committed to safeguarding your personal and business
                data.
              </p>
            </div>

            <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[10px] p-2 sm:p-2.5 h-auto sm:h-[103.5px]">
              <svg
                className="w-3 h-3 mb-2 sm:mb-4"
                fill="none"
                stroke="#1e3a8a"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[#1e3a8a] mb-1 sm:mb-1.5">
                Compliance
              </h3>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-normal">
                We adhere to global standards like GDPR to protect your rights.
              </p>
            </div>

            <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[10px] p-2 sm:p-2.5 h-auto sm:h-[103.5px]">
              <svg
                className="w-3 h-3 mb-2 sm:mb-4"
                fill="none"
                stroke="#1e3a8a"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <h3 className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[#1e3a8a] mb-1 sm:mb-1.5">
                User Control
              </h3>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-normal">
                You have control over your data with easy-to-use tools.
              </p>
            </div>
          </div>

          {/* Introduction Section */}
          <section
            id="introduction"
            className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-5 md:mb-6"
          >
            <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
              Introduction
            </h2>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              Welcome to Zeerostock. We are committed to protecting your privacy
              and ensuring transparency in how we handle your data. This Privacy
              Policy outlines our practices concerning the collection, use, and
              sharing of your personal and business information. Our goal is to
              provide a secure and trustworthy B2B marketplace.
            </p>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              This policy details our responsibilities and your rights regarding
              your data when you use our services. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-[#1e3a8a] mb-0.5 sm:mb-1">
              Information We Collect
            </h3>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px] mb-1.5 sm:mb-2">
              To provide and improve our services, we collect several types of
              information:
            </p>
            <div>
              <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-[#1e3a8a] mb-0.5">
                Personal & Business Data
              </h4>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px] mb-1.5 sm:mb-2">
                This includes your name, email, contact details, company name,
                and role. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-[#1e3a8a] mb-0.5">
                Transactional Data
              </h4>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                Details about quotes, orders, payments, and shipping information
                you conduct through the platform. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section
            id="how-we-use"
            className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6"
          >
            <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
              How We Use Your Information
            </h2>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              Your data is used to operate, maintain, and enhance the Zeerostock
              platform. This includes facilitating transactions, personalizing
              your experience, and for analytics. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </section>

          {/* Data Sharing Policy */}
          <section className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-[#1e3a8a]">
              Data Sharing Policy
            </h3>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              We do not sell your personal data. We may share information with
              verified suppliers, logistics partners, and payment processors to
              fulfill transactions. All third parties are contractually
              obligated to protect your data. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </section>

          {/* Cookies & Tracking */}
          <section
            id="cookies"
            className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6"
          >
            <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
              Cookies & Tracking
            </h2>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              We use cookies to improve functionality and for analytics. You can
              manage your cookie preferences through your browser settings. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>

          {/* Data Security Measures */}
          <section className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-[#1e3a8a]">
              Data Security Measures
            </h3>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              We implement robust security measures, including SSL encryption
              and secure server architecture, to protect your data from
              unauthorized access. Our practices are compliant with industry
              standards like PCI-DSS for payment information.
            </p>
          </section>

          {/* User Rights & Controls */}
          <section
            id="user-rights"
            className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6"
          >
            <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
              User Rights & Controls
            </h2>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              You have the right to access, modify, or delete your personal
              information. You can also export your data or withdraw consent for
              its use at any time by contacting our support team.
            </p>
          </section>

          {/* Data Retention */}
          <section className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-[#1e3a8a]">
              Data Retention
            </h3>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              We retain your data only for as long as necessary to provide our
              services and comply with legal obligations. Specific retention
              timelines are determined by the nature of the data and regulatory
              requirements.
            </p>
          </section>

          {/* Compliance & Certifications */}
          <section
            id="compliance"
            className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6"
          >
            <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
              Compliance & Certifications
            </h2>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              Zeerostock is committed to global data protection standards. We
              are compliant with GDPR and adhere to principles outlined in SOC 2
              standards to ensure the security and privacy of your data.
            </p>
          </section>

          {/* Contact Information Box */}
          <section
            id="contact"
            className="bg-white rounded-[10px] p-2.5 sm:p-3 mb-4 sm:mb-5 md:mb-6 space-y-1.5 sm:space-y-2"
          >
            <h3 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
              Contact Information
            </h3>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
              For any questions or requests regarding your data, please contact
              us.
            </p>
            <div className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px] space-y-0.5">
              <p>
                <span className="font-semibold text-black">Email:</span>{" "}
                privacy@zeerostock.com
              </p>
              <p>
                <span className="font-semibold text-black">Address:</span> 123
                Enterprise Way, Suite 456, Innovation City,Nashik
              </p>
              <p>
                <span className="font-semibold text-black">Support Hours:</span>{" "}
                Monday - Friday, 9 AM - 5 PM UTC
              </p>
            </div>
          </section>

          {/* CTA Box */}
          <div className="bg-[#2aae7a] rounded-[15px] p-4 sm:p-5 md:p-6 text-center">
            <h3 className="text-[16px] sm:text-[19px] md:text-[22.5px] font-semibold text-white mb-2 sm:mb-2.5">
              Have Questions About Your Privacy?
            </h3>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[#374151] mb-4 sm:mb-5 md:mb-6">
              Our team is here to help. Reach out to our support specialists or
              consult our detailed guide on data requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-11 justify-center">
              <button className="bg-[#1e3a8a] text-white px-8 sm:px-11 md:px-14 py-1.5 sm:py-2 rounded-md text-[9px] sm:text-[10px] md:text-[11px] font-medium hover:bg-[#1a3379] transition-colors">
                Contact Support
              </button>
              <button className="bg-white text-[#2aae7a] px-8 sm:px-11 md:px-14 py-1.5 sm:py-2 rounded-md text-[9px] sm:text-[10px] md:text-[11px] font-medium hover:bg-gray-50 transition-colors">
                View Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
