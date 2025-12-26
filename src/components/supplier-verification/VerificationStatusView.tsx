"use client";

import {
  Shield,
  CheckCircle2,
  Clock,
  Phone,
  FileText,
  Upload,
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
        status: status.status,
        uploadedDate: verification.business_license_url
          ? new Date().toISOString()
          : null,
      });
    }
    if (verification?.certificate_of_incorporation_url) {
      docs.push({
        label: "Certificate of Incorporation",
        url: verification.certificate_of_incorporation_url,
        required: true,
        status: status.status,
        uploadedDate: verification.certificate_of_incorporation_url
          ? new Date().toISOString()
          : null,
      });
    }
    if (verification?.tax_registration_certificate_url) {
      docs.push({
        label: "Tax Registration Certificate",
        url: verification.tax_registration_certificate_url,
        required: true,
        status: status.status,
        uploadedDate: verification.tax_registration_certificate_url
          ? new Date().toISOString()
          : null,
      });
    }
    if (verification?.iso_certificate_url) {
      docs.push({
        label: "Industry Certifications (ISO/CE)",
        url: verification.iso_certificate_url,
        required: false,
        status: status.status,
        uploadedDate: verification.iso_certificate_url
          ? new Date().toISOString()
          : null,
      });
    }
    return docs;
  };

  const documents = getDocuments();

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="min-h-screen bg-[#eefbf6] px-20 py-6"
    >
      {/* Header Section */}
      <div className="mb-[34px] bg-white shadow-[0px_0px_5px_0px_rgba(24,181,34,0.25)] rounded-[15px] px-[61px] py-5 flex items-center gap-[26px]">
        <div className="bg-[#eeffef] p-[11px] rounded-[8px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)]">
          <Shield className="w-[34px] h-[34px] text-[#2aae7a]" />
        </div>
        <div>
          <h1
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="font-semibold text-[27px] text-[#0d1b2a] mb-0 leading-normal"
          >
            Supplier Verification
          </h1>
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="font-medium text-[18px] text-[#9c9c9c] leading-normal"
          >
            Complete verification to unlock premium features and build buyer
            trust
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-[23px] bg-white shadow-[0px_3px_5px_0px_rgba(24,181,34,0.25)] rounded-[15px] px-8 py-[23px] relative">
        <h2
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="font-semibold text-[21px] text-[#0d1b2a] mb-4 leading-normal"
        >
          Verification Progress
        </h2>
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="font-medium text-[18px] text-[#9c9c9c] mb-[35px] leading-normal"
        >
          {progress}% Complete - {completedSteps} of 5 sections verified
        </p>

        {/* Progress Bar */}
        <div className="relative w-full h-[11px] bg-[#eee] rounded-[6px] mb-5">
          <div
            className="absolute top-0 left-0 h-full bg-[#2aae7a] rounded-[6px]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Percentage Badge */}
        <div className="absolute right-[27px] top-[54px]">
          <span
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="font-semibold text-[30px] text-[#0d1b2a]"
          >
            {progress}%
          </span>
        </div>

        {/* Status Badge */}
        <div
          className={`absolute right-[42px] top-[23px] px-4 pr-[19px] py-[5px] rounded-[100px] flex items-center gap-[8px] ${
            status.status === "approved"
              ? "bg-[#eeffef]"
              : status.status === "under_review"
              ? "bg-[#dff3ff]"
              : "bg-[#fc3]"
          }`}
        >
          <Clock className="w-[17px] h-[17px] text-black" />
          <span
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="font-medium text-[15px] text-black"
          >
            {status.status === "approved"
              ? "Verified"
              : status.status === "under_review"
              ? "Under Review"
              : "In Progress"}
          </span>
        </div>
      </div>

      {/* Warning/Status Banner */}
      <div className="mb-[23px] relative">
        <div
          className={`absolute left-0 top-[2px] w-[7px] h-[86px] rounded-br-[4px] rounded-tr-[4px] ${
            status.status === "approved"
              ? "bg-[#2aae7a]"
              : status.status === "rejected"
              ? "bg-[#f05050]"
              : status.status === "under_review"
              ? "bg-[#507df0]"
              : "bg-[#efd700]"
          }`}
        ></div>
        <div
          className={`shadow-[0px_1px_4px_0px_rgba(229,206,0,0.25)] rounded-tl-[9px] rounded-tr-[15px] rounded-bl-[9px] rounded-br-[15px] px-[50px] py-[22px] flex items-center ${
            status.status === "approved"
              ? "bg-[#eeffef]"
              : status.status === "rejected"
              ? "bg-[#ffe5e5]"
              : status.status === "under_review"
              ? "bg-[#dff3ff]"
              : "bg-[#fff3cf]"
          }`}
        >
          <svg
            className="w-[20px] h-[20px] mr-[30px] shrink-0"
            viewBox="0 0 27 27"
            fill="none"
          >
            <circle
              cx="13.5"
              cy="13.5"
              r="13"
              stroke={
                status.status === "approved"
                  ? "#2AAE7A"
                  : status.status === "rejected"
                  ? "#F05050"
                  : status.status === "under_review"
                  ? "#507DF0"
                  : "#FFCC33"
              }
              strokeWidth="1"
            />
            <path
              d="M13.5 8v6M13.5 18h.01"
              stroke={
                status.status === "approved"
                  ? "#2AAE7A"
                  : status.status === "rejected"
                  ? "#F05050"
                  : status.status === "under_review"
                  ? "#507DF0"
                  : "#FFCC33"
              }
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className={`font-medium text-[17px] leading-normal ${
              status.status === "approved"
                ? "text-[#2aae7a]"
                : status.status === "rejected"
                ? "text-[#f05050]"
                : status.status === "under_review"
                ? "text-[#507df0]"
                : "text-[#fc3]"
            }`}
          >
            {statusConfig.message}
          </p>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Left Column - Verification Cards */}
        <div className="flex-1 space-y-[23px]">
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
                      <h3
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="font-semibold text-[18px] text-[#0d1b2a]"
                      >
                        Business Information
                      </h3>
                    </div>
                    <div className="bg-[#eeffef] px-[15px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[8px]">
                      <CheckCircle2 className="w-[17px] h-[17px] text-[#2aae7a]" />
                      <span
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="font-medium text-[18px] text-[#2aae7a]"
                      >
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
                      <h3
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="font-semibold text-[18px] text-[#0d1b2a]"
                      >
                        Identity Verification
                      </h3>
                    </div>
                    <div className="bg-[#eeffef] px-[15px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[8px]">
                      <CheckCircle2 className="w-[17px] h-[17px] text-[#2aae7a]" />
                      <span
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="font-medium text-[18px] text-[#2aae7a]"
                      >
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
                            status.status === "approved" ? "#2AAE7A" : "#FC3"
                          }
                          strokeWidth="2"
                        />
                        <path
                          d="M14 10v4M14 18h.01"
                          stroke={
                            status.status === "approved" ? "#2AAE7A" : "#FC3"
                          }
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <h3
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="font-semibold text-[18px] text-[#0d1b2a]"
                      >
                        Business Documents
                      </h3>
                    </div>
                    <div
                      className={`px-[15px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[8px] ${
                        status.status === "approved"
                          ? "bg-[#eeffef]"
                          : "bg-[#fff3cf]"
                      }`}
                    >
                      {status.status === "approved" ? (
                        <CheckCircle2 className="w-[17px] h-[17px] text-[#2aae7a]" />
                      ) : (
                        <Clock className="w-[17px] h-[17px] text-[#fc3]" />
                      )}
                      <span
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className={`font-medium text-[18px] ${
                          status.status === "approved"
                            ? "text-[#2aae7a]"
                            : "text-[#fc3]"
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
                      <h3
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="font-semibold text-[18px] text-[#0d1b2a]"
                      >
                        Bank Account Verification
                      </h3>
                    </div>
                    <div className="bg-[#eeffef] px-[15px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[8px]">
                      <CheckCircle2 className="w-[17px] h-[17px] text-[#2aae7a]" />
                      <span
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="font-medium text-[18px] text-[#2aae7a]"
                      >
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
                      value={verification.account_holder_name}
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
                      <h3
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="font-semibold text-[18px] text-[#0d1b2a]"
                      >
                        Operational Information
                      </h3>
                    </div>
                    <div className="bg-[#eeffef] px-[15px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[8px]">
                      <CheckCircle2 className="w-[17px] h-[17px] text-[#2aae7a]" />
                      <span
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="font-medium text-[18px] text-[#2aae7a]"
                      >
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
                        verification.warehouse_locations?.length > 0
                          ? `${verification.warehouse_locations.length} verified Locations`
                          : "Not specified"
                      }
                      verified
                    />
                    <InfoCard
                      label="Business Phone"
                      value={verification.business_phone}
                      verified
                    />
                    <InfoCard
                      label="Business Email"
                      value={verification.business_email}
                      verified
                    />
                  </div>
                </div>
              )}

              {/* Additional Verification Card */}
              <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
                <div className="flex items-center mb-[23px]">
                  <h3
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    className="font-semibold text-[18px] text-[#0d1b2a]"
                  >
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
            </>
          )}
        </div>

        {/* Right Column - Benefits Sidebar */}
        <div className="w-[345px] space-y-[23px]">
          {/* Verification Benefits Card */}
          <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[23px]">
            <h3
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="font-semibold text-[18px] text-[#0d1b2a] mb-8"
            >
              Verification Benefits
            </h3>

            <div className="space-y-[23px]">
              <BenefitItem
                icon={<Shield className="w-5 h-5 text-[#2aae7a]" />}
                title="Trusted Badge"
                description="Display verified supplier badge on all listings"
              />
              <BenefitItem
                icon={
                  <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M14 10v8M10 14l4 4 4-4"
                      stroke="#2AAE7A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                title="Higher Visibility"
                description="Verified suppliers appear higher in search results"
              />
              <BenefitItem
                icon={
                  <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M14 18c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zM6 14h4M18 14h4M14 6v4M14 18v4"
                      stroke="#2AAE7A"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                title="Increased Trust"
                description="Buyers prefer verified suppliers by 3.5x"
              />
              <BenefitItem
                icon={
                  <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <rect
                      x="6"
                      y="8"
                      width="16"
                      height="12"
                      rx="2"
                      stroke="#2AAE7A"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 12h8M10 16h4"
                      stroke="#2AAE7A"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                title="Higher Limits"
                description="Access to larger transaction limits"
              />
            </div>
          </div>

          {/* Verification Impact Card */}
          <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
            <h3
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="font-semibold text-[18px] text-[#0d1b2a] mb-[55px]"
            >
              Verification Impact
            </h3>

            <div className="space-y-[15px]">
              <ImpactCard
                bgColor="bg-[#eeffef]"
                textColor="text-[#2aae7a]"
                value="3.5x"
                label="Higher Response Rate"
              />
              <ImpactCard
                bgColor="bg-[#dff3ff]"
                textColor="text-[#507df0]"
                value="2.8x"
                label="Most Listing Views"
              />
              <ImpactCard
                bgColor="bg-[#ffe5e5]"
                textColor="text-[#f05050]"
                value="65%"
                label="Higher Conversion"
              />
            </div>
          </div>

          {/* Need Help Card */}
          <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
            <h3
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="font-semibold text-[18px] text-[#0d1b2a] mb-5"
            >
              Need Help?
            </h3>
            <p
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="font-medium text-[18px] text-[#9c9c9c] leading-normal mb-[60px]"
            >
              Our verification team is here to assist you through the process
            </p>

            <button className="w-full bg-[#1e3a8a] hover:bg-[#152e6b] text-white font-semibold text-[16px] py-[17px] rounded-[8px] flex items-center justify-center gap-[8px] mb-[10px]">
              <Phone className="w-5 h-5" />
              Contact Support
            </button>

            <button className="w-full bg-white border border-[#9c9c9c] text-[#9c9c9c] font-semibold text-[12px] py-[13px] rounded-[8px] flex items-center justify-center gap-[8px]">
              <FileText className="w-4 h-4" />
              View Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function InfoCard({
  label,
  value,
  verified,
}: {
  label: string;
  value: string;
  verified?: boolean;
}) {
  return (
    <div className="bg-[#f6f6f6] rounded-[8px] px-[11px] py-[9px] relative">
      <p
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="font-medium text-[9px] text-[#9c9c9c] mb-[8px]"
      >
        {label}
      </p>
      <p
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="font-medium text-[11px] text-[#0d1b2a]"
      >
        {value}
      </p>
      {verified && (
        <div className="absolute right-[11px] top-1/2 -translate-y-1/2">
          <CheckCircle2 className="w-[20px] h-[20px] text-[#2aae7a]" />
        </div>
      )}
    </div>
  );
}

function DocumentRowNew({
  label,
  date,
  status,
  optional,
  onUpload,
}: {
  label: string;
  date: string;
  status: string;
  optional?: boolean;
  onUpload?: () => void;
}) {
  return (
    <div className="bg-[#f6f6f6] rounded-[8px] px-5 py-[13px] flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="font-medium text-[14px] text-[#0d1b2a]"
          >
            {label}
          </p>
          {optional && (
            <span
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="font-medium text-[14px] text-[#9c9c9c]"
            >
              (Optional)
            </span>
          )}
        </div>
        <p
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="font-medium text-[12px] text-[#9c9c9c] mt-[9px]"
        >
          {date}
        </p>
      </div>

      {status === "verified" || status === "approved" ? (
        <div className="bg-[#eeffef] px-[10px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[5px]">
          <CheckCircle2 className="w-[18px] h-[18px] text-[#2aae7a]" />
          <span
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="font-medium text-[14px] text-[#2aae7a]"
          >
            Verified
          </span>
        </div>
      ) : status === "pending" || status === "under_review" ? (
        <div className="bg-[#fff3cf] px-[10px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[5px]">
          <Clock className="w-[18px] h-[18px] text-[#fc3]" />
          <span
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="font-medium text-[14px] text-[#fc3]"
          >
            Pending
          </span>
        </div>
      ) : (
        <button
          onClick={onUpload}
          className="bg-[#1e3a8a] hover:bg-[#152e6b] text-white font-semibold text-[16px] px-5 py-[10px] rounded-[8px] flex items-center gap-[8px]"
        >
          <Upload className="w-5 h-5" />
          Upload
        </button>
      )}
    </div>
  );
}

function BenefitItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <h4
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="font-semibold text-[17px] text-[#0d1b2a] mb-[5px]"
        >
          {title}
        </h4>
        <p
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="font-medium text-[11px] text-[#9c9c9c] leading-normal"
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function ImpactCard({
  bgColor,
  textColor,
  value,
  label,
}: {
  bgColor: string;
  textColor: string;
  value: string;
  label: string;
}) {
  return (
    <div
      className={`${bgColor} rounded-[15px] h-[80px] flex flex-col items-center justify-center`}
    >
      <p
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className={`font-semibold text-[26px] ${textColor} mb-[5px]`}
      >
        {value}
      </p>
      <p
        style={{ fontFamily: "'Inter', sans-serif" }}
        className={`font-semibold text-[13px] ${textColor}`}
      >
        {label}
      </p>
    </div>
  );
}
