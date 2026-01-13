"use client";

import { VerificationFormData } from "@/types/verification";

interface StepOneProps {
  data: VerificationFormData;
  updateData: (section: string, data: Record<string, string>) => void;
}

export default function StepOneIdentityBank({
  data,
  updateData,
}: StepOneProps) {
  return (
    <div className="flex gap-3 w-full">
      {/* Identity Verification Section - Left */}
      <div className="bg-white rounded-[7px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-[#e5e5e5] px-3 py-2 flex-shrink-0">
          <h2 className="text-xs font-semibold text-black">
            Identity Verification
          </h2>
        </div>

        <div className="px-3 py-4 space-y-4 flex-1 overflow-y-auto">
          {/* Owner/Director Name */}
          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Owner/Director Name
            </label>
            <input
              type="text"
              placeholder="Sarah Johnson"
              value={data.identityVerification.ownerName}
              onChange={(e) =>
                updateData("identityVerification", {
                  ownerName: e.target.value,
                })
              }
              className="w-full h-[33px] px-2.5 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
            />
          </div>

          {/* Government ID */}
          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Government ID
            </label>
            <div className="relative">
              <select
                value={data.identityVerification.idCard}
                onChange={(e) =>
                  updateData("identityVerification", { idCard: e.target.value })
                }
                className="w-full h-[33px] px-2.5 pr-8 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] bg-white text-black appearance-none"
              >
                <option value="">Aadhar Card</option>
                <option value="pan">PAN Card</option>
                <option value="passport">Passport</option>
                <option value="driving">Driving License</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M5 5L0 0H10L5 5Z" fill="#9c9c9c" />
                </svg>
              </div>
            </div>
          </div>

          {/* Proof of Address */}
          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Proof of Address
            </label>
            <div className="relative">
              <select
                value={data.identityVerification.proofOfAddress}
                onChange={(e) =>
                  updateData("identityVerification", {
                    proofOfAddress: e.target.value,
                  })
                }
                className="w-full h-[33px] px-2.5 pr-8 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] bg-white text-black appearance-none"
              >
                <option value="">Aadhar Card</option>
                <option value="utility">Utility Bill</option>
                <option value="bank">Bank Statement</option>
                <option value="lease">Lease Agreement</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M5 5L0 0H10L5 5Z" fill="#9c9c9c" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Section - Right */}
      <div className="bg-white rounded-[7px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-[#e5e5e5] px-3 py-2 flex-shrink-0">
          <h2 className="text-xs font-semibold text-black">Bank Account</h2>
        </div>

        <div className="px-3 py-4 space-y-4 flex-1 overflow-y-auto">
          {/* Bank Name & Account Holder Name - Side by Side */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-medium text-black mb-1.5">
                Bank Name
              </label>
              <div className="relative">
                <select
                  value={data.bankAccount.bankName}
                  onChange={(e) =>
                    updateData("bankAccount", { bankName: e.target.value })
                  }
                  className="w-full h-[33px] px-2.5 pr-8 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] bg-white text-black appearance-none"
                >
                  <option value="">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="axis">Axis Bank</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                    <path d="M5 5L0 0H10L5 5Z" fill="#9c9c9c" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-medium text-black mb-1.5">
                Account Holder Name
              </label>
              <input
                type="text"
                placeholder="Michael Scott"
                value={data.bankAccount.accountHolderName}
                onChange={(e) =>
                  updateData("bankAccount", {
                    accountHolderName: e.target.value,
                  })
                }
                className="w-full h-[33px] px-2.5 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
              />
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              Account Number
            </label>
            <input
              type="text"
              placeholder="0895 1434 3414 1143"
              value={data.bankAccount.accountNumber}
              onChange={(e) =>
                updateData("bankAccount", { accountNumber: e.target.value })
              }
              className="w-full h-[33px] px-2.5 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
            />
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-xs font-medium text-black mb-1.5">
              IFSC Code
            </label>
            <input
              type="text"
              placeholder="0895 1434 3414 1143"
              value={data.bankAccount.ifscCode}
              onChange={(e) =>
                updateData("bankAccount", { ifscCode: e.target.value })
              }
              className="w-full h-[33px] px-2.5 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
