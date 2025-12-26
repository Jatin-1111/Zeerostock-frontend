"use client";

import { useState } from "react";
import Image from "next/image";
import type { Address } from "@/types/buyer.types";
import type { CartItem } from "@/types/api.types";

interface ReviewOrderProps {
  cartItems: CartItem[];
  shippingAddress: Address | null;
  billingAddress: Address | null;
  paymentMethod: "card" | "escrow" | "wire" | "net-terms";
  shippingMethod?: string;
  orderNotes: string;
  onNotesChange: (notes: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  isPlacingOrder?: boolean;
}

export default function ReviewOrder({
  cartItems,
  shippingAddress,
  billingAddress,
  paymentMethod,
  shippingMethod = "standard",
  orderNotes,
  onNotesChange,
  onBack,
  onPlaceOrder,
  isPlacingOrder = false,
}: ReviewOrderProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const getPaymentMethodDisplay = () => {
    switch (paymentMethod) {
      case "card":
        return {
          title: "Credit/Debit Card",
          subtitle: "Visa, Master Card, American Express",
        };
      case "escrow":
        return {
          title: "Escrow Payment",
          subtitle: "Secure payment held until delivery",
        };
      case "wire":
        return {
          title: "Wire Transfer",
          subtitle: "Direct bank transfer",
        };
      case "net-terms":
        return {
          title: "Net Terms",
          subtitle: "Pay later with approved credit",
        };
      default:
        return { title: "Payment Method", subtitle: "" };
    }
  };

  const getShippingMethodDisplay = () => {
    switch (shippingMethod) {
      case "standard":
        return {
          title: "Standard Shipping",
          subtitle: "5-7 business days",
        };
      case "expedited":
        return {
          title: "Expedited Shipping",
          subtitle: "2-3 business days",
        };
      case "overnight":
        return {
          title: "Overnight Delivery",
          subtitle: "1 business day",
        };
      case "freight":
        return {
          title: "Freight Shipping",
          subtitle: "7-14 business days",
        };
      default:
        return { title: "Standard Shipping", subtitle: "5-7 business days" };
    }
  };

  const paymentDisplay = getPaymentMethodDisplay();
  const shippingDisplay = getShippingMethodDisplay();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "19px" }}>
      {/* Order Summary Section */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 0px 4.5px 0px rgba(0,0,0,0.25)",
          padding: "23px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            color: "#0d1b2a",
            marginBottom: "15px",
          }}
        >
          Order Summary
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.itemId}
                style={{
                  backgroundColor: "#fbfbfb",
                  borderRadius: "15px",
                  boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.25)",
                  padding: "18px 19px",
                  display: "flex",
                  alignItems: "center",
                  gap: "19px",
                  height: "90px",
                  width: "100%",
                }}
              >
                {item.image && (
                  <div
                    style={{
                      width: "79px",
                      height: "54px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={79}
                      height={54}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#0d1b2a",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: "#9c9c9c",
                      lineHeight: "18px",
                    }}
                  >
                    by {item.seller?.name || item.category || "Supplier"}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: "#9c9c9c",
                      lineHeight: "18px",
                    }}
                  >
                    Qty: {item.quantity} x {item.price.toFixed(2)}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "18px",
                    color: "#0d1b2a",
                    opacity: 0.8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    ₹
                  </span>
                  {(item.quantity * item.price).toFixed(0)}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#9c9c9c",
                padding: "30px",
              }}
            >
              No items in cart
            </div>
          )}
        </div>
      </div>

      {/* Payment and Shipping Method */}
      <div style={{ display: "flex", gap: "19px" }}>
        {/* Payment Method */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 4.5px 0px rgba(0,0,0,0.25)",
            padding: "23px",
            flex: 1,
            height: "116px",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#0d1b2a",
              marginBottom: "19px",
            }}
          >
            Payment Method
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#0d1b2a"
              style={{ flexShrink: 0 }}
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" fill="white" />
            </svg>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#0d1b2a",
                }}
              >
                {paymentDisplay.title}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#9c9c9c",
                }}
              >
                {paymentDisplay.subtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 4.5px 0px rgba(0,0,0,0.25)",
            padding: "23px",
            flex: 1,
            height: "116px",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#0d1b2a",
              marginBottom: "19px",
            }}
          >
            Shipping Method
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#0d1b2a"
              style={{ flexShrink: 0 }}
            >
              <path d="M1 3h15v13H1z" />
              <path d="M16 8h2.343l2.122 2.121a1 1 0 01.293.707V16h-4.758" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#0d1b2a",
                }}
              >
                {shippingDisplay.title}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#9c9c9c",
                }}
              >
                {shippingDisplay.subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Checkbox */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 0px 4.5px 0px rgba(0,0,0,0.25)",
          padding: "23px 19px",
          display: "flex",
          alignItems: "flex-start",
          gap: "15px",
          width: "100%",
        }}
      >
        <div
          onClick={() => setAgreedToTerms(!agreedToTerms)}
          style={{
            width: "23px",
            height: "23px",
            backgroundColor: agreedToTerms ? "#2aae7a" : "white",
            border: `2px solid ${agreedToTerms ? "#2aae7a" : "#bebebe"}`,
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            padding: "4px",
          }}
        >
          {agreedToTerms && (
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path
                d="M4 10l4 4 8-8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "#0d1b2a",
              marginBottom: "10px",
            }}
          >
            I agree to the Terms of Service and Privacy Policy
          </div>
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              color: "#9c9c9c",
              lineHeight: "17px",
            }}
          >
            By placing this order, you agree to our terms and acknowledge that
            you&apos;ve read our return policy.
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "15px",
          marginTop: "8px",
          width: "100%",
        }}
      >
        <button
          onClick={onBack}
          disabled={isPlacingOrder}
          style={{
            height: "45px",
            padding: "11px 83px",
            backgroundColor: "white",
            border: "1px solid #9c9c9c",
            borderRadius: "11px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: "#9c9c9c",
            cursor: isPlacingOrder ? "not-allowed" : "pointer",
            opacity: isPlacingOrder ? 0.5 : 1,
            lineHeight: "17px",
          }}
        >
          Previous Step
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={
            isPlacingOrder ||
            !shippingAddress ||
            cartItems.length === 0 ||
            !agreedToTerms
          }
          style={{
            height: "45px",
            padding: "11px 83px",
            backgroundColor: "#1e3a8a",
            border: "none",
            borderRadius: "11px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: "white",
            cursor:
              isPlacingOrder ||
              !shippingAddress ||
              cartItems.length === 0 ||
              !agreedToTerms
                ? "not-allowed"
                : "pointer",
            opacity:
              isPlacingOrder ||
              !shippingAddress ||
              cartItems.length === 0 ||
              !agreedToTerms
                ? 0.5
                : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            lineHeight: "17px",
          }}
        >
          {isPlacingOrder ? (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                style={{
                  animation: "spin 1s linear infinite",
                }}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeOpacity="0.25"
                  strokeWidth="4"
                />
                <path
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="white"
                  strokeOpacity="0.75"
                />
              </svg>
              Placing Order...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
