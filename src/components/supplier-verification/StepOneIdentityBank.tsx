"use client";

import { VerificationFormData } from "@/types/verification";
import AnimatedDropdown from "@/components/ui/AnimatedDropdown";

interface StepOneProps {
  data: VerificationFormData;
  updateData: (section: string, data: Record<string, string>) => void;
}

// Dropdown options
const governmentIdOptions = [
  { value: "aadhar", label: "Aadhar Card" },
  { value: "pan", label: "PAN Card" },
  { value: "passport", label: "Passport" },
  { value: "driving", label: "Driving License" },
];

const proofOfAddressOptions = [
  { value: "aadhar", label: "Aadhar Card" },
  { value: "utility", label: "Utility Bill" },
  { value: "bank", label: "Bank Statement" },
  { value: "lease", label: "Lease Agreement" },
];

const bankNameOptions = [
  { value: "hdfc", label: "HDFC Bank" },
  { value: "icici", label: "ICICI Bank" },
  { value: "sbi", label: "State Bank of India" },
  { value: "axis", label: "Axis Bank" },
  { value: "kotak", label: "Kotak Mahindra Bank" },
  { value: "yes", label: "YES Bank" },
  { value: "idbi", label: "IDBI Bank" },
  { value: "pnb", label: "Punjab National Bank" },
];

export default function StepOneIdentityBank({
  data,
  updateData,
}: StepOneProps) {
  // Log data changes for debugging
  console.log("=== StepOneIdentityBank Data ===");
  console.log("Identity Verification:", {
    ownerName: data.identityVerification.ownerName,
    idCard: data.identityVerification.idCard,
    proofOfAddress: data.identityVerification.proofOfAddress,
  });
  console.log("Bank Account:", {
    bankName: data.bankAccount.bankName,
    accountHolderName: data.bankAccount.accountHolderName,
    accountNumber: data.bankAccount.accountNumber,
    ifscCode: data.bankAccount.ifscCode,
  });

  return (
    <div className="flex gap-3 w-full">
      {/* Identity Verification Section - Left */}
      <div className="bg-white rounded-[7px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col">
        <div className="border-b border-[#e5e5e5] px-3 py-2 shrink-0">
          <h2 className="text-[11px] font-semibold text-black">
            Identity Verification
          </h2>
        </div>

        <div className="px-3 py-4 space-y-4 flex-1">
          {/* Owner/Director Name */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
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
            <label className="block text-[9px] font-medium text-black mb-1.5">
              Government ID
            </label>
            <AnimatedDropdown
              options={governmentIdOptions}
              value={data.identityVerification.idCard}
              onChange={(value) =>
                updateData("identityVerification", { idCard: value })
              }
              placeholder="Select ID Type"
            />
          </div>

          {/* Proof of Address */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
              Proof of Address
            </label>
            <AnimatedDropdown
              options={proofOfAddressOptions}
              value={data.identityVerification.proofOfAddress}
              onChange={(value) =>
                updateData("identityVerification", {
                  proofOfAddress: value,
                })
              }
              placeholder="Select Proof Type"
            />
          </div>
        </div>
      </div>

      {/* Bank Account Section - Right */}
      <div className="bg-white rounded-[7px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col">
        <div className="border-b border-[#e5e5e5] px-3 py-2 flex-shrink-0">
          <h2 className="text-[11px] font-semibold text-black">Bank Account</h2>
        </div>

        <div className="px-3 py-4 space-y-4 flex-1">
          {/* Bank Name & Account Holder Name - Side by Side */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[9px] font-medium text-black mb-1.5">
                Bank Name
              </label>
              <AnimatedDropdown
                options={bankNameOptions}
                value={data.bankAccount.bankName}
                onChange={(value) =>
                  updateData("bankAccount", { bankName: value })
                }
                placeholder="Select Bank"
              />
            </div>

            <div className="flex-1 min-w-[120px]">
              <label className="block text-[9px] font-medium text-black mb-1.5">
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
                className="w-full h-[33px] px-2.5 text-[11px] border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
              />
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
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
            <label className="block text-[9px] font-medium text-black mb-1.5">
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
