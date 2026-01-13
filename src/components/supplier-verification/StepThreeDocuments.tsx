"use client";

import { useState, useRef } from "react";
import { Circle, CheckCircle, Upload, X, Loader2, Info } from "lucide-react";
import Link from "next/link";
import { VerificationFormData } from "@/types/verification";
import { supplierVerificationService } from "@/services/supplierVerification.service";

interface StepThreeProps {
  data: VerificationFormData;
  updateData: (section: string, data: Record<string, string | null>) => void;
}

type DocumentKey =
  | "governmentId"
  | "proofOfAddress"
  | "businessLicense"
  | "certificateOfIncorporation"
  | "taxRegistration"
  | "iso9001"
  | "industryLicenses"
  | "auditReports";

interface DocumentConfig {
  key: DocumentKey;
  label: string;
  description: string;
  required: boolean;
}

const mandatoryDocs: DocumentConfig[] = [
  {
    key: "governmentId",
    label: "Government ID",
    description: "Passport or National ID",
    required: true,
  },
  {
    key: "certificateOfIncorporation",
    label: "Business Registration Certificate",
    description: "Certificate of Incorporation",
    required: true,
  },
  {
    key: "taxRegistration",
    label: "Tax Registration",
    description: "EIN/TIN Certificate",
    required: true,
  },
  {
    key: "proofOfAddress",
    label: "Proof of Address",
    description: "Utility Bill or Lease Agreement",
    required: true,
  },
  {
    key: "businessLicense",
    label: "Business License",
    description: "Trade License or Operating Permit",
    required: true,
  },
];

const optionalDocs: DocumentConfig[] = [
  {
    key: "iso9001",
    label: "ISO 9001 Certification",
    description: "Quality management certification",
    required: false,
  },
  {
    key: "industryLicenses",
    label: "Industry-Specific Licenses",
    description: "Sector-specific permits",
    required: false,
  },
  {
    key: "auditReports",
    label: "Third-Party Audit Reports",
    description: "Independent verification reports",
    required: false,
  },
];

