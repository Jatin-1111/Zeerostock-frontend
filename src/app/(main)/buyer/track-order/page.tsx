"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
    <div className="flex min-h-screen flex-col items-center bg-[#eefbf6] px-[45px] py-[34px]">
      {/* Header Icon */}
      <div className="mb-[17px] flex items-center justify-center rounded-[150px] bg-[#eeffef] p-[14px] shadow-[0px_0px_1.5px_0px_rgba(0,0,0,0.25)]">
        <svg
          width="34"
          height="34"
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
      <div className="mb-[25px] max-w-[360px] text-center">
        <h1 className="mb-[8.5px] text-[22.5px] font-semibold leading-normal text-[#0d1b2a]">
          Track Your Order
        </h1>
        <p className="text-[13.5px] font-medium leading-normal text-[#9c9c9c]">
          Enter your order ID to see real-time tracking information
        </p>
      </div>

      {/* Main Card */}
      <div className="w-[619px] max-w-[90vw] rounded-[11px] bg-white px-[17px] py-[27px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]">
        {/* Order ID Section */}
        <form onSubmit={handleSubmit}>
          <div className="mb-[22.5px]">
            <label className="mb-[8.5px] block text-[13.5px] font-medium text-[#0d1b2a]">
              Order ID
            </label>
            <div className="flex gap-[8.5px]">
              <input
                type="text"
                placeholder="e.g., ORD-2025-000005"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="h-[32px] flex-1 rounded-[5.5px] border border-[#bebebe] pl-[9px] text-[9px] text-[#9c9c9c] outline-none"
              />
              <button
                type="submit"
                className="flex h-[32px] w-[129px] cursor-pointer items-center justify-center gap-[5.5px] rounded-[8.5px] border-none bg-[#1e3a8a] text-[11px] font-semibold text-white"
              >
                <svg
                  width="9.5"
                  height="9.5"
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
          <div className="mb-[22.5px] rounded-[11px] bg-[#c0daff] px-[17px] py-[14px]">
            <div className="mb-[8.5px] flex items-center gap-[5.5px]">
              <svg
                width="12.5"
                height="12.5"
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
              <h3 className="m-0 text-[11px] font-semibold text-[#085396]">
                Where to find your Tracking ID?
              </h3>
            </div>
            <ul className="m-0 pl-[17px] text-[11px] leading-[17px] text-[#085396]">
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
            <h3 className="mb-[11px] text-[12.5px] font-medium text-[#0d1b2a]">
              Quick Actions
            </h3>
            <div className="flex justify-between gap-[55px]">
              <button
                type="button"
                onClick={() => router.push("/buyer/orders")}
                className="flex flex-1 cursor-pointer items-center justify-center gap-[5.5px] rounded-[8.5px] border border-[#9c9c9c] bg-white px-[3px] py-[5.5px] text-[11px] font-medium text-[#9c9c9c]"
              >
                <svg
                  width="12.5"
                  height="12.5"
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
                className="flex flex-1 cursor-pointer items-center justify-center gap-[5.5px] rounded-[8.5px] border border-[#9c9c9c] bg-white px-[3px] py-[5.5px] text-[11px] font-medium text-[#9c9c9c]"
              >
                <svg
                  width="12.5"
                  height="12.5"
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
