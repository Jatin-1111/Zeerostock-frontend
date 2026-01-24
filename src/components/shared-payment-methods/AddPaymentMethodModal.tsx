"use client";

import { useState } from "react";
import { X, CreditCard } from "lucide-react";

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (paymentData: any) => void;
}

export default function AddPaymentMethodModal({
  isOpen,
  onClose,
  onAdd,
}: AddPaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "escrow" | "upi"
  >("card");

  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Escrow form state
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  // UPI form state
  const [upiId, setUpiId] = useState("");

  if (!isOpen) return null;

  const handleAddCard = () => {
    if (onAdd) {
      onAdd({
        type: "card",
        cardNumber,
        expiryDate,
        cvv,
        cardName,
      });
    }
  };

  const handleAddEscrow = () => {
    if (onAdd) {
      onAdd({
        type: "escrow",
        emailId,
        password,
      });
    }
  };

  const handleVerifyUPI = () => {
    if (onAdd) {
      onAdd({
        type: "upi",
        upiId,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg w-full max-w-[340px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] py-[13px] border-b border-gray-200">
          <div className="flex items-center gap-[8px]">
            <CreditCard className="w-[12px] h-[12px] text-black" />
            <h2 className="text-[11px] font-semibold text-black">
              Add New Payment Method
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-[13px] h-[13px]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-[17px] space-y-[13px]">
          {/* Credit/Debit Card Section */}
          <div
            className={`border-2 rounded-lg p-[13px] transition-colors ${
              selectedMethod === "card"
                ? "border-[#2AE7A] bg-[#EEFFEF]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-[8px] mb-[11px]">
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "card"}
                onChange={() => setSelectedMethod("card")}
                className="mt-[3px] w-[11px] h-[11px] accent-[#2AE7A]"
              />
              <div className="flex-1">
                <h3 className="text-[9px] font-semibold text-black">
                  Credit/Debit Card
                </h3>
                <p className="text-[8px] text-gray-400">
                  Visa, Mastercard, American Express
                </p>
              </div>
            </div>

            {selectedMethod === "card" && (
              <div className="space-y-[11px] mt-[13px]">
                {/* Card Number */}
                <div>
                  <label className="block text-[8px] font-medium text-black mb-[4px]">
                    Card Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-[11px] py-[7px] border border-gray-300 rounded text-[8px] text-[#9c9c9c] placeholder:text-gray-400 focus:outline-none focus:border-[#2AE7A] focus:ring-1 focus:ring-[#2AE7A]"
                  />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-[11px]">
                  <div>
                    <label className="block text-[8px] font-medium text-black mb-[4px]">
                      Expiry Date<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full px-[11px] py-[7px] border border-gray-300 rounded text-[8px] text-[#9c9c9c] placeholder:text-gray-400 focus:outline-none focus:border-[#2AE7A] focus:ring-1 focus:ring-[#2AE7A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-medium text-black mb-[4px]">
                      CVV<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="XXX"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={3}
                      className="w-full px-[11px] py-[7px] border border-gray-300 rounded text-[8px] text-[#9c9c9c] placeholder:text-gray-400 focus:outline-none focus:border-[#2AE7A] focus:ring-1 focus:ring-[#2AE7A]"
                    />
                  </div>
                </div>

                {/* Name on Card */}
                <div>
                  <label className="block text-[8px] font-medium text-black mb-[4px]">
                    Name on Card<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-[11px] py-[7px] border border-gray-300 rounded text-[8px] text-[#9c9c9c] placeholder:text-gray-400 focus:outline-none focus:border-[#2AE7A] focus:ring-1 focus:ring-[#2AE7A]"
                  />
                </div>

                {/* Processing Fee Info */}
                <p className="text-[7px] text-gray-400">
                  Processing: Instant | Fee: 2.9% + $0.30
                </p>

                {/* Add Card Button */}
                <button
                  onClick={handleAddCard}
                  className="w-full bg-[#0D1B2A] text-white rounded py-[5px] text-[6px] font-semibold hover:bg-[#0D1B2A]/90 transition-colors flex items-center justify-center gap-[4px]"
                >
                  <span className="text-[8px]">+</span>
                  Add Card
                </button>
              </div>
            )}
          </div>

          {/* Escrow Payment / PayPal Section */}
          <div
            className={`border-2 rounded-lg p-[13px] transition-colors ${
              selectedMethod === "escrow"
                ? "border-[#2AE7A] bg-[#EEFFEF]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-[8px] mb-[11px]">
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "escrow"}
                onChange={() => setSelectedMethod("escrow")}
                className="mt-[3px] w-[11px] h-[11px] accent-[#2AE7A]"
              />
              <div className="flex-1">
                <h3 className="text-[9px] font-semibold text-black">
                  Escrow Payment / PayPal
                </h3>
                <p className="text-[8px] text-gray-400">
                  Secure payment held until delivery confirmation
                </p>
              </div>
            </div>

            {selectedMethod === "escrow" && (
              <div className="space-y-[11px] mt-[13px]">
                {/* Email ID */}
                <div>
                  <label className="block text-[8px] font-medium text-black mb-[4px]">
                    Email ID
                  </label>
                  <input
                    type="email"
                    placeholder="xyz@mail.com"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="w-full px-[11px] py-[7px] border border-gray-300 rounded text-[8px] text-[#9c9c9c] placeholder:text-gray-400 focus:outline-none focus:border-[#2AE7A] focus:ring-1 focus:ring-[#2AE7A]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[8px] font-medium text-black mb-[4px]">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="•••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-[11px] py-[7px] border border-gray-300 rounded text-[8px] text-[#9c9c9c] placeholder:text-gray-400 focus:outline-none focus:border-[#2AE7A] focus:ring-1 focus:ring-[#2AE7A]"
                  />
                </div>

                {/* Processing Fee Info */}
                <p className="text-[7px] text-gray-400">
                  Processing: 2-14 days | Fee: 2.5% of order value
                </p>

                {/* Add Account Button */}
                <button
                  onClick={handleAddEscrow}
                  className="w-full bg-[#0D1B2A] text-white rounded py-[5px] text-[6px] font-semibold hover:bg-[#0D1B2A]/90 transition-colors flex items-center justify-center gap-[4px]"
                >
                  <span className="text-[8px]">+</span>
                  Add Account
                </button>
              </div>
            )}
          </div>

          {/* UPI Section */}
          <div
            className={`border-2 rounded-lg p-[13px] transition-colors ${
              selectedMethod === "upi"
                ? "border-[#2AE7A] bg-[#EEFFEF]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-[8px] mb-[11px]">
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "upi"}
                onChange={() => setSelectedMethod("upi")}
                className="mt-[3px] w-[11px] h-[11px] accent-[#2AE7A]"
              />
              <div className="flex-1">
                <h3 className="text-[9px] font-semibold text-black">UPI</h3>
                <p className="text-[8px] text-gray-400">Pay via any UPI App</p>
                <p className="text-[7px] text-gray-400 mt-[3px]">
                  Processing: Instant| Fee: $0
                </p>
              </div>
            </div>

            {selectedMethod === "upi" && (
              <div className="space-y-[11px] mt-[13px]">
                {/* UPI ID Input */}
                <div>
                  <label className="block text-[8px] font-medium text-black mb-[4px]">
                    Enter UPI ID
                  </label>
                  <div className="flex gap-[8px]">
                    <input
                      type="text"
                      placeholder="xyz@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="flex-1 px-[11px] py-[7px] border border-gray-300 rounded text-[8px] text-[#9c9c9c] placeholder:text-gray-400 focus:outline-none focus:border-[#2AE7A] focus:ring-1 focus:ring-[#2AE7A]"
                    />
                    <button
                      onClick={handleVerifyUPI}
                      className="bg-[#F4CE00] text-black rounded px-[16px] py-[7px] text-[8px] font-semibold hover:bg-[#F4CE00]/90 transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {/* OR Divider */}
                <div className="flex items-center gap-[11px]">
                  <div className="flex-1 h-[1px] bg-gray-300"></div>
                  <span className="text-[8px] text-gray-400">OR</span>
                  <div className="flex-1 h-[1px] bg-gray-300"></div>
                </div>

                {/* Pay using app */}
                <div>
                  <p className="text-[8px] font-medium text-black mb-[8px]">
                    Pay using app
                  </p>
                  <div className="flex items-center gap-[11px]">
                    {/* Google Pay */}
                    <button className="flex-1 border-2 border-gray-300 rounded-lg p-[8px] hover:border-[#2AE7A] transition-colors">
                      <div className="flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          width="32px"
                          height="13px"
                          baseProfile="basic"
                        >
                          <path
                            fill="#e64a19"
                            d="M42.858,11.975c-4.546-2.624-10.359-1.065-12.985,3.481L23.25,26.927	c-1.916,3.312,0.551,4.47,3.301,6.119l6.372,3.678c2.158,1.245,4.914,0.506,6.158-1.649l6.807-11.789	C48.176,19.325,46.819,14.262,42.858,11.975z"
                          />
                          <path
                            fill="#fbc02d"
                            d="M35.365,16.723l-6.372-3.678c-3.517-1.953-5.509-2.082-6.954,0.214l-9.398,16.275	c-2.624,4.543-1.062,10.353,3.481,12.971c3.961,2.287,9.024,0.93,11.311-3.031l9.578-16.59	C38.261,20.727,37.523,17.968,35.365,16.723z"
                          />
                          <path
                            fill="#43a047"
                            d="M36.591,8.356l-4.476-2.585c-4.95-2.857-11.28-1.163-14.137,3.787L9.457,24.317	c-1.259,2.177-0.511,4.964,1.666,6.22l5.012,2.894c2.475,1.43,5.639,0.582,7.069-1.894l9.735-16.86	c2.017-3.492,6.481-4.689,9.974-2.672L36.591,8.356z"
                          />
                          <path
                            fill="#1e88e5"
                            d="M19.189,13.781l-4.838-2.787c-2.158-1.242-4.914-0.506-6.158,1.646l-5.804,10.03	c-2.857,4.936-1.163,11.252,3.787,14.101l3.683,2.121l4.467,2.573l1.939,1.115c-3.442-2.304-4.535-6.92-2.43-10.555l1.503-2.596	l5.504-9.51C22.083,17.774,21.344,15.023,19.189,13.781z"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* PhonePe */}
                    <button className="flex-1 border-2 border-gray-300 rounded-lg p-[8px] hover:border-[#2AE7A] transition-colors">
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-[32px] h-[13px]"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="256" cy="256" r="256" fill="#5f259f" />
                          <path
                            fill="#fff"
                            d="M372.164 189.203c0-10.008-8.576-18.593-18.584-18.593h-34.323l-78.638-90.084c-7.154-8.577-18.592-11.439-30.03-8.577l-27.17 8.577c-4.292 1.43-5.723 7.154-2.862 10.007l85.8 81.508H136.236c-4.293 0-7.154 2.861-7.154 7.154v14.292c0 10.016 8.585 18.592 18.592 18.592h20.015v68.639c0 51.476 27.17 81.499 72.931 81.499 14.292 0 25.739-1.431 40.03-7.146v45.753c0 12.87 10.016 22.886 22.885 22.886h20.015c4.293 0 8.577-4.293 8.577-8.586V210.648h32.893c4.292 0 7.145-2.861 7.145-7.145v-14.3zM280.65 312.17c-8.576 4.292-20.015 5.723-28.591 5.723-22.886 0-34.324-11.438-34.324-37.176v-68.639h62.915v100.092z"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Paytm */}
                    <button className="flex-1 border-2 border-gray-300 rounded-lg p-[8px] hover:border-[#2AE7A] transition-colors">
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-[32px] h-[13px]"
                          viewBox="0 0 122.88 38.52"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#00BAF2"
                            d="M122.47,11.36c-1.12-3.19-4.16-5.48-7.72-5.48h-0.08c-2.32,0-4.41,0.97-5.9,2.52 c-1.49-1.55-3.58-2.52-5.9-2.52h-0.07c-2.04,0-3.91,0.75-5.34,1.98V7.24c-0.05-0.63-0.56-1.12-1.2-1.12h-5.48 c-0.67,0-1.21,0.54-1.21,1.21v29.74c0,0.67,0.54,1.21,1.21,1.21h5.48c0.61,0,1.12-0.46,1.19-1.04l0-21.35c0-0.08,0-0.14,0.01-0.21 c0.09-0.95,0.79-1.74,1.89-1.83h1.01c0.46,0.04,0.85,0.2,1.15,0.45c0.48,0.38,0.74,0.96,0.74,1.6l0.02,21.24 c0,0.67,0.54,1.22,1.21,1.22h5.48c0.65,0,1.17-0.51,1.2-1.15l0-21.33c0-0.7,0.32-1.34,0.89-1.71c0.28-0.18,0.62-0.3,1.01-0.34h1.01 c1.19,0.1,1.9,1,1.9,2.05l0.02,21.22c0,0.67,0.54,1.21,1.21,1.21h5.48c0.64,0,1.17-0.5,1.21-1.13V13.91 C122.86,12.6,122.69,11.99,122.47,11.36L122.47,11.36z M85.39,6.2h-3.13V1.12c0-0.01,0-0.01,0-0.02C82.26,0.5,81.77,0,81.15,0 c-0.07,0-0.14,0.01-0.21,0.02c-3.47,0.95-2.78,5.76-9.12,6.17h-0.61c-0.09,0-0.18,0.01-0.27,0.03h-0.01l0.01,0 C70.41,6.35,70,6.83,70,7.41v5.48c0,0.67,0.54,1.21,1.21,1.21h3.3l-0.01,23.22c0,0.66,0.54,1.2,1.2,1.2h5.42 c0.66,0,1.2-0.54,1.2-1.2l0-23.22h3.07c0.66,0,1.21-0.55,1.21-1.21V7.41C86.6,6.74,86.06,6.2,85.39,6.2L85.39,6.2z"
                          />
                          <path
                            fill="#20336B"
                            d="M65.69,6.2h-5.48C59.55,6.2,59,6.74,59,7.41v11.33c-0.01,0.7-0.58,1.26-1.28,1.26h-2.29 c-0.71,0-1.29-0.57-1.29-1.28L54.12,7.41c0-0.67-0.54-1.21-1.21-1.21h-5.48c-0.67,0-1.21,0.54-1.21,1.21v12.41 c0,4.71,3.36,8.08,8.08,8.08c0,0,3.54,0,3.65,0.02c0.64,0.07,1.13,0.61,1.13,1.27c0,0.65-0.48,1.19-1.12,1.27 c-0.03,0-0.06,0.01-0.09,0.02l-8.01,0.03c-0.67,0-1.21,0.54-1.21,1.21v5.47c0,0.67,0.54,1.21,1.21,1.21h8.95 c4.72,0,8.08-3.36,8.08-8.07V7.41C66.9,6.74,66.36,6.2,65.69,6.2L65.69,6.2z M34.53,6.23h-7.6c-0.67,0-1.22,0.51-1.22,1.13v2.13 c0,0.01,0,0.03,0,0.04c0,0.02,0,0.03,0,0.05v2.92c0,0.66,0.58,1.21,1.29,1.21h7.24c0.57,0.09,1.02,0.51,1.09,1.16v0.71 c-0.06,0.62-0.51,1.07-1.06,1.12h-3.58c-4.77,0-8.16,3.17-8.16,7.61v6.37c0,4.42,2.92,7.56,7.65,7.56h9.93 c1.78,0,3.23-1.35,3.23-3.01V14.45C43.34,9.41,40.74,6.23,34.53,6.23L34.53,6.23z M35.4,29.09v0.86c0,0.07-0.01,0.14-0.02,0.2 c-0.01,0.06-0.03,0.12-0.05,0.18c-0.17,0.48-0.65,0.83-1.22,0.83h-2.28c-0.71,0-1.29-0.54-1.29-1.21v-1.03c0-0.01,0-0.03,0-0.04 l0-2.75v-0.86l0-0.01c0-0.66,0.58-1.2,1.29-1.2h2.28c0.71,0,1.29,0.54,1.29,1.21V29.09L35.4,29.09z M13.16,6.19H1.19 C0.53,6.19,0,6.73,0,7.38v5.37c0,0.01,0,0.02,0,0.03c0,0.03,0,0.05,0,0.07v24.29c0,0.66,0.49,1.2,1.11,1.21h5.58 c0.67,0,1.21-0.54,1.21-1.21l0.02-8.32h5.24c4.38,0,7.44-3.04,7.44-7.45v-7.72C20.6,9.25,17.54,6.19,13.16,6.19L13.16,6.19z M12.68,16.23v3.38c0,0.71-0.57,1.29-1.28,1.29l-3.47,0v-6.77h3.47c0.71,0,1.28,0.57,1.28,1.28V16.23L12.68,16.23z"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
