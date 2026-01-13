"use client";

import { Shield, CheckCircle2, Clock } from "lucide-react";
import {
  InfoCard,
  DocumentRowNew,
  VerificationBenefitsSidebar,
} from "./VerificationBenefitsSidebar";

interface VerificationData {
  legal_business_name?: string;
  business_type?: string;
  business_registration_number?: string;
  business_tax_id?: string;
  establishment_year?: string;
  owner_full_name?: string;
  government_id_type?: string;
  government_id_number?: string;
  government_id_document_url?: string;
  primary_business_address?: string;
  business_phone?: string;
  business_email?: string;
  bank_name?: string;
  account_holder_name?: string;
  account_number?: string;
  business_license_url?: string;
  certificate_of_incorporation_url?: string;
  tax_registration_certificate_url?: string;
  iso_certificate_url?: string;
  business_certificate_url?: string;
  quality_assurance_license_url?: string;
  audit_reports_url?: string;
  proof_of_address_document_url?: string;
  warehouse_locations?: string[];
  submitted_at?: string;
  created_at?: string;
}

interface VerificationStatusViewProps {
  status: {
    status: string;
    verification: VerificationData | null;
    role: Record<string, unknown> | null;
    hasDraft: boolean;
    draft?: Record<string, unknown>;
  };
  onEditReapply?: () => void;
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

export default function VerificationStatusView({
  status,
  onEditReapply,
}: VerificationStatusViewProps) {
  const { verification, role } = status;

  // Calculate progress dynamically based on actual data completeness
  const calculateProgress = () => {
    if (!verification) return { progress: 0, completedSteps: 0 };

    // If verification is approved or verified, show 100% progress
    if (status.status === "approved" || status.status === "verified") {
      return { progress: 100, completedSteps: 5 };
    }

    let completedSteps = 0;
    const totalSteps = 5; // Business Info, Identity, Operational, Documents, Bank

    // Step 1: Business Information (check all required fields)
    if (
      verification.legal_business_name &&
      verification.business_type &&
      verification.business_registration_number &&
      verification.establishment_year
    ) {
      completedSteps++;
    }

    // Step 2: Identity Verification (check all required identity fields)
    if (
      verification.owner_full_name &&
      verification.government_id_type &&
      verification.government_id_number &&
      verification.government_id_document_url
    ) {
      completedSteps++;
    }

    // Step 3: Operational Information (check contact and address)
    if (
      verification.primary_business_address &&
      verification.business_phone &&
      verification.business_email
    ) {
      completedSteps++;
    }

    // Step 4: Business Documents (at least 2 required documents)
    const documentCount = [
      verification.business_license_url,
      verification.certificate_of_incorporation_url,
      verification.tax_registration_certificate_url,
    ].filter(Boolean).length;
    if (documentCount >= 2) {
      completedSteps++;
    }

    // Step 5: Bank Account (check all bank fields)
    if (
      verification.bank_name &&
      verification.account_holder_name &&
      verification.account_number
    ) {
      completedSteps++;
    }

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

  // Get documents list dynamically with all possible document types
  const getDocuments = () => {
    const docs = [];

    // Required documents
    if (verification?.business_license_url) {
      docs.push({
        label: "Business License",
        url: verification.business_license_url,
        required: true,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.certificate_of_incorporation_url) {
      docs.push({
        label: "Certificate of Incorporation",
        url: verification.certificate_of_incorporation_url,
        required: true,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.tax_registration_certificate_url) {
      docs.push({
        label: "Tax Registration Certificate",
        url: verification.tax_registration_certificate_url,
        required: true,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.government_id_document_url) {
      docs.push({
        label: "Government ID Document",
        url: verification.government_id_document_url,
        required: true,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }

    // Optional documents
    if (verification?.iso_certificate_url) {
      docs.push({
        label: "ISO Certificate",
        url: verification.iso_certificate_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.business_certificate_url) {
      docs.push({
        label: "Business Certificate",
        url: verification.business_certificate_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.quality_assurance_license_url) {
      docs.push({
        label: "Quality Assurance License",
        url: verification.quality_assurance_license_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.audit_reports_url) {
      docs.push({
        label: "Audit Reports",
        url: verification.audit_reports_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.proof_of_address_document_url) {
      docs.push({
        label: "Proof of Address",
        url: verification.proof_of_address_document_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }

    return docs;
  };

  const documents = getDocuments();

  return (
    <div className="min-h-screen bg-page px-20 py-6">
      {/* Header Section */}
      <div className="mb-8 bg-white shadow-sm rounded-2xl px-16 py-5 flex items-center gap-6">
        <div className="bg-success-bg p-3 rounded-lg shadow-sm">
          <Shield className="w-9 h-9 text-secondary" />
        </div>
        <div>
          <h1 className="font-semibold text-2xl text-dark mb-0 leading-normal">
            Supplier Verification
          </h1>
          <p className="font-medium text-xl text-muted leading-normal">
            Complete verification to unlock premium features and build buyer
            trust
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-6 bg-white shadow-sm rounded-2xl px-8 py-6 relative">
        <h2 className="font-semibold text-2xl text-dark mb-4 leading-normal">
          Verification Progress
        </h2>
        <p className="font-medium text-xl text-muted mb-9 leading-normal">
          {progress}% Complete - {completedSteps} of 5 sections verified
        </p>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-border-light rounded-md mb-5">
          <div
            className="absolute top-0 left-0 h-full bg-secondary rounded-md"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Percentage Badge */}
        <div className="absolute right-7 top-14">
          <span className="font-semibold text-3xl text-dark">{progress}%</span>
        </div>

        {/* Status Badge */}
        <div
          className={`absolute right-10 top-6 px-4 pr-5 py-1 rounded-full flex items-center gap-2 ${
            status.status === "approved"
              ? "bg-success-bg"
              : status.status === "under_review"
              ? "bg-info-bg"
              : "bg-warning"
          }`}
        >
          <Clock className="w-4 h-4 text-black" />
          <span className="font-medium text-base text-black">
            {status.status === "approved"
              ? "Verified"
              : status.status === "under_review"
              ? "Under Review"
              : "In Progress"}
          </span>
        </div>
      </div>

      {/* Warning/Status Banner - FIXED HEIGHT ISSUE HERE */}
      <div className="mb-6 relative">
        <div
          className={`absolute left-0 top-0.5 bottom-0.5 w-2 rounded-br rounded-tr ${
            status.status === "approved"
              ? "bg-secondary"
              : status.status === "rejected"
              ? "bg-error"
              : status.status === "under_review"
              ? "bg-info"
              : "bg-warning"
          }`}
        ></div>
        <div
          className={`shadow-sm rounded-xl px-12 py-6 flex items-center ${
            status.status === "approved"
              ? "bg-success-bg"
              : status.status === "rejected"
              ? "bg-error-bg"
              : status.status === "under_review"
              ? "bg-info-bg"
              : "bg-warning-bg"
          }`}
        >
          <svg
            className="w-5 h-5 mr-8 shrink-0"
            viewBox="0 0 27 27"
            fill="none"
          >
            <circle
              cx="13.5"
              cy="13.5"
              r="13"
              stroke={
                status.status === "approved"
                  ? "var(--color-secondary)"
                  : status.status === "rejected"
                  ? "var(--color-error)"
                  : status.status === "under_review"
                  ? "var(--color-info)"
                  : "var(--color-warning)"
              }
              strokeWidth="1"
            />
            <path
              d="M13.5 8v6M13.5 18h.01"
              stroke={
                status.status === "approved"
                  ? "var(--color-secondary)"
                  : status.status === "rejected"
                  ? "var(--color-error)"
                  : status.status === "under_review"
                  ? "var(--color-info)"
                  : "var(--color-warning)"
              }
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p
            className={`font-medium text-lg leading-normal ${
              status.status === "approved"
                ? "text-secondary"
                : status.status === "rejected"
                ? "text-error"
                : status.status === "under_review"
                ? "text-info"
                : "text-warning"
            }`}
          >
            {statusConfig.message}
          </p>
        </div>
      </div>

      {/* Edit & Reapply Button for Rejected Status */}
      {status.status === "rejected" && onEditReapply && (
        <div className="mb-[23px]">
          <button
            onClick={onEditReapply}
            className="w-full bg-gray-900 text-white font-semibold text-lg px-8 py-4 rounded-[10px] hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit & Reapply for Verification
          </button>
        </div>
      )}

      <div className="flex gap-5">
        {/* Left Column - Verification Cards */}
        <div className="flex-1 space-y-6">
          {verification && (
            <>
              {/* Business Information Card */}
              {verification.legal_business_name && (
                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
                  <div className="flex items-center justify-between mb-[23px]">
                    <div className="flex items-center gap-5">
                      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                        <rect
                          width="28"
                          height="28"
                          rx="4"
                          fill="#2AAE7A"
                          fillOpacity="0.1"
                        />
                        <path
                          d="M14 7v14M7 14h14"
                          stroke="#2AAE7A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <h3 className="font-semibold text-xl text-dark">
                        Business Information
                      </h3>
                    </div>
                    <div className="bg-success-bg px-4 py-1 rounded-2xl shadow-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span className="font-medium text-xl text-secondary">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mb-[23px]"></div>

                  <div className="grid grid-cols-2 gap-x-[50px] gap-y-[15px]">
                    <InfoCard
                      label="Legal Business Name"
                      value={verification.legal_business_name}
                      verified
                    />
                    <InfoCard
                      label="Business Registration Number"
                      value={verification.business_registration_number || "N/A"}
                      verified
                    />
                    <InfoCard
                      label="Tax ID (EIN)"
                      value={verification.business_tax_id || "N/A"}
                      verified
                    />
                    <InfoCard
                      label="Business Type"
                      value={verification.business_type || "N/A"}
                      verified
                    />
                    <InfoCard
                      label="Year Established"
                      value={verification.establishment_year || "N/A"}
                      verified
                    />
                  </div>
                </div>
              )}

              {/* Identity Verification Card */}
              {verification.owner_full_name && (
                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
                  <div className="flex items-center justify-between mb-[23px]">
                    <div className="flex items-center gap-5">
                      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                        <rect
                          width="28"
                          height="28"
                          rx="4"
                          fill="#2AAE7A"
                          fillOpacity="0.1"
                        />
                        <path
                          d="M14 7v14M7 14h14"
                          stroke="#2AAE7A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <h3 className="font-semibold text-xl text-dark">
                        Identity Verification
                      </h3>
                    </div>
                    <div className="bg-success-bg px-4 py-1 rounded-2xl shadow-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span className="font-medium text-xl text-secondary">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mb-[23px]"></div>

                  <div className="grid grid-cols-2 gap-x-[50px] gap-y-[15px]">
                    <InfoCard
                      label="Owner/Director Name"
                      value={verification.owner_full_name}
                      verified
                    />
                    <InfoCard
                      label="Government ID"
                      value={
                        verification.government_id_document_url
                          ? "Uploaded - Verified"
                          : "Not Uploaded"
                      }
                      verified={!!verification.government_id_document_url}
                    />
                    <InfoCard
                      label="Proof of Address"
                      value={
                        verification.proof_of_address_document_url
                          ? "Uploaded - Verified"
                          : "Not Uploaded"
                      }
                      verified={!!verification.proof_of_address_document_url}
                    />
                  </div>
                </div>
              )}

              {/* Business Documents Card */}
              {documents.length > 0 && (
                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
                  <div className="flex items-center justify-between mb-[23px]">
                    <div className="flex items-center gap-5">
                      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                        <circle
                          cx="14"
                          cy="14"
                          r="11"
                          stroke={
                            status.status === "approved"
                              ? "var(--color-secondary)"
                              : "var(--color-warning)"
                          }
                          strokeWidth="2"
                        />
                        <path
                          d="M14 10v4M14 18h.01"
                          stroke={
                            status.status === "approved"
                              ? "var(--color-secondary)"
                              : "var(--color-warning)"
                          }
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <h3 className="font-semibold text-xl text-dark">
                        Business Documents
                      </h3>
                    </div>
                    <div
                      className={`px-4 py-1 rounded-2xl shadow-sm flex items-center gap-2 ${
                        status.status === "approved"
                          ? "bg-success-bg"
                          : "bg-warning-bg"
                      }`}
                    >
                      {status.status === "approved" ? (
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                      ) : (
                        <Clock className="w-4 h-4 text-warning" />
                      )}
                      <span
                        className={`font-medium text-xl ${
                          status.status === "approved"
                            ? "text-secondary"
                            : "text-warning"
                        }`}
                      >
                        {status.status === "approved" ? "Verified" : "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mb-[23px]"></div>

                  <div className="space-y-[15px]">
                    {documents.map((doc, index) => (
                      <DocumentRowNew
                        key={index}
                        label={doc.label}
                        date={
                          doc.uploadedDate
                            ? `Uploaded: ${formatDate(doc.uploadedDate)}`
                            : "Not uploaded"
                        }
                        status={doc.status}
                        optional={!doc.required}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Bank Account Verification Card */}
              {verification.bank_name && verification.account_number && (
                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
                  <div className="flex items-center justify-between mb-[23px]">
                    <div className="flex items-center gap-5">
                      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                        <rect
                          width="28"
                          height="28"
                          rx="4"
                          fill="#2AAE7A"
                          fillOpacity="0.1"
                        />
                        <path
                          d="M14 7v14M7 14h14"
                          stroke="#2AAE7A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <h3 className="font-semibold text-xl text-dark">
                        Bank Account Verification
                      </h3>
                    </div>
                    <div className="bg-success-bg px-4 py-1 rounded-2xl shadow-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span className="font-medium text-xl text-secondary">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mb-[23px]"></div>

                  <div className="grid grid-cols-2 gap-x-[50px] gap-y-[15px]">
                    <InfoCard
                      label="Bank Name"
                      value={verification.bank_name}
                      verified
                    />
                    <InfoCard
                      label="Account Number"
                      value={maskAccountNumber(verification.account_number)}
                      verified
                    />
                    <InfoCard
                      label="Account Holder"
                      value={verification.account_holder_name || "N/A"}
                      verified
                    />
                  </div>
                </div>
              )}

              {/* Operational Information Card */}
              {verification.primary_business_address && (
                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
                  <div className="flex items-center justify-between mb-[23px]">
                    <div className="flex items-center gap-5">
                      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                        <rect
                          width="28"
                          height="28"
                          rx="4"
                          fill="var(--color-secondary)"
                          fillOpacity="0.1"
                        />
                        <path
                          d="M14 7v14M7 14h14"
                          stroke="var(--color-secondary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <h3 className="font-semibold text-xl text-dark">
                        Operational Information
                      </h3>
                    </div>
                    <div className="bg-success-bg px-4 py-1 rounded-2xl shadow-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span className="font-medium text-xl text-secondary">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mb-[23px]"></div>

                  <div className="grid grid-cols-2 gap-x-[50px] gap-y-[15px]">
                    <div className="col-span-1">
                      <InfoCard
                        label="Primary Business Address"
                        value={verification.primary_business_address}
                        verified
                      />
                    </div>
                    <InfoCard
                      label="Warehouse Location"
                      value={
                        verification.warehouse_locations &&
                        verification.warehouse_locations.length > 0
                          ? `${verification.warehouse_locations.length} verified Locations`
                          : "Not specified"
                      }
                      verified
                    />
                    <InfoCard
                      label="Business Phone"
                      value={verification.business_phone || "N/A"}
                      verified
                    />
                    <InfoCard
                      label="Business Email"
                      value={verification.business_email || "N/A"}
                      verified
                    />
                  </div>
                </div>
              )}

              {/* Additional Verification Card - Only shown if NOT verified */}
              {status.status !== "approved" && status.status !== "verified" && (
                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
                  <div className="flex items-center mb-[23px]">
                    <h3 className="font-semibold text-xl text-dark">
                      Additional Verification (Optional)
                    </h3>
                  </div>

                  <div className="border-t border-gray-200 mb-[23px]"></div>

                  <div className="space-y-[15px]">
                    <DocumentRowNew
                      label="ISO 9001 Certification"
                      date="Adds credibility to quality management"
                      status={
                        verification.iso_certificate_url ? "verified" : "upload"
                      }
                    />
                    <DocumentRowNew
                      label="Industry - Specific Licenses"
                      date="Relevant to your products categories"
                      status={
                        verification.quality_assurance_license_url
                          ? "verified"
                          : "upload"
                      }
                    />
                    <DocumentRowNew
                      label="Third-Party Audit Reports"
                      date="Strengthen buyer confidence"
                      status={
                        verification.audit_reports_url ? "verified" : "upload"
                      }
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column - Benefits Sidebar */}
        <VerificationBenefitsSidebar />
      </div>
    </div>
  );
}
