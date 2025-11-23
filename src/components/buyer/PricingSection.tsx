import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Only pay when you make successful purchases
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border-2 border-gray-900 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">Free</div>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Upto 5 RFQs per month</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Basic supplier data</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Standard verification</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Email support</span>
              </li>
            </ul>
            <Link
              href="/signup"
              className="block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
          <div className="bg-white p-8 border-2 border-gray-900 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Professional
            </h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ₹14,999/Year
            </div>
            <p className="text-gray-600 mb-6">For growing businesses</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Unlimited RFQs</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Advanced matching</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Advanced analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Bulk tools</span>
              </li>
            </ul>
            <Link
              href="/signup?plan=professional"
              className="block text-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
          <div className="bg-white p-8 border-2 border-gray-900 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Enterprise
            </h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
            <p className="text-gray-600 mb-6">For established buyers</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Custom integration</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">White-label options</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">24/7 phone support</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-900 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">API access</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
