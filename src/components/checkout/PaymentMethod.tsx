"use client";

import { useState } from "react";
import { Check, CreditCard, MapPin } from "lucide-react";

interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface BillingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentMethodProps {
  selectedMethod: "card" | "escrow" | "wire" | "net-terms";
  onMethodSelect: (method: "card" | "escrow" | "wire" | "net-terms") => void;
  onPaymentDetailsChange: (details: PaymentDetails) => void;
  onContinue: () => void;
  onBack: () => void;
  shippingAddress?: BillingAddress;
}

export default function PaymentMethod({
  selectedMethod,
  onMethodSelect,
  onPaymentDetailsChange,
  onContinue,
  onBack,
  shippingAddress,
}: PaymentMethodProps) {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [useSameAddress, setUseSameAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleDetailsChange = (field: keyof PaymentDetails, value: string) => {
    const updated = { ...paymentDetails, [field]: value };
    setPaymentDetails(updated);
    onPaymentDetailsChange(updated);
  };

  const handleBillingChange = (field: keyof BillingAddress, value: string) => {
    setBillingAddress({ ...billingAddress, [field]: value });
  };

  const paymentMethods = [
    {
      id: "card" as const,
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      processingInfo: "Processing: Instant | Fee: 2.9% + $0.30",
    },
    {
      id: "escrow" as const,
      name: "Escrow Payment",
      description: "Secure payment held until delivery confirmation",
      processingInfo: "Processing: 2-14 days | Fee: 2.5% of order value",
      recommended: true,
    },
    {
      id: "wire" as const,
      name: "Wire Transfer",
      description: "Direct bank transfer for large orders",
      processingInfo: "Processing: 1-3 business days| Fee: $0",
    },
    {
      id: "net-terms" as const,
      name: "Net Terms",
      description: "Pay later with approved credit",
      processingInfo:
        "Processing: Credit approval required | Fee: No processing fee",
    },
  ];

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Payment Method Selection */}
      <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px]">
        <div className="flex items-center gap-[10px] mb-[17px]">
          <CreditCard
            className="w-[13px] h-[13px] text-[#0d1b2a]"
            strokeWidth={1.5}
          />
          <h2 className="font-semibold text-sm text-[#0d1b2a] m-0">
            Payment Method
          </h2>
        </div>

        <div className="flex flex-col gap-[10px]">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => onMethodSelect(method.id)}
              className={`rounded-[10px] h-[60px] p-[10px] cursor-pointer relative border-2 ${
                selectedMethod === method.id
                  ? "bg-[#eeffef] border-[#2aae7a]"
                  : "bg-white border-[#e8e8e8]"
              }`}
            >
              <div className="flex items-start gap-[7px]">
                {/* Radio Button */}
                <div
                  className={`w-[11px] h-[11px] rounded-full border-2 flex items-center justify-center shrink-0 mt-[5px] ${
                    selectedMethod === method.id
                      ? "border-[#2aae7a]"
                      : "border-[#bebebe]"
                  }`}
                >
                  {selectedMethod === method.id && (
                    <div className="w-[5px] h-[5px] rounded-full bg-[#2aae7a]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-[6px] mb-0">
                    <span className="font-medium text-xs text-[#0d1b2a]">
                      {method.name}
                    </span>
                    {method.recommended && (
                      <div className="bg-[#eeffef] text-[#2aae7a] px-[3px] rounded-[10px] font-medium text-xs leading-tight">
                        Recommended
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-normal text-[#9c9c9c] mb-[1px] leading-tight tracking-[0.3px]">
                    {method.description}
                  </p>
                  <p className="text-xs font-normal text-[#9c9c9c] m-0 leading-tight tracking-[0.3px]">
                    {method.processingInfo}
                  </p>
                </div>

                {/* Card Logos (only for card payment) */}
                {method.id === "card" && (
                  <div className="flex items-center gap-[5px] mt-[12px]">
                    {/* Visa SVG */}
                    <div className="w-[30px] h-auto">
                      <svg
                        viewBox="0 -140 780 780"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        className="w-full h-full"
                      >
                        <g strokeWidth="0"></g>
                        <g strokeLinecap="round" strokeLinejoin="round"></g>
                        <g>
                          <path
                            d="m293.2 348.73l33.359-195.76h53.358l-33.384 195.76h-53.333zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-0.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-0.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885 0.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-0.271 30.088 3.534 39.936 7.5l4.781 2.259 7.231-42.427m137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555 0.084 68.336 0.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-0.314 0.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293v3e-3zm-363.3-126.41l-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-0.063 84.004-195.39-56.524-1e-3"
                            fill="#0E4595"
                          ></path>
                          <path
                            d="m146.92 152.96h-86.041l-0.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528"
                            fill="#F2AE14"
                          ></path>
                        </g>
                      </svg>
                    </div>

                    {/* Mastercard SVG */}
                    <div className="w-[25px] h-auto">
                      <svg
                        viewBox="0 -9 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <g strokeWidth="0"></g>
                        <g strokeLinecap="round" strokeLinejoin="round"></g>
                        <g>
                          <rect
                            x="0.5"
                            y="0.5"
                            width="57"
                            height="39"
                            rx="3.5"
                            fill="white"
                            stroke="#F3F3F3"
                          ></rect>
                          <path
                            d="M34.3102 28.9765H23.9591V10.5122H34.3102V28.9765Z"
                            fill="#FF5F00"
                          ></path>
                          <path
                            d="M24.6223 19.7429C24.6223 15.9973 26.3891 12.6608 29.1406 10.5107C27.1285 8.93843 24.5892 7.99998 21.8294 7.99998C15.2961 7.99998 10 13.2574 10 19.7429C10 26.2283 15.2961 31.4857 21.8294 31.4857C24.5892 31.4857 27.1285 30.5473 29.1406 28.975C26.3891 26.8249 24.6223 23.4884 24.6223 19.7429"
                            fill="#EB001B"
                          ></path>
                          <path
                            d="M48.2706 19.7429C48.2706 26.2283 42.9745 31.4857 36.4412 31.4857C33.6814 31.4857 31.1421 30.5473 29.1293 28.975C31.8815 26.8249 33.6483 23.4884 33.6483 19.7429C33.6483 15.9973 31.8815 12.6608 29.1293 10.5107C31.1421 8.93843 33.6814 7.99998 36.4412 7.99998C42.9745 7.99998 48.2706 13.2574 48.2706 19.7429"
                            fill="#F79E1B"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details (only for card payment) */}
      {selectedMethod === "card" && (
        <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px]">
          <h3 className="font-semibold text-sm text-[#0d1b2a] mb-[17px]">
            Payment Details
          </h3>

          <div className="flex flex-col gap-[28px]">
            {/* Card Number */}
            <div>
              <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                Card Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  handleDetailsChange("cardNumber", e.target.value)
                }
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
                className="w-full h-[28px] px-[8px] border border-[#9c9c9c] rounded-[5px] text-xs font-normal text-[#9c9c9c] tracking-[0.3px]"
              />
            </div>

            {/* Expiry Date & CVV */}
            <div className="flex gap-[23px]">
              <div className="w-[180px]">
                <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                  Expiry Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={paymentDetails.expiryDate}
                  onChange={(e) =>
                    handleDetailsChange("expiryDate", e.target.value)
                  }
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full h-[28px] px-[8px] border border-[#9c9c9c] rounded-[5px] text-xs font-normal text-[#9c9c9c] tracking-[0.3px]"
                />
              </div>
              <div className="w-[180px]">
                <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                  CVV<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) => handleDetailsChange("cvv", e.target.value)}
                  placeholder="XXX"
                  maxLength={4}
                  className="w-full h-[28px] px-[8px] border border-[#9c9c9c] rounded-[5px] text-xs font-normal text-[#9c9c9c] tracking-[0.3px]"
                />
              </div>
            </div>

            {/* Name on Card */}
            <div>
              <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                Name on Card<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.cardName}
                onChange={(e) =>
                  handleDetailsChange("cardName", e.target.value)
                }
                placeholder="John Doe"
                className="w-full h-[28px] px-[8px] border border-[#9c9c9c] rounded-[5px] text-xs font-normal text-[#9c9c9c] tracking-[0.3px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="bg-white rounded-[13px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[20px]">
        <div className="flex items-center gap-[13px] mb-[17px]">
          <MapPin
            className="w-[17px] h-[17px] text-[#0d1b2a]"
            strokeWidth={1.5}
          />
          <h3 className="font-semibold text-lg text-[#0d1b2a] m-0">
            Billing Address
          </h3>
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-[8px] mb-[10px] group select-none">
          <div className="relative flex items-center justify-center w-[16px] h-[16px]">
            <input
              type="checkbox"
              checked={useSameAddress}
              onChange={(e) => setUseSameAddress(e.target.checked)}
              className="peer appearance-none w-full h-full border-2 border-[#e2e2e2] rounded-[4px] bg-white checked:bg-[#2aae7a] checked:border-[#2aae7a] transition-all duration-200 cursor-pointer hover:border-[#2aae7a]"
            />
            <Check
              className="absolute w-[11px] h-[11px] text-white opacity-0 transform scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200 pointer-events-none"
              strokeWidth={3}
            />
          </div>
          <span className="font-medium text-xs text-[#0d1b2a] transition-colors">
            Same as Shipping Address
          </span>
        </label>

        {/* Billing Address Form (when checkbox unchecked) */}
        {!useSameAddress && (
          <div className="flex flex-col gap-[28px] mt-[15px]">
            {/* First Name & Last Name */}
            <div className="flex gap-[23px]">
              <div className="w-[180px]">
                <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                  First Name
                </label>
                <input
                  type="text"
                  value={billingAddress.firstName}
                  onChange={(e) =>
                    handleBillingChange("firstName", e.target.value)
                  }
                  placeholder="John"
                  className="w-full h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-xs font-normal text-[#0d1b2a] tracking-[0.3px]"
                />
              </div>
              <div className="w-[180px]">
                <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                  Last Name
                </label>
                <input
                  type="text"
                  value={billingAddress.lastName}
                  onChange={(e) =>
                    handleBillingChange("lastName", e.target.value)
                  }
                  placeholder="Smith"
                  className="w-full h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-xs font-normal text-[#0d1b2a] tracking-[0.3px]"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                Company Name
              </label>
              <input
                type="text"
                value={billingAddress.companyName}
                onChange={(e) =>
                  handleBillingChange("companyName", e.target.value)
                }
                placeholder="MetelCorp Ltd"
                className="w-full h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-xs font-normal text-[#0d1b2a] tracking-[0.3px]"
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                Street Address
              </label>
              <input
                type="text"
                value={billingAddress.streetAddress}
                onChange={(e) =>
                  handleBillingChange("streetAddress", e.target.value)
                }
                placeholder="123 Business Ave"
                className="w-full h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-xs font-normal text-[#0d1b2a] tracking-[0.3px]"
              />
            </div>

            {/* City, State, ZIP */}
            <div className="flex gap-[13px]">
              <div className="w-[127px]">
                <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                  City
                </label>
                <input
                  type="text"
                  value={billingAddress.city}
                  onChange={(e) => handleBillingChange("city", e.target.value)}
                  placeholder="Metropolis"
                  className="w-full h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-xs font-normal text-[#0d1b2a] tracking-[0.3px]"
                />
              </div>
              <div className="w-[130px]">
                <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                  State
                </label>
                <input
                  type="text"
                  value={billingAddress.state}
                  onChange={(e) => handleBillingChange("state", e.target.value)}
                  placeholder="Karnataka"
                  className="w-full h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-xs font-normal text-[#0d1b2a] tracking-[0.3px]"
                />
              </div>
              <div className="w-[100px]">
                <label className="block font-medium text-xs text-[#0d1b2a] mb-[5px]">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={billingAddress.zipCode}
                  onChange={(e) =>
                    handleBillingChange("zipCode", e.target.value)
                  }
                  placeholder="90210"
                  className="w-full h-[28px] px-[8px] border border-[#bebebe] rounded-[5px] text-xs font-normal text-[#0d1b2a] tracking-[0.3px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-[7px] mt-0">
        <button
          onClick={onBack}
          className="h-[30px] px-8 bg-white border border-[#9c9c9c] rounded-[7px] text-xs font-semibold text-[#9c9c9c] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Previous Step
        </button>
        <button
          onClick={onContinue}
          disabled={
            selectedMethod === "card" &&
            (!paymentDetails.cardNumber ||
              !paymentDetails.cardName ||
              !paymentDetails.expiryDate ||
              !paymentDetails.cvv)
          }
          className="h-[30px] px-8 bg-[#1e3a8a] rounded-[7px] text-xs font-semibold text-white hover:bg-[#2d4a99] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
