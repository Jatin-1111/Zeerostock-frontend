"use client";

import { useState } from "react";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* Payment Method Selection */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
          padding: "23px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "26px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0d1b2a"
            strokeWidth="1.5"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#0d1b2a",
              margin: 0,
            }}
          >
            Payment Method
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => onMethodSelect(method.id)}
              style={{
                backgroundColor:
                  selectedMethod === method.id ? "#eeffef" : "white",
                border: `2px solid ${
                  selectedMethod === method.id ? "#2aae7a" : "#e8e8e8"
                }`,
                borderRadius: "15px",
                height: "90px",
                padding: "15px 16px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "11px",
                }}
              >
                {/* Radio Button */}
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    border: `2px solid ${
                      selectedMethod === method.id ? "#2aae7a" : "#bebebe"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "8px",
                  }}
                >
                  {selectedMethod === method.id && (
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#2aae7a",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "0px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#0d1b2a",
                      }}
                    >
                      {method.name}
                    </span>
                    {method.recommended && (
                      <div
                        style={{
                          backgroundColor: "#eeffef",
                          color: "#2aae7a",
                          padding: "0px 4px",
                          borderRadius: "15px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: "10px",
                          lineHeight: "18px",
                        }}
                      >
                        Recommended
                      </div>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#9c9c9c",
                      margin: "0 0 2px 0",
                      lineHeight: "18px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {method.description}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#9c9c9c",
                      margin: 0,
                      lineHeight: "18px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {method.processingInfo}
                  </p>
                </div>

                {/* Card Logos (only for card payment) */}
                {method.id === "card" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      marginTop: "23px",
                    }}
                  >
                    {/* Visa logo placeholder */}
                    <div
                      style={{
                        width: "38px",
                        height: "25px",
                        border: "1px solid #ddd",
                        borderRadius: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "#1434cb",
                      }}
                    >
                      VISA
                    </div>
                    {/* Mastercard logo placeholder */}
                    <div
                      style={{
                        width: "40px",
                        height: "25px",
                        border: "0.5px solid #f60",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: "#eb001b",
                        }}
                      />
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: "#f79e1b",
                        }}
                      />
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
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
            padding: "23px",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#0d1b2a",
              marginBottom: "26px",
            }}
          >
            Payment Details
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "42px" }}
          >
            {/* Card Number */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#0d1b2a",
                  marginBottom: "8px",
                }}
              >
                Card Number<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  handleDetailsChange("cardNumber", e.target.value)
                }
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
                style={{
                  width: "100%",
                  height: "42px",
                  padding: "0 12px",
                  border: "1px solid #9c9c9c",
                  borderRadius: "8px",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#9c9c9c",
                  letterSpacing: "0.5px",
                }}
              />
            </div>

            {/* Expiry Date & CVV */}
            <div style={{ display: "flex", gap: "34px" }}>
              <div style={{ width: "270px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#0d1b2a",
                    marginBottom: "8px",
                  }}
                >
                  Expiry Date<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={paymentDetails.expiryDate}
                  onChange={(e) =>
                    handleDetailsChange("expiryDate", e.target.value)
                  }
                  placeholder="MM/YY"
                  maxLength={5}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #9c9c9c",
                    borderRadius: "8px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#9c9c9c",
                    letterSpacing: "0.5px",
                  }}
                />
              </div>
              <div style={{ width: "270px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#0d1b2a",
                    marginBottom: "8px",
                  }}
                >
                  CVV<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) => handleDetailsChange("cvv", e.target.value)}
                  placeholder="XXX"
                  maxLength={4}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #9c9c9c",
                    borderRadius: "8px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#9c9c9c",
                    letterSpacing: "0.5px",
                  }}
                />
              </div>
            </div>

            {/* Name on Card */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#0d1b2a",
                  marginBottom: "8px",
                }}
              >
                Name on Card<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.cardName}
                onChange={(e) =>
                  handleDetailsChange("cardName", e.target.value)
                }
                placeholder="John Doe"
                style={{
                  width: "100%",
                  height: "42px",
                  padding: "0 12px",
                  border: "1px solid #9c9c9c",
                  borderRadius: "8px",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#9c9c9c",
                  letterSpacing: "0.5px",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.25)",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0d1b2a"
            strokeWidth="1.5"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              color: "#0d1b2a",
              margin: 0,
            }}
          >
            Billing Address
          </h3>
        </div>

        {/* Checkbox */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          <input
            type="checkbox"
            checked={useSameAddress}
            onChange={(e) => setUseSameAddress(e.target.checked)}
            style={{
              width: "24px",
              height: "24px",
              cursor: "pointer",
              accentColor: "#2aae7a",
            }}
          />
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "17px",
              color: "#0d1b2a",
            }}
          >
            Same as Shipping Address
          </span>
        </label>

        {/* Billing Address Form (when checkbox unchecked) */}
        {!useSameAddress && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "42px",
              marginTop: "23px",
            }}
          >
            {/* First Name & Last Name */}
            <div style={{ display: "flex", gap: "34px" }}>
              <div style={{ width: "270px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#0d1b2a",
                    marginBottom: "8px",
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={billingAddress.firstName}
                  onChange={(e) =>
                    handleBillingChange("firstName", e.target.value)
                  }
                  placeholder="John"
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #bebebe",
                    borderRadius: "8px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#0d1b2a",
                    letterSpacing: "0.5px",
                  }}
                />
              </div>
              <div style={{ width: "270px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#0d1b2a",
                    marginBottom: "8px",
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={billingAddress.lastName}
                  onChange={(e) =>
                    handleBillingChange("lastName", e.target.value)
                  }
                  placeholder="Smith"
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #bebebe",
                    borderRadius: "8px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#0d1b2a",
                    letterSpacing: "0.5px",
                  }}
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#0d1b2a",
                  marginBottom: "8px",
                }}
              >
                Company Name
              </label>
              <input
                type="text"
                value={billingAddress.companyName}
                onChange={(e) =>
                  handleBillingChange("companyName", e.target.value)
                }
                placeholder="MetelCorp Ltd"
                style={{
                  width: "100%",
                  height: "42px",
                  padding: "0 12px",
                  border: "1px solid #bebebe",
                  borderRadius: "8px",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#0d1b2a",
                  letterSpacing: "0.5px",
                }}
              />
            </div>

            {/* Street Address */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#0d1b2a",
                  marginBottom: "8px",
                }}
              >
                Street Address
              </label>
              <input
                type="text"
                value={billingAddress.streetAddress}
                onChange={(e) =>
                  handleBillingChange("streetAddress", e.target.value)
                }
                placeholder="123 Business Ave"
                style={{
                  width: "100%",
                  height: "42px",
                  padding: "0 12px",
                  border: "1px solid #bebebe",
                  borderRadius: "8px",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#0d1b2a",
                  letterSpacing: "0.5px",
                }}
              />
            </div>

            {/* City, State, ZIP */}
            <div style={{ display: "flex", gap: "19px" }}>
              <div style={{ width: "191px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#0d1b2a",
                    marginBottom: "8px",
                  }}
                >
                  City
                </label>
                <input
                  type="text"
                  value={billingAddress.city}
                  onChange={(e) => handleBillingChange("city", e.target.value)}
                  placeholder="Metropolis"
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #bebebe",
                    borderRadius: "8px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#0d1b2a",
                    letterSpacing: "0.5px",
                  }}
                />
              </div>
              <div style={{ width: "195px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#0d1b2a",
                    marginBottom: "8px",
                  }}
                >
                  State
                </label>
                <input
                  type="text"
                  value={billingAddress.state}
                  onChange={(e) => handleBillingChange("state", e.target.value)}
                  placeholder="Karnataka"
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #bebebe",
                    borderRadius: "8px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#0d1b2a",
                    letterSpacing: "0.5px",
                  }}
                />
              </div>
              <div style={{ width: "150px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#0d1b2a",
                    marginBottom: "8px",
                  }}
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={billingAddress.zipCode}
                  onChange={(e) =>
                    handleBillingChange("zipCode", e.target.value)
                  }
                  placeholder="90210"
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #bebebe",
                    borderRadius: "8px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#0d1b2a",
                    letterSpacing: "0.5px",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "11px",
          marginTop: "0px",
        }}
      >
        <button
          onClick={onBack}
          className="h-[45px] px-12 bg-white border border-[#9c9c9c] rounded-[11px] text-[15px] font-semibold text-[#9c9c9c] hover:bg-gray-50 transition-colors"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            cursor: "pointer",
          }}
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
          className="h-[45px] px-12 bg-[#1e3a8a] rounded-[11px] text-[15px] font-semibold text-white hover:bg-[#2d4a99] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
