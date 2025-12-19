"use client";

import { useState, useRef } from "react";
import { Circle, CheckCircle, Upload, X, Loader2 } from "lucide-react";
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
      const response = await supplierVerificationService.uploadDocument(
        file,
        docKey
      );
      if (response.success && response.data?.url) {
        updateData("documents", { [docKey]: response.data.url });
      } else {
        alert(response.message || "Failed to upload document");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(error.message || "Failed to upload document");
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
        className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
      >
        <div className="flex items-center gap-3 flex-1">
          {isUploaded ? (
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 shrink-0" />
          )}
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {doc.label}
              {doc.required && <span className="text-red-500 ml-1">*</span>}
            </div>
            <div className="text-xs text-gray-500">{doc.description}</div>
            {isUploaded && (
              <div className="text-xs text-green-600 mt-1">
                ✓ Uploaded successfully
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isUploaded ? (
            <>
              <a
                href={data.documents[doc.key] || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View
              </a>
              <button
                onClick={() => handleRemoveDocument(doc.key)}
                className="p-1 hover:bg-gray-100 rounded"
                title="Remove document"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </>
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
                className={`px-4 py-1 text-sm font-medium cursor-pointer flex items-center gap-2 ${
                  isUploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload
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
    <div className="grid grid-cols-[2fr_1fr] gap-6">
      {/* Left Column - Documents */}
      <div className="space-y-6">
        {/* Mandatory Documents */}
        <div className="border-2 border-gray-900 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-6">
            Mandatory Documents
          </h2>
          <div className="space-y-4">
            {mandatoryDocs.map((doc) => renderDocumentRow(doc))}
          </div>
        </div>

        {/* Additional Verifications (Optional) */}
        <div className="border-2 border-gray-900 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-2">
            Additional Verifications
          </h2>
          <p className="text-xs text-gray-500 mb-6">(Optional)</p>
          <div className="space-y-4">
            {optionalDocs.map((doc) => renderDocumentRow(doc))}
          </div>
        </div>
      </div>

      {/* Right Column - Sidebar Sections */}
      <div className="space-y-6">
        {/* Verification Impact */}
        <div className="border-2 border-gray-900 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Verification Impact
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900">3.5x</div>
              <div className="text-xs text-gray-600 mt-1">
                Higher Response Rate
              </div>
            </div>
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900">2.8x</div>
              <div className="text-xs text-gray-600 mt-1">
                Most Listing Views
              </div>
            </div>
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900">65%</div>
              <div className="text-xs text-gray-600 mt-1">
                Higher Conversion
              </div>
            </div>
          </div>
        </div>

        {/* File Requirements */}
        <div className="border-2 border-gray-900 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            File Requirements
          </h3>
          <ul className="text-xs text-gray-600 space-y-2">
            <li>• Accepted formats: PDF, JPG, PNG</li>
            <li>• Maximum file size: 10MB</li>
            <li>• Documents must be clear and legible</li>
            <li>• All text should be in English or translated</li>
          </ul>
        </div>

        {/* Need Help Section */}
        <div className="border-2 border-gray-900 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-xs text-gray-600 mb-4">
            Our team is here to assist you with the verification process.
          </p>
          <button className="w-full bg-black text-white py-2 text-sm mb-2 hover:bg-gray-800">
            Contact Support
          </button>
          <button className="w-full text-sm text-gray-600 underline hover:text-gray-900">
            View Guidelines
          </button>
        </div>
      </div>
    </div>
  );
}
