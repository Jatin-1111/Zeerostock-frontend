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
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="mx-auto px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Understand how Zeerostock collects, uses, stores and protects your
            data
          </p>
        </div>
      </div>

      {/* Last Updated Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-8 py-6">
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <p className="text-sm text-gray-900">
              <span className="font-semibold">Last Updated:</span> October 28,
              2024
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Applies To:</span> Buyers,
              Suppliers and Partners on Zeerostock
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="mx-auto px-8 py-12">
        <div className="flex gap-12">
          {/* Left Sidebar - On This Page */}
          <div className="w-[300px] shrink-0">
            <div className="sticky top-8 border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-3 border-b border-gray-300">
                On This Page
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Key Points Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-300 rounded-lg p-6">
                <div className="w-10 h-10 flex items-center justify-center mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
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
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Transparency
                </h3>
                <p className="text-sm text-gray-600">
                  We are clear about what data we collect and why
                </p>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <div className="w-10 h-10 flex items-center justify-center mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Data Protection
                </h3>
                <p className="text-sm text-gray-600">
                  We are committed to safeguarding your personal and business
                  data
                </p>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <div className="w-10 h-10 flex items-center justify-center mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Compliance
                </h3>
                <p className="text-sm text-gray-600">
                  We adhere to global standards like GDPR to protect your rights
                </p>
              </div>

              <div className="border border-gray-300 rounded-lg p-6">
                <div className="w-10 h-10 flex items-center justify-center mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  User Control
                </h3>
                <p className="text-sm text-gray-600">
                  You have full power over your data with easy-to-use tools
                </p>
              </div>
            </div>

            {/* Introduction Section */}
            <section id="introduction" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Introduction
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                Welcome to Zeerostock. We are committed to protecting your
                privacy and ensuring transparency in how we use your data. This
                Privacy Policy describes our practices concerning the
                collection, use, and sharing of your personal and business
                information. Our goal is to provide a secure and trustworthy
                environment for all marketplace users, as well as communicate
                clearly regarding your data when you use our services. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                accumsan sit labore et dolore magna aliqua.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Information We Collect
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  To provide and improve our services, we collect several types
                  of information:
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Personal & Business Data
                    </h4>
                    <p className="text-base text-gray-700">
                      This includes your name, email, contact details, company
                      name, and role. UI enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Transaction Data
                    </h4>
                    <p className="text-base text-gray-700">
                      Details about quotes, orders, payments, and transactions
                      on the platform. Duis aute irure dolor in reprehenderit in
                      voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  How We Use Your Information
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Your data is used to operate, maintain, and enhance the
                  Zeerostock platform. This includes facilitating transactions,
                  personalizing your experience, and for analytics. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Data Sharing Policy
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  We do not sell your personal data. We may share information
                  with verified suppliers, logistics partners, and payment
                  processors to fulfill transactions. All third parties are
                  contractually obligated to protect your data. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Cookies & Tracking
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  We use cookies to improve functionality and for analytics. You
                  can manage your cookie preferences through your browser
                  settings. Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Data Security Measures
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  We implement robust security measures, including SSL
                  encryption and secure server architecture, to protect your
                  data from unauthorized access. However, no system is perfectly
                  secure. Our practices are compliant with industry standards
                  like SOC 2 and PCI DSS for payment information.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  User Rights & Controls
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  You have the rights to access, modify, or delete your personal
                  information. You can also export your data or withdraw consent
                  for the use of any time by contacting our support team.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Data Retention
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  We retain your data only for as long as necessary to provide
                  our services and comply with legal obligations. Specific
                  retention timelines are determined by the nature of the data
                  and legal requirements.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Compliance & Certifications
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Zeerostock is committed to global data protection standards.
                  We are compliant with GDPR and adhere to principles outlined
                  in SOC 2 standards to ensure the security and privacy of your
                  data.
                </p>
              </div>

              {/* Contact Information Box */}
              <div className="bg-white border border-gray-300 rounded-lg p-6 space-y-3">
                <h4 className="text-xl font-bold text-gray-900">
                  Contact Information
                </h4>
                <p className="text-base text-gray-700">
                  For any questions or requests regarding your data, please
                  contact us.
                </p>
                <div className="text-base text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    privacy@zeerostock.com
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> 123
                    Enterprise Way, Suite 456, Innovation City Nashville
                  </p>
                  <p>
                    <span className="font-semibold">Support Hours:</span> Monday
                    - Friday, 9 AM - 5 PM UTC
                  </p>
                </div>
              </div>
            </section>

            {/* Question Box */}
            <div className="border border-gray-300 rounded-lg p-8 mt-12 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Have Questions About Your Privacy?
              </h3>
              <p className="text-base text-gray-600 mb-6 text-center">
                Our team is here to help. Reach out to our support specialists
                or consult our detailed guide on data requests.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button className="px-6 py-3 bg-gray-900 text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                  Contact Support
                </button>
                <button className="px-6 py-3 border border-gray-900 text-gray-900 text-base font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  View Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
