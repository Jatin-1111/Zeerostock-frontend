"use client";

import {
  Shield,
  AlertCircle,
  CheckCircle,
  Upload,
  ExternalLink,
} from "lucide-react";

interface VerificationStatusViewProps {
  status: any;
}

// Helper function to mask account number
const maskAccountNumber = (accountNumber: string) => {
  if (!accountNumber) return "";
  const last4 = accountNumber.slice(-4);
  return `****${last4}`;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// DocumentRow component - matches wireframe design
const DocumentRow = ({
  label,
  uploadedDate,
  status,
  url,
  optional = false,
}: {
  label: string;
  uploadedDate: string;
  status: string;
  url: string;
  optional?: boolean;
}) => (
  <div className="bg-gray-50 p-4 flex items-center justify-between">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
      </div>
      <p className="text-xs text-blue-600">
        Uploaded: {formatDate(uploadedDate)}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <span
        className={`px-3 py-1 text-xs font-medium rounded ${
          status === "approved"
            ? "bg-green-500 text-white"
            : "bg-yellow-500 text-white"
        }`}
      >
        {status === "approved" ? "Verified" : "Pending"}
      </span>
    </div>
  </div>
);

// BankInfoRow component
const BankInfoRow = ({
  label,
  value,
  verified = false,
}: {
  label: string;
  value: string;
  verified?: boolean;
}) => (
  <div className="bg-gray-50 p-4 flex items-center justify-between">
    <div className="flex-1">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm font-medium text-gray-900">{value}</div>
    </div>
    {verified && (
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    )}
  </div>
);

export default function VerificationStatusView({
  status,
}: VerificationStatusViewProps) {
  const { verification, role } = status;

  // Calculate progress dynamically
  const calculateProgress = () => {
    if (!verification) return { progress: 0, completedSteps: 0 };

    // Only count progress if status is approved
    if (status.status !== "approved") {
      return { progress: 0, completedSteps: 0 };
    }

    let completedSteps = 0;
    const totalSteps = 5; // Business Info, Identity, Operational, Documents, Bank

    // Step 1: Business Information (always completed if verification exists)
    if (verification.legal_business_name) completedSteps++;

    // Step 2: Identity Verification
    if (verification.owner_full_name && verification.government_id_document_url)
      completedSteps++;

    // Step 3: Operational Information
    if (verification.primary_business_address && verification.business_phone)
      completedSteps++;

    // Step 4: Business Documents
    if (
      verification.business_license_url ||
      verification.certificate_of_incorporation_url
    )
      completedSteps++;

    // Step 5: Bank Account
    if (verification.bank_name && verification.account_number) completedSteps++;

    const progress = Math.round((completedSteps / totalSteps) * 100);
    return { progress, completedSteps };
  };

  const { progress, completedSteps } = calculateProgress();

  // Get status configuration
  const getStatusConfig = () => {
    switch (status.status) {
      case "approved":
        return {
          color: "green",
          bgClass: "bg-green-50 border-green-300",
          textClass: "text-green-800",
          iconClass: "text-green-600",
          badgeClass: "bg-green-100 text-green-800 border-green-300",
          label: "Approved",
          message:
            "Congratulations! Your supplier verification has been approved. You can now access all supplier features.",
        };
      case "rejected":
        return {
          color: "red",
          bgClass: "bg-red-50 border-red-300",
          textClass: "text-red-800",
          iconClass: "text-red-600",
          badgeClass: "bg-red-100 text-red-800 border-red-300",
          label: "Rejected",
          message: `Your verification was rejected. ${
            role?.rejection_reason
              ? `Reason: ${role.rejection_reason}`
              : "Please contact support for more information."
          }`,
        };
      case "under_review":
        return {
          color: "blue",
          bgClass: "bg-blue-50 border-blue-300",
          textClass: "text-blue-800",
          iconClass: "text-blue-600",
          badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
          label: "Under Review",
          message:
            "Your verification submission is being reviewed by our team. This usually takes 2-3 business days. You will be notified once the review is complete.",
        };
      default:
        return {
          color: "yellow",
          bgClass: "bg-yellow-50 border-yellow-300",
          textClass: "text-yellow-800",
          iconClass: "text-yellow-600",
          badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-300",
          label: "Pending",
          message:
            "Your verification is pending review. Our team will review your submission shortly.",
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Get documents list dynamically
  const getDocuments = () => {
    const docs = [];
    if (verification?.business_license_url) {
      docs.push({
        label: "Business License",
        url: verification.business_license_url,
        required: true,
      });
    }
    if (verification?.certificate_of_incorporation_url) {
      docs.push({
        label: "Certificate of Incorporation",
        url: verification.certificate_of_incorporation_url,
        required: true,
      });
    }
    if (verification?.tax_registration_certificate_url) {
      docs.push({
        label: "Tax Registration Certificate",
        url: verification.tax_registration_certificate_url,
        required: true,
      });
    }
    if (verification?.iso_certificate_url) {
      docs.push({
        label: "Industry Certifications (ISO/CE)",
        url: verification.iso_certificate_url,
        required: false,
      });
    }
    return docs;
  };

  const documents = getDocuments();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-gray-900" />
            <h1 className="text-3xl font-bold text-gray-900">
              Supplier Verification
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Complete verification to unlock premium features and build buyer
            trust
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-white border border-gray-300 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-base font-semibold text-gray-900">
                  Verification Progress
                </h2>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    status.status === "approved"
                      ? "bg-green-500 text-white"
                      : status.status === "under_review"
                      ? "bg-blue-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {status.status === "approved"
                    ? "Verified"
                    : status.status === "under_review"
                    ? "Under Review"
                    : "In Progress"}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {progress}% Complete - {completedSteps} of 5 sections verified
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">{progress}%</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 h-3 rounded-sm overflow-hidden">
              <div
                className="bg-gray-900 h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div
          className={`mb-6 p-4 flex items-start gap-3 border ${statusConfig.bgClass}`}
        >
          <AlertCircle
            className={`w-5 h-5 shrink-0 mt-0.5 ${statusConfig.iconClass}`}
          />
          <p className={`text-sm ${statusConfig.textClass}`}>
            {statusConfig.message}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Left Column - Verification Details */}
          <div className="flex-1 space-y-6">
            {verification && (
              <>
                {/* Business Information */}
                {verification.legal_business_name && (
                  <div className="border border-gray-300">
                    <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
                      <h2 className="text-base font-semibold text-gray-900 flex items-center gap-3">
                        <span className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </span>
                        Business Information
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          status.status === "approved"
                            ? "bg-green-500 text-white"
                            : status.status === "under_review"
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {status.status === "approved"
                          ? "Verified"
                          : status.status === "under_review"
                          ? "Under Review"
                          : "Pending"}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      {verification.legal_business_name && (
                        <InfoRow
                          label="Legal Business Name"
                          value={verification.legal_business_name}
                          verified={status.status === "approved"}
                        />
                      )}
                      {verification.business_registration_number && (
                        <InfoRow
                          label="Registration Number"
                          value={verification.business_registration_number}
                          verified={status.status === "approved"}
                        />
                      )}
                      {verification.business_type && (
                        <InfoRow
                          label="Business Type"
                          value={verification.business_type}
                          verified={status.status === "approved"}
                        />
                      )}
                      {verification.business_tax_id && (
                        <InfoRow
                          label="Tax ID"
                          value={verification.business_tax_id}
                          verified={status.status === "approved"}
                        />
                      )}
                      {verification.establishment_year && (
                        <InfoRow
                          label="Est. Year"
                          value={verification.establishment_year}
                          verified={status.status === "approved"}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Identity Verification */}
                {verification.owner_full_name && (
                  <div className="border border-gray-300">
                    <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
                      <h2 className="text-base font-semibold text-gray-900 flex items-center gap-3">
                        <span className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </span>
                        Identity Verification
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          status.status === "approved"
                            ? "bg-green-500 text-white"
                            : status.status === "under_review"
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {status.status === "approved"
                          ? "Verified"
                          : status.status === "under_review"
                          ? "Under Review"
                          : "Pending"}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      {verification.owner_full_name && (
                        <InfoRow
                          label="Owner/Director Name"
                          value={verification.owner_full_name}
                          verified={status.status === "approved"}
                        />
                      )}
                      {verification.government_id_document_url && (
                        <div className="bg-gray-50 p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">
                              Government ID
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              Uploaded -{" "}
                              {status.status === "approved"
                                ? "Verified"
                                : "Pending Review"}
                            </div>
                          </div>
                          <a
                            href={verification.government_id_document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded hover:bg-gray-800"
                          >
                            View
                          </a>
                        </div>
                      )}
                      {verification.proof_of_address_document_url && (
                        <div className="bg-gray-50 p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">
                              Proof of Address
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              Uploaded -{" "}
                              {status.status === "approved"
                                ? "Verified"
                                : "Pending Review"}
                            </div>
                          </div>
                          <a
                            href={verification.proof_of_address_document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded hover:bg-gray-800"
                          >
                            View
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Operational Information */}
                {verification.primary_business_address && (
                  <div className="border border-gray-300">
                    <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
                      <h2 className="text-base font-semibold text-gray-900 flex items-center gap-3">
                        <span className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </span>
                        Operational Information
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          status.status === "approved"
                            ? "bg-green-500 text-white"
                            : status.status === "under_review"
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {status.status === "approved"
                          ? "Verified"
                          : status.status === "under_review"
                          ? "Under Review"
                          : "Pending"}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      {verification.primary_business_address && (
                        <InfoRow
                          label="Primary Business Address"
                          value={verification.primary_business_address}
                          verified={status.status === "approved"}
                        />
                      )}
                      <InfoRow
                        label="Warehouse Locations"
                        value="2 verified locations"
                        verified={status.status === "approved"}
                      />
                      {verification.business_phone && (
                        <InfoRow
                          label="Business Phone"
                          value={verification.business_phone}
                          verified={status.status === "approved"}
                        />
                      )}
                      {verification.business_email && (
                        <InfoRow
                          label="Business Email"
                          value={verification.business_email}
                          verified={status.status === "approved"}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Business Documents */}
                {documents.length > 0 && (
                  <div className="border border-gray-300">
                    <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
                      <h2 className="text-base font-semibold text-gray-900 flex items-center gap-3">
                        <span className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                          4
                        </span>
                        Business Documents
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          status.status === "approved"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {status.status === "approved" ? "Verified" : "Pending"}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      {documents.map((doc, index) => (
                        <DocumentRow
                          key={index}
                          label={doc.label}
                          uploadedDate={
                            verification.submitted_at || verification.updated_at
                          }
                          status={status.status}
                          url={doc.url}
                          optional={!doc.required}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Bank Account Verification */}
                {verification.bank_name && verification.account_number && (
                  <div className="border border-gray-300">
                    <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
                      <h2 className="text-base font-semibold text-gray-900 flex items-center gap-3">
                        <span className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                          5
                        </span>
                        Bank Account Verification
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          status.status === "approved"
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {status.status === "approved"
                          ? "Verified"
                          : "Submitted"}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      {verification.bank_name && (
                        <BankInfoRow
                          label="Bank Name"
                          value={verification.bank_name}
                          verified={status.status === "approved"}
                        />
                      )}
                      {verification.account_number && (
                        <BankInfoRow
                          label="Account Number"
                          value={maskAccountNumber(verification.account_number)}
                          verified={status.status === "approved"}
                        />
                      )}
                      {verification.account_holder_name && (
                        <BankInfoRow
                          label="Account Holder"
                          value={verification.account_holder_name}
                          verified={status.status === "approved"}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Verifications (Optional) */}
                <div className="border border-gray-300">
                  <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
                    <h2 className="text-base font-semibold text-gray-900 flex items-center gap-3">
                      <span className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                        5
                      </span>
                      Additional Verifications (Optional)
                    </h2>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded ${
                        status.status === "approved"
                          ? "bg-green-500 text-white"
                          : status.status === "under_review"
                          ? "bg-blue-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {status.status === "approved"
                        ? "Verified"
                        : status.status === "under_review"
                        ? "Under Review"
                        : "Pending"}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="bg-gray-50 p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          ISO 9001 Certification
                        </div>
                        <div className="text-xs text-gray-500">
                          Adds credibility to quality management
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded hover:bg-gray-800">
                        Upload
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          Industry-Specific Licenses
                        </div>
                        <div className="text-xs text-gray-500">
                          Relevant to your product categories
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded hover:bg-gray-800">
                        Upload
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          Third-Party Audit Reports
                        </div>
                        <div className="text-xs text-gray-500">
                          Strengthens buyer confidence
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded hover:bg-gray-800">
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Benefits & Help */}
          <div className="w-80 space-y-6">
            {/* Verification Benefits */}
            <div className="border border-gray-300">
              <div className="bg-white p-4 border-b border-gray-300">
                <h3 className="text-base font-semibold text-gray-900">
                  Verification Benefits
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 border-2 border-gray-900 rounded flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Trusted Badge
                    </h4>
                    <p className="text-xs text-gray-600">
                      Verified supplier badge on all listings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 border-2 border-gray-900 rounded flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Higher Visibility
                    </h4>
                    <p className="text-xs text-gray-600">
                      Verified suppliers appear higher in search results
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 border-2 border-gray-900 rounded flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Increased Trust
                    </h4>
                    <p className="text-xs text-gray-600">
                      Buyers prefer verified suppliers by 3.5x
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 border-2 border-gray-900 rounded flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Higher Limits
                    </h4>
                    <p className="text-xs text-gray-600">
                      Access to longer transaction limits
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Impact */}
            <div className="border border-gray-300">
              <div className="bg-white p-4 border-b border-gray-300">
                <h3 className="text-base font-semibold text-gray-900">
                  Verification Impact
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-green-100 p-6 text-center border border-green-200">
                  <p className="text-4xl font-bold text-green-600 mb-1">3.5x</p>
                  <p className="text-sm text-green-700">Higher Response Rate</p>
                </div>
                <div className="bg-blue-100 p-6 text-center border border-blue-200">
                  <p className="text-4xl font-bold text-blue-600 mb-1">2.8x</p>
                  <p className="text-sm text-blue-700">More listing views</p>
                </div>
                <div className="bg-pink-100 p-6 text-center border border-pink-200">
                  <p className="text-4xl font-bold text-pink-600 mb-1">65%</p>
                  <p className="text-sm text-pink-700">Higher conversion</p>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="border border-gray-300">
              <div className="bg-white p-4 border-b border-gray-300">
                <h3 className="text-base font-semibold text-gray-900">
                  Need Help?
                </h3>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 mb-4">
                  Our verification team is here to assist you through the
                  process.
                </p>
                <button className="w-full bg-gray-900 text-white py-3 text-sm font-medium rounded flex items-center justify-center gap-2 mb-3 hover:bg-gray-800">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Contact Support
                </button>
                <button className="w-full bg-gray-900 text-white py-3 text-sm font-medium rounded flex items-center justify-center gap-2 hover:bg-gray-800">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  verified = true,
}: {
  label: string;
  value: any;
  verified?: boolean;
}) {
  return (
    <div className="bg-gray-50 p-4 flex items-center justify-between">
      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="text-sm font-medium text-gray-900">
          {value || "N/A"}
        </div>
      </div>
      {verified && (
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
