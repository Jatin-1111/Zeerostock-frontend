"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error("Please enter an order ID");
      return;
    }

    router.push(`/buyer/track-order/${orderId.trim()}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eefbf6",
        padding: "45px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header Icon */}
      <div
        style={{
          backgroundColor: "#eeffef",
          borderRadius: "200px",
          padding: "18.75px",
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.25)",
          marginBottom: "22.5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="45"
          height="45"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 37.5V20L22.5 12.5L37.5 20V37.5"
            stroke="#2aae7a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 20L22.5 27.5M22.5 27.5L37.5 20M22.5 27.5V45"
            stroke="#2aae7a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37.5 45H52.5V30L45 27.5"
            stroke="#2aae7a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="45" cy="37.5" r="3.75" fill="#2aae7a" />
          <circle cx="45" cy="37.5" r="3.75" fill="#2aae7a" />
        </svg>
      </div>

      {/* Title and Description */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "33.75px",
          maxWidth: "480.75px",
        }}
      >
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "30px",
            color: "#0d1b2a",
            marginBottom: "11.25px",
            lineHeight: "normal",
          }}
        >
          Track Your Order
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "18px",
            color: "#9c9c9c",
            lineHeight: "normal",
          }}
        >
          Enter your order ID to see real-time tracking information
        </p>
      </div>

      {/* Main Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.25)",
          width: "825px",
          maxWidth: "90vw",
          padding: "36px 22.5px",
        }}
      >
        {/* Order ID Section */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                color: "#0d1b2a",
                marginBottom: "11.25px",
                display: "block",
              }}
            >
              Order ID
            </label>
            <div style={{ display: "flex", gap: "11.25px" }}>
              <input
                type="text"
                placeholder="e.g., ORD-2025-000005"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{
                  flex: 1,
                  height: "42px",
                  border: "1px solid #bebebe",
                  borderRadius: "7.5px",
                  paddingLeft: "12px",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "12px",
                  color: "#9c9c9c",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#1e3a8a",
                  color: "white",
                  width: "172.5px",
                  height: "42px",
                  borderRadius: "11.25px",
                  border: "none",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7.5px",
                }}
              >
                <svg
                  width="12.6"
                  height="12.6"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="6"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 12L15.5 15.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Track
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div
            style={{
              backgroundColor: "#c0daff",
              borderRadius: "15px",
              padding: "18.75px 22.5px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7.5px",
                marginBottom: "11.25px",
              }}
            >
              <svg
                width="16.5"
                height="16.5"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="10"
                  stroke="#085396"
                  strokeWidth="2"
                />
                <path
                  d="M11 6V11M11 16H11.01"
                  stroke="#085396"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#085396",
                  margin: 0,
                }}
              >
                Where to find your Tracking ID?
              </h3>
            </div>
            <ul
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                color: "#085396",
                lineHeight: "22.5px",
                paddingLeft: "22.5px",
                margin: 0,
              }}
            >
              <li>Check your order confirmation email</li>
              <li>
                Find it in your account dashboard under &quot;My Orders&quot;
              </li>
              <li>
                Look for the format: ZEERO-YYYYMMDDHHMMSS-XXXXX (e.g.,
                ZEERO-20251223223348-04843)
              </li>
            </ul>
          </div>

          {/* Quick Actions Section */}
          <div>
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "16.5px",
                color: "#0d1b2a",
                marginBottom: "15px",
              }}
            >
              Quick Actions
            </h3>
            <div
              style={{
                display: "flex",
                gap: "73.5px",
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                onClick={() => router.push("/buyer/orders")}
                style={{
                  flex: 1,
                  border: "1px solid #9c9c9c",
                  borderRadius: "11.25px",
                  backgroundColor: "white",
                  padding: "7.5px 3.75px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#9c9c9c",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7.5px",
                }}
              >
                <svg
                  width="16.5"
                  height="16.5"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6H19M3 12H19M3 18H19"
                    stroke="#9c9c9c"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                View All Orders
              </button>
              <button
                type="button"
                onClick={() => router.push("/buyer/support")}
                style={{
                  flex: 1,
                  border: "1px solid #9c9c9c",
                  borderRadius: "11.25px",
                  backgroundColor: "white",
                  padding: "7.5px 3.75px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#9c9c9c",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7.5px",
                }}
              >
                <svg
                  width="16.5"
                  height="16.5"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 11.5C20 16.1944 16.1944 20 11.5 20C10.3381 20 9.23103 19.7593 8.22701 19.3263L3 21L4.6737 15.773C4.24071 14.769 4 13.6619 4 12.5C4 7.80558 7.80558 4 12.5 4C15.8395 4 18.6667 6.13358 19.6457 9.12409"
                    stroke="#9c9c9c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Contact Support
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
