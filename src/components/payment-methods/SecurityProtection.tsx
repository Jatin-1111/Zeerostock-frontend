"use client";

import { Shield, Lock } from "lucide-react";

export default function SecurityProtection() {
  return (
    <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="px-[17.5px] py-[17.5px]">
        {/* Title with Shield Icon */}
        <div className="flex items-center gap-[4.5px] mb-[31px]">
          <Shield className="text-[#2aae7a] w-[16.5px] h-[16.5px] stroke-2" />
          <p className="m-0 font-semibold text-[#0d1b2a] tracking-[0.25px] text-[13px] leading-[12px]">
            Security & Protection
          </p>
        </div>

        {/* Security Notice with Lock Icon */}
        <div className="flex items-center gap-[7.5px] rounded-[10px] border border-[#2aae7a] bg-[#eeffef] px-[12.5px] py-[12.5px] mb-[35px]">
          <Lock className="text-[#2aae7a] w-[17.5px] h-[17.5px] stroke-2 shrink-0" />
          <p className="m-0 font-medium text-[#9c9c9c] text-[10px] leading-normal">
            All payment information is encrypted and stored securely. Zeerostock
            uses industry-standard PCI DSS compliance to protect your financial
            data.
          </p>
        </div>

        {/* Security Features Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-x-[161.5px] gap-y-[26.25px]">
          {/* Feature 1 - 256-bit SSL Encryption */}
          <div className="flex items-center gap-[6px]">
            <div className="flex w-[25.5px] h-[20px] shrink-0 items-center justify-center p-[5px]">
              <svg width="15" height="15" viewBox="0 0 30 30" fill="none">
                <rect
                  x="5"
                  y="10"
                  width="20"
                  height="15"
                  rx="2"
                  className="stroke-[#2aae7a] stroke-2"
                />
                <path
                  d="M9 10V7C9 4.79086 10.7909 3 13 3H17C19.2091 3 21 4.79086 21 7V10"
                  className="stroke-[#2aae7a] stroke-2"
                />
                <circle cx="15" cy="17.5" r="2" className="fill-[#2aae7a]" />
              </svg>
            </div>
            <div className="flex flex-col gap-[7.5px]">
              <p className="m-0 font-medium text-[#0d1b2a] tracking-[0.25px] text-[15px] leading-[12px]">
                256-bit SSL Encryption
              </p>
              <p className="m-0 font-medium text-[#9c9c9c] tracking-[0.25px] text-[10px] leading-[14px]">
                Bank-level security
              </p>
            </div>
          </div>

          {/* Feature 2 - Escrow Protection */}
          <div className="flex items-center gap-[6px]">
            <div className="flex w-[25.5px] h-[20px] shrink-0 items-center justify-center p-[5px]">
              <svg width="15" height="15" viewBox="0 0 30 30" fill="none">
                <path
                  d="M15 3L6 7V14C6 19 10 23 15 27C20 23 24 19 24 14V7L15 3Z"
                  className="stroke-[#2aae7a] stroke-2"
                />
                <path
                  d="M11 15L14 18L20 12"
                  className="stroke-[#2aae7a] stroke-2 stroke-linecap-round stroke-linejoin-round"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[7.5px]">
              <p className="m-0 font-medium text-[#0d1b2a] tracking-[0.25px] text-[15px] leading-[12px]">
                Escrow Protection
              </p>
              <p className="m-0 font-medium text-[#9c9c9c] tracking-[0.25px] text-[10px] leading-[14px]">
                Funds held securely
              </p>
            </div>
          </div>

          {/* Feature 3 - PCI DSS Compliant */}
          <div className="flex items-center gap-[6px]">
            <div className="flex w-[25.5px] h-[20px] shrink-0 items-center justify-center p-[5px]">
              <svg width="15" height="15" viewBox="0 0 30 30" fill="none">
                <rect
                  x="5"
                  y="8"
                  width="20"
                  height="16"
                  rx="2"
                  className="stroke-[#2aae7a] stroke-2"
                />
                <path d="M5 13H25" className="stroke-[#2aae7a] stroke-2" />
                <rect
                  x="8"
                  y="18"
                  width="6"
                  height="3"
                  rx="1"
                  className="fill-[#2aae7a]"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[7.5px]">
              <p className="m-0 font-medium text-[#0d1b2a] tracking-[0.25px] text-[15px] leading-[12px]">
                PCI DSS Compliant
              </p>
              <p className="m-0 font-medium text-[#9c9c9c] tracking-[0.25px] text-[10px] leading-[14px]">
                Industry standard
              </p>
            </div>
          </div>

          {/* Feature 4 - Fraud Detection */}
          <div className="flex items-center gap-[6px]">
            <div className="flex w-[25.5px] h-[20px] shrink-0 items-center justify-center p-[5px]">
              <svg width="15" height="15" viewBox="0 0 30 30" fill="none">
                <circle
                  cx="15"
                  cy="15"
                  r="10"
                  className="stroke-[#2aae7a] stroke-2"
                />
                <path
                  d="M15 10V15L18 18"
                  className="stroke-[#2aae7a] stroke-2 stroke-linecap-round"
                />
                <circle cx="22" cy="8" r="3" className="fill-[#2aae7a]" />
              </svg>
            </div>
            <div className="flex flex-col gap-[7.5px]">
              <p className="m-0 font-medium text-[#0d1b2a] tracking-[0.25px] text-[15px] leading-[12px]">
                Fraud Detection
              </p>
              <p className="m-0 font-medium text-[#9c9c9c] tracking-[0.25px] text-[10px] leading-[14px]">
                24/7 monitoring
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
