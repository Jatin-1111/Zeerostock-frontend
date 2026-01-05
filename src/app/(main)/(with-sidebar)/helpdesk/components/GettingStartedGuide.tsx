"use client";

import { useState, useMemo } from "react";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GettingStartedGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GettingStartedGuide({
  isOpen,
  onClose,
}: GettingStartedGuideProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Define sections for filtering
  const sections = useMemo(
    () => [
      {
        id: 1,
        title: "What is Zeerostock?",
        content:
          "Zeerostock is a premier B2B marketplace designed to connect buyers and suppliers of surplus industrial inventory. Our platform provides a secure, efficient, and transparent environment for businesses to discover new opportunities, manage transactions, and optimize their supply chain.",
      },
      {
        id: 2,
        title: "Create Your Account",
        content:
          "Joining Zeerostock is simple. Follow these steps to set up your business profile: Go to Signup Navigate to our registration page and select whether you are a buyer or a supplier. Provide Business Details Fill in your company name, contact information, and business address. Verify Email Click the verification link sent to your registered email address to activate your account. Complete GST/Company Setup In your dashboard, complete your profile by adding your GST number and other required company documentation for full verification.",
      },
      {
        id: 3,
        title: "How to Browse Inventory",
        content:
          "Find the products you need with our powerful search and filtering tools: Search Bar Use keywords, product codes, or brand names in the main search bar for direct results. Category Navigation Explore our structured categories to discover inventory in specific industrial sectors. Filters and Sorting Refine your search results by location, price, condition, and supplier rating to find the perfect match for your requirements.",
      },
      {
        id: 4,
        title: "Posting RFQs (for Buyers)",
        content:
          "If you can't find what you're looking for, submit a Request for Quote (RFQ) to our network of suppliers: How to Create an RFQ From your dashboard, click 'Create RFQ' and specify the product details, technical specifications, and required documentation. Setting Quantity & Delivery Define the quantity needed and your preferred delivery timeline and location. Accepting / Declining Quotes Review quotes from suppliers, communicate directly for clarification, and accept the offer that best meets your needs.",
      },
      {
        id: 5,
        title: "Listing Surplus Inventory (for Suppliers)",
        content:
          "Turn your excess stock into capital by listing it on Zeerostock: Uploading Product Details Create a new listing with clear photos, accurate descriptions, technical data sheets, and condition reports. Pricing Options Set a fixed price, or enable 'Make an Offer' to invite negotiations from interested buyers. Visibility Tips Complete your company profile and maintain a high supplier rating to increase trust and visibility.",
      },
      {
        id: 6,
        title: "Payments & Orders",
        content:
          "We ensure all transactions are secure and transparent from start to finish: Secure Escrow All payments are held in a secure escrow account and are released to the supplier only after the buyer confirms successful delivery. Order Tracking Monitor the status of your order from payment to shipment and delivery directly from your dashboard. Invoices & Download Options Access and download all transaction invoices and order-related documents for your records.",
      },
    ],
    []
  );

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;

    const query = searchQuery.toLowerCase();
    return sections.filter(
      (section) =>
        section.title.toLowerCase().includes(query) ||
        section.content.toLowerCase().includes(query)
    );
  }, [searchQuery, sections]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full overflow-y-auto bg-white shadow-2xl"
            style={{ width: "697.5px", maxWidth: "90vw" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-[16.875px] top-[16.875px] z-10 flex h-[25.3125px] w-[25.3125px] items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100"
            >
              <X className="h-[13.5px] w-[13.5px] text-[#0d1b2a]" />
            </button>

            {/* Content */}
            <div className="p-[22.5px]">
              {/* Header */}
              <h1 className="mb-[5.625px] text-[21.375px] font-semibold leading-none text-[#0d1b2a]">
                Getting Started Guide
              </h1>

              <p className="mb-[16.875px] text-[13.5px] font-medium leading-normal text-[#9c9c9c]">
                Learn how to start using Zeerostock efficiently within minutes.
              </p>

              {/* Green Info Box */}
              <div
                className="mb-[22.5px] flex items-center justify-center rounded-[11.25px] bg-[#eeffef]"
                style={{ height: "95.625px" }}
              >
                <div className="text-center">
                  <div className="mb-[5.625px] text-[28.125px]">🚀</div>
                  <p className="text-[13.5px] font-medium leading-none text-[#2aae7a]">
                    Your Journey to Efficient B2B Trading Starts Here
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div
                className="mb-[22.5px] flex items-center justify-between rounded-[11.25px] bg-[rgba(235,235,235,0.65)] px-[14.0625px] shadow-[0px_0px_1.6875px_0px_rgba(0,0,0,0.4)]"
                style={{ height: "36.5625px" }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for guide...."
                  className="flex-1 bg-transparent text-[10.6875px] font-medium text-[#374151] outline-none placeholder:text-[#374151] placeholder:opacity-80"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <div className="flex items-center gap-[5.625px]">
                  <div className="h-[25.3125px] w-[1.125px] bg-gray-300"></div>
                  <Search className="h-[13.5px] w-[13.5px] text-[#374151] opacity-80" />
                  <p className="text-[13.5px] font-medium text-[#374151] opacity-80">
                    Search
                  </p>
                </div>
              </div>

              {/* Sections */}
              {filteredSections.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[60px]">
                  <p
                    className="text-[13.5px] font-medium text-[#9c9c9c]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    No results found matching your search.
                  </p>
                </div>
              ) : (
                <>
                  {filteredSections.includes(sections[0]) && (
                    <div className="mb-[22.5px]">
                      <h2 className="mb-[11.25px] text-[21.375px] font-semibold leading-none text-[#0d1b2a]">
                        1. What is Zeerostock?
                      </h2>
                      <p className="mb-[16.875px] text-[13.5px] font-medium leading-[22.5px] text-[#9c9c9c]">
                        Zeerostock is a premier B2B marketplace designed to
                        connect buyers and suppliers of surplus industrial
                        inventory. Our platform provides a secure, efficient,
                        and transparent environment for businesses to discover
                        new opportunities, manage transactions, and optimize
                        their supply chain.
                      </p>
                      <div className="h-[1.125px] w-full bg-gray-200"></div>
                    </div>
                  )}

                  {filteredSections.includes(sections[1]) && (
                    <div className="mb-[22.5px]">
                      <h2 className="mb-[11.25px] text-[21.375px] font-semibold leading-none text-[#0d1b2a]">
                        2. Create Your Account
                      </h2>
                      <p className="mb-[11.25px] text-[13.5px] font-medium leading-normal text-[#9c9c9c]">
                        Joining Zeerostock is simple. Follow these steps to set
                        up your business profile:
                      </p>
                      <ol className="mb-[16.875px] list-decimal space-y-[5.625px] pl-[20.25px] text-[13.5px] font-medium leading-[25.3125px] text-[#9c9c9c]">
                        <li>
                          <span className="text-black">Go to Signup:</span>{" "}
                          Navigate to our registration page and select whether
                          you are a buyer or a supplier.
                        </li>
                        <li>
                          <span className="text-black">
                            Provide Business Details
                          </span>
                          : Fill in your company name, contact information, and
                          business address.
                        </li>
                        <li>
                          <span className="text-black">Verify Email:</span>{" "}
                          Click the verification link sent to your registered
                          email address to activate your account.
                        </li>
                        <li>
                          <span className="text-black">
                            Complete GST/Company Setup:
                          </span>{" "}
                          In your dashboard, complete your profile by adding
                          your GST number and other required company
                          documentation for full verification.
                        </li>
                      </ol>
                      <div className="h-[1.125px] w-full bg-gray-200"></div>
                    </div>
                  )}

                  {filteredSections.includes(sections[2]) && (
                    <div className="mb-[22.5px]">
                      <h2 className="mb-[11.25px] text-[21.375px] font-semibold leading-none text-[#0d1b2a]">
                        3. How to Browse Inventory
                      </h2>
                      <p className="mb-[11.25px] text-[13.5px] font-medium leading-normal text-[#9c9c9c]">
                        Find the products you need with our powerful search and
                        filtering tools:
                      </p>
                      <ol className="mb-[16.875px] list-decimal space-y-[5.625px] pl-[20.25px] text-[13.5px] font-medium leading-[25.3125px] text-black">
                        <li>
                          Search Bar:{" "}
                          <span className="text-[#9c9c9c]">
                            Use keywords, product codes, or brand names in the
                            main search bar for direct results.
                          </span>
                        </li>
                        <li>
                          Category Navigation:{" "}
                          <span className="text-[#9c9c9c]">
                            Explore our structured categories to discover
                            inventory in specific industrial sectors.
                          </span>
                        </li>
                        <li>
                          Filters and Sorting:{" "}
                          <span className="text-[#9c9c9c]">
                            Refine your search results by location, price,
                            condition, and supplier rating to find the perfect
                            match for your requirements
                          </span>
                        </li>
                      </ol>
                      <div className="h-[1.125px] w-full bg-gray-200"></div>
                    </div>
                  )}

                  {filteredSections.includes(sections[3]) && (
                    <div className="mb-[22.5px]">
                      <h2 className="mb-[11.25px] text-[21.375px] font-semibold leading-none text-[#0d1b2a]">
                        4. Posting RFQs (for Buyers)
                      </h2>
                      <p className="mb-[11.25px] text-[13.5px] font-medium leading-normal text-[#9c9c9c]">
                        If you can&apos;t find what you&apos;re looking for,
                        submit a Request for Quote (RFQ) to our network of
                        suppliers:
                      </p>
                      <ol className="mb-[16.875px] list-decimal space-y-[5.625px] pl-[20.25px] text-[13.5px] font-medium leading-[25.3125px] text-black">
                        <li>
                          How to Create an RFQ:{" "}
                          <span className="text-[#9c9c9c]">
                            From your dashboard, click &apos;Create RFQ&apos;
                            and specify the product details, technical
                            specifications, and required documentation.
                          </span>
                        </li>
                        <li>
                          Setting Quantity & Delivery:{" "}
                          <span className="text-[#9c9c9c]">
                            Define the quantity needed and your preferred
                            delivery timeline and location.
                          </span>
                        </li>
                        <li>
                          Accepting / Declining Quotes:{" "}
                          <span className="text-[#9c9c9c]">
                            Review quotes from suppliers, communicate directly
                            for clarification, and accept the offer that best
                            meets your needs.
                          </span>
                        </li>
                      </ol>
                      <div className="h-[1.125px] w-full bg-gray-200"></div>
                    </div>
                  )}

                  {filteredSections.includes(sections[4]) && (
                    <div className="mb-[22.5px]">
                      <h2 className="mb-[11.25px] text-[21.375px] font-semibold leading-none text-[#0d1b2a]">
                        5. Listing Surplus Inventory (for Suppliers)
                      </h2>
                      <p className="mb-[11.25px] text-[13.5px] font-medium leading-normal text-[#9c9c9c]">
                        Turn your excess stock into capital by listing it on
                        Zeerostock:
                      </p>
                      <ol className="mb-[16.875px] list-decimal space-y-[5.625px] pl-[20.25px] text-[13.5px] font-medium leading-[25.3125px] text-black">
                        <li>
                          Uploading Product Details:{" "}
                          <span className="text-[#9c9c9c]">
                            Create a new listing with clear photos, accurate
                            descriptions, technical data sheets, and condition
                            reports.
                          </span>
                        </li>
                        <li>
                          Pricing Options:{" "}
                          <span className="text-[#9c9c9c]">
                            Set a fixed price, or enable &apos;Make an
                            Offer&apos; to invite negotiations from interested
                            buyers.
                          </span>
                        </li>
                        <li>
                          Visibility Tips:{" "}
                          <span className="text-[#9c9c9c]">
                            Complete your company profile and maintain a high
                            supplier rating to increase trust and visibility.
                          </span>
                        </li>
                      </ol>
                      <div className="h-[1.125px] w-full bg-gray-200"></div>
                    </div>
                  )}

                  {filteredSections.includes(sections[5]) && (
                    <div className="mb-[22.5px]">
                      <h2 className="mb-[11.25px] text-[21.375px] font-semibold leading-none text-[#0d1b2a]">
                        6. Payments & Orders
                      </h2>
                      <p className="mb-[11.25px] text-[13.5px] font-medium leading-normal text-[#9c9c9c]">
                        We ensure all transactions are secure and transparent
                        from start to finish:
                      </p>
                      <ol className="list-decimal space-y-[5.625px] pl-[20.25px] text-[13.5px] font-medium leading-[25.3125px] text-black">
                        <li>
                          Secure Escrow:{" "}
                          <span className="text-[#9c9c9c]">
                            All payments are held in a secure escrow account and
                            are released to the supplier only after the buyer
                            confirms successful delivery.
                          </span>
                        </li>
                        <li>
                          Order Tracking:{" "}
                          <span className="text-[#9c9c9c]">
                            Monitor the status of your order from payment to
                            shipment and delivery directly from your dashboard.
                          </span>
                        </li>
                        <li>
                          Invoices & Download Options:{" "}
                          <span className="text-[#9c9c9c]">
                            Access and download all transaction invoices and
                            order-related documents for your records.
                          </span>
                        </li>
                      </ol>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
