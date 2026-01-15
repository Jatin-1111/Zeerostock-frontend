"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  Eye,
  Download,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin-panel";
import { useRouter, useParams } from "next/navigation";

interface VerificationData {
  id: string;
  userId: string;
  supplierId: string;
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  verificationStatus:
    | "pending"
    | "approved"
    | "rejected"
    | "under_review"
    | "verified";
  submittedAt: string;
  verifiedAt: string | null;
  gstNumber: string;
  panNumber: string;
  registeredAddress: string;
  documents: {
    gstCertificate?: string | null;
    panCard?: string | null;
    addressProof?: string | null;
    bankStatement?: string | null;
    incorporationCertificate?: string | null;
    businessLicense?: string | null;
    businessCertificate?: string | null;
    isoCertificate?: string | null;
    qualityAssuranceLicense?: string | null;
    auditReports?: string | null;
  };
}

interface HistoryEvent {
  id: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedBy: string;
}

export default function SupplierDetailPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [verification, setVerification] = useState<VerificationData | null>(
    null
  );
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const verificationId = params.id as string;

  const fetchVerificationDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/supplier-verifications/${verificationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch verification details");

      const result = await response.json();
      console.log("Verification data:", result.data.verification);
      console.log("Documents:", result.data.verification?.documents);
      setVerification(result.data.verification);
      setHistory(result.data.history || []);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to fetch verification details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (verificationId) {
      fetchVerificationDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationId]);

  const handleAction = async (
    action: "approve" | "reject" | "review",
    notes?: string
  ) => {
    try {
      // If rejecting, prompt for reason
      if (action === "reject" && !notes) {
        const reason = prompt("Please provide a rejection reason:");
        if (!reason || reason.trim() === "") {
          alert("Rejection reason is required");
          return;
        }
        notes = reason;
      }

      setActionLoading(true);
      const token = localStorage.getItem("admin_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/supplier-verifications/${verificationId}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notes: notes || `Verification ${action}d by admin`,
            reason: action === "reject" ? notes : undefined,
          }),
        }
      );

      if (!response.ok) throw new Error(`Failed to ${action} verification`);

      const result = await response.json();
      setSuccess(result.message);
      fetchVerificationDetails();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const error = err as Error;
      setError(error.message || `Failed to ${action} verification`);
      setTimeout(() => setError(""), 3000);
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDocument = async (
    documentUrl: string,
    documentName: string
  ) => {
    try {
      console.log("Attempting to view document:", {
        documentName,
        documentUrl,
      });

      // Fetch document with auth token first, then open as blob
      const token = localStorage.getItem("admin_token");
      const proxyUrl = `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/admin/verification-document?url=${encodeURIComponent(documentUrl)}`;

      console.log("Fetching document via proxy:", proxyUrl);

      const response = await fetch(proxyUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the blob and create object URL
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Open in new tab
      window.open(blobUrl, "_blank", "noopener,noreferrer");

      // Clean up after a delay to allow the document to load
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1000);

      console.log("Document opened successfully");
    } catch (error) {
      console.error("Error opening document:", error);
      setError(
        `Failed to open ${documentName}. Please try downloading instead.`
      );
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDownloadDocument = async (
    documentUrl: string,
    documentName: string
  ) => {
    try {
      console.log("Attempting to download:", { documentName, documentUrl });

      // Use backend proxy to download the document
      const token = localStorage.getItem("admin_token");
      const proxyUrl = `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/admin/verification-document?url=${encodeURIComponent(documentUrl)}`;

      const response = await fetch(proxyUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = documentName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);

      console.log("Download successful");
    } catch (error) {
      console.error("Error downloading document:", error);
      setError(
        `Failed to download ${documentName}. The file may not be accessible.`
      );
      setTimeout(() => setError(""), 3000);
    }
  };

  const renderOverview = () => {
    if (!verification) return null;

    return (
      <div className="grid grid-cols-2 gap-6">
        {/* Business Details */}
        <div>
          <h3 className="text-[14px] font-bold text-black mb-4">
            Business Information
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Company Name
              </label>
              <p className="text-[13px] text-black">
                {verification.companyName || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Category
              </label>
              <p className="text-[13px] text-black">
                {verification.category || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                GST Number
              </label>
              <p className="text-[13px] text-black">
                {verification.gstNumber || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                PAN Number
              </label>
              <p className="text-[13px] text-black">
                {verification.panNumber || "N/A"}
              </p>
            </div>

            <h3 className="text-[14px] font-bold text-black mb-4 mt-6">
              Contact Information
            </h3>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Contact Person
              </label>
              <p className="text-[13px] text-black">
                {verification.contactPerson || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Registered Address
              </label>
              <p className="text-[13px] text-black">
                {verification.registeredAddress || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Business Phone
              </label>
              <p className="text-[13px] text-black">
                {verification.contactPhone || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Business Email
              </label>
              <p className="text-[13px] text-black">
                {verification.contactEmail || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Status & Identity Information */}
        <div>
          <h3 className="text-[14px] font-bold text-black mb-4">
            Verification Status
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded">
              <label className="text-[11px] text-gray-500 block mb-1">
                Current Status
              </label>
              <p
                className={`text-[16px] font-semibold ${
                  verification.verificationStatus === "approved" ||
                  verification.verificationStatus === "verified"
                    ? "text-green-600"
                    : verification.verificationStatus === "rejected"
                    ? "text-red-600"
                    : verification.verificationStatus === "under_review"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {verification.verificationStatus
                  ?.replace(/_/g, " ")
                  .toUpperCase() || "N/A"}
              </p>
            </div>

            <div className="border border-gray-200 p-4 rounded">
              <label className="text-[11px] text-gray-500 block mb-1">
                Submitted Date
              </label>
              <p className="text-[13px] text-black">
                {verification.submittedAt
                  ? new Date(verification.submittedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "N/A"}
              </p>
            </div>

            {verification.verifiedAt && (
              <div className="border border-gray-200 p-4 rounded">
                <label className="text-[11px] text-gray-500 block mb-1">
                  Reviewed Date
                </label>
                <p className="text-[13px] text-black">
                  {new Date(verification.verifiedAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            )}

            {verification.verificationStatus === "rejected" && (
              <div className="border border-red-200 bg-red-50 p-4 rounded">
                <label className="text-[11px] text-red-600 block mb-1">
                  Rejection Reason
                </label>
                <p className="text-[13px] text-red-800">
                  Contact admin for details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDocuments = () => {
    if (!verification || !verification.documents) {
      return <p className="text-[13px] text-gray-500">No documents uploaded</p>;
    }

    // Document labels mapping for better display names
    const documentLabels: { [key: string]: string } = {
      panCard: "PAN Card",
      gstCertificate: "GST Certificate",
      addressProof: "Address Proof",
      businessLicense: "Business License",
      incorporationCertificate: "Certificate of Incorporation",
      businessCertificate: "Business Certificate",
      isoCertificate: "ISO Certificate",
      qualityAssuranceLicense: "Quality Assurance License",
      auditReports: "Audit Reports",
      bankStatement: "Bank Statement",
    };

    // Get all document URLs from verification.documents object
    const documents = Object.entries(documentLabels)
      .map(([key, label]) => ({
        key,
        label,
        url: verification.documents[key as keyof typeof verification.documents],
      }))
      .filter((doc) => doc.url); // Only show uploaded documents

    if (documents.length === 0) {
      return <p className="text-[13px] text-gray-500">No documents uploaded</p>;
    }

    return (
      <div className="p-8">
        <h3 className="text-[14px] font-bold text-black mb-4">
          Attached Documents ({documents.length})
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {documents.map((doc) => {
            return (
              <div
                key={doc.key}
                className="border border-gray-200 p-4 flex items-center gap-3 hover:border-gray-300 transition-colors rounded"
              >
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center shrink-0 rounded">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-black font-medium truncate">
                    {doc.label}
                  </p>
                  <p className="text-[10px] text-gray-500">Uploaded Document</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewDocument(doc.url!, doc.label)}
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    title="View Document"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadDocument(doc.url!, `${doc.label}.pdf`)
                    }
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    title="Download Document"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    if (history.length === 0) {
      return <p className="text-[13px] text-gray-500">No history available</p>;
    }

    return (
      <div>
        <h3 className="text-[14px] font-bold text-black mb-6">
          Verification Timeline
        </h3>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {history.map((event) => (
              <div key={event.id} className="relative flex gap-4">
                {/* Timeline Node */}
                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-gray-600" />
                  </div>
                </div>

                {/* Event Content */}
                <div className="flex-1 pt-1">
                  <div className="bg-white border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[13px] font-semibold text-black">
                        {event.status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-600 mb-2">
                      {event.notes}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {new Date(event.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!verification) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <p className="text-gray-500 text-[13px]">Verification not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Verification
      </button>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span className="text-[13px]">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span className="text-[13px]">{success}</span>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-[24px] font-bold text-black mb-1">
          Supplier Verification Details
        </h2>
        <p className="text-[13px] text-gray-500">
          Review supplier documents and verification status
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("Overview")}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                activeTab === "Overview"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("Documents")}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                activeTab === "Documents"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab("History")}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                activeTab === "History"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              History
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 mt-6">
          {activeTab === "Overview" && renderOverview()}
          {activeTab === "Documents" && renderDocuments()}
          {activeTab === "History" && renderHistory()}
        </div>

        {/* Action Buttons for pending verifications */}
        {verification &&
        (verification.verificationStatus === "pending" ||
          verification.verificationStatus === "under_review") ? (
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-[14px] font-bold text-black mb-4">
              Verification Actions
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleAction("approve")}
                disabled={actionLoading}
                className="flex-1 bg-green-600 text-white px-6 py-3 text-[14px] font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded"
              >
                <CheckCircle className="w-5 h-5" />
                Approve Verification
              </button>
              <button
                onClick={() => handleAction("review")}
                disabled={actionLoading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 text-[14px] font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded"
              >
                <Eye className="w-5 h-5" />
                Mark Under Review
              </button>
              <button
                onClick={() => handleAction("reject")}
                disabled={actionLoading}
                className="flex-1 bg-red-600 text-white px-6 py-3 text-[14px] font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded"
              >
                <XCircle className="w-5 h-5" />
                Reject Verification
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
}