export default function StepThreeDocuments({
  data,
  updateData,
}: StepThreeProps) {
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileSelect = async (docKey: DocumentKey, file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, JPEG, and PNG files are allowed");
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploading(docKey);
    try {
      console.log(`Uploading ${docKey}:`, {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      const response = await supplierVerificationService.uploadDocument(
        file,
        docKey
      );

      console.log("Upload response:", response);

      if (response.success && response.data?.url) {
        updateData("documents", { [docKey]: response.data.url });
        console.log(`Successfully uploaded ${docKey}:`, response.data.url);
      } else {
        const errorMsg = response.message || "Failed to upload document";
        console.error("Upload failed:", errorMsg);
        alert(errorMsg);
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      const errorMsg =
        error.message ||
        error.errorMessage ||
        "Failed to upload document. Please try again.";
      alert(errorMsg);
    } finally {
      setUploading(null);
    }
  };

  const handleRemoveDocument = (docKey: DocumentKey) => {
    updateData("documents", { [docKey]: null });
    if (fileInputRefs.current[docKey]) {
      fileInputRefs.current[docKey]!.value = "";
    }
  };

  const renderDocumentRow = (doc: DocumentConfig) => {
    const isUploaded = !!data.documents[doc.key];
    const isUploading = uploading === doc.key;

    return (
      <div
        key={doc.key}
        className="flex items-start py-3 border-b border-[#e5e5e5] last:border-b-0"
      >
        <div className="flex items-start gap-0 flex-1">
          <div className="w-5 h-5 mt-0.5">
            {isUploaded ? (
              <CheckCircle
                className="w-full h-full text-[#2aae7a]"
                strokeWidth={2.5}
              />
            ) : (
              <Info className="w-full h-full text-[#9d9d9d]" />
            )}
          </div>
          <div className="flex-1 ml-5">
            <div className="text-sm font-medium text-black leading-tight">
              {doc.label}
            </div>
            <div className="text-xs text-[#9d9d9d] mt-1.5 leading-tight">
              {isUploaded ? (
                <span>Uploaded on Oct 24, 2025 / {doc.key}.pdf</span>
              ) : (
                <span>Please upload your {doc.label.toLowerCase()}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {isUploaded ? (
            <div className="bg-[#eeffef] px-2.5 py-1 rounded-[13px] flex items-center gap-1.5">
              <CheckCircle
                className="w-4 h-4 text-secondary"
                strokeWidth={2.5}
              />
              <span className="text-sm font-medium text-[#2aae7a]">
                Uploaded
              </span>
            </div>
          ) : (
            <>
              <input
                ref={(el) => {
                  fileInputRefs.current[doc.key] = el;
                }}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(doc.key, file);
                }}
                className="hidden"
                id={`file-${doc.key}`}
              />
              <label
                htmlFor={`file-${doc.key}`}
                className={`px-2.5 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1 rounded-[7px] ${
                  isUploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                  </>
                )}
              </label>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-3">
      {/* Left Column - Documents */}
      <div className="flex-1 space-y-3">
        {/* Mandatory Documents */}
        <div className="bg-white rounded-[13px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="border-b border-[#e5e5e5] px-3 py-2">
            <h2 className="text-xs font-semibold text-black">
              Mandatory Documents
            </h2>
          </div>
          <div className="px-3 h-full overflow-y-auto">
            {mandatoryDocs.map((doc) => renderDocumentRow(doc))}
          </div>
        </div>

        {/* Additional Verifications (Optional) */}
        <div className="bg-white rounded-[13px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="border-b border-[#e5e5e5] px-3 py-2 flex items-center gap-2">
            <h2 className="text-xs font-semibold text-black">
              Additional Verification
            </h2>
            <span className="text-xs font-medium text-[#7e7e7e]">
              (Optional)
            </span>
          </div>
          <div className="px-3 max-h-52 overflow-y-auto">
            {optionalDocs.map((doc) => renderDocumentRow(doc))}
          </div>
        </div>
      </div>

      {/* Right Column - Sidebar Sections */}
      <div className="w-72 space-y-3">
        {/* Verification Impact */}
        <div className="bg-[#f9fffd] rounded-[13px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="px-3 pt-3 pb-2">
            <h3 className="text-sm font-semibold text-[#0d1b2a]">
              Verification Impact
            </h3>
          </div>
          <div className="px-2 pb-2 space-y-2">
            <div className="bg-[#eeffef] rounded-[10px] h-[60px] flex flex-col items-center justify-center text-[#2aae7a]">
              <div className="text-xl font-semibold leading-none">3.5x</div>
              <div className="text-xs font-semibold mt-1">
                Higher Response Rate
              </div>
            </div>
            <div className="bg-[#dff3ff] rounded-[10px] h-[60px] flex flex-col items-center justify-center text-[#507df0]">
              <div className="text-xl font-semibold leading-none">2.8x</div>
              <div className="text-xs font-semibold mt-1">
                Most Listing Views
              </div>
            </div>
            <div className="bg-[#ffe5e5] rounded-[10px] h-[60px] flex flex-col items-center justify-center text-[#f05050]">
              <div className="text-xl font-semibold leading-none">65%</div>
              <div className="text-xs font-semibold mt-1">
                Higher Conversion
              </div>
            </div>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="bg-[#f9fffd] rounded-[13px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="px-3 pt-3 pb-2">
            <h3 className="text-sm font-semibold text-[#0d1b2a]">Need Help?</h3>
          </div>
          <div className="px-3 pb-3">
            <p className="text-xs font-medium text-[#9c9c9c] mb-3 leading-normal">
              Our verification team is here to assist you through the process
            </p>
            <Link href="/helpdesk">
              <button className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-semibold text-xs py-2 rounded-[7px] flex items-center justify-center gap-1.5 mb-2">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 15v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Contact Support
              </button>
            </Link>
            <Link href="/help-support">
              <button className="w-full bg-white border border-[#9c9c9c] text-[#9c9c9c] font-semibold text-xs py-2 rounded-[7px] flex items-center justify-center gap-1.5">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 2a2 2 0 00-2 2v12l5-3 5 3V4a2 2 0 00-2-2H9z" />
                </svg>
                View Guidelines
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
