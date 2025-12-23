"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  Eye,
  Download,
  CheckCircle,
  Circle,
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
  gstNumber: string;
  panNumber: string;
  registeredAddress: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  verificationStatus: string;
  submittedAt: string;
  verifiedAt: string | null;
  documents: {
    gstCertificate?: string;
    panCard?: string;
    addressProof?: string;
    bankStatement?: string;
    incorporationCertificate?: string;
    [key: string]: string | undefined;
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

  useEffect(() => {
    if (verificationId) {
      fetchVerificationDetails();
    }
  }, [verificationId]);

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
      setVerification(result.data.verification);
      setHistory(result.data.history || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch verification details");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    action: "approve" | "reject" | "review",
    notes?: string
  ) => {
    try {
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
          }),
        }
      );

      if (!response.ok) throw new Error(`Failed to ${action} verification`);

      const result = await response.json();
      setSuccess(result.message);
      fetchVerificationDetails();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || `Failed to ${action} verification`);
      setTimeout(() => setError(""), 3000);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadDocument = async (
    documentUrl: string,
    documentName: string
  ) => {
    try {
      const response = await fetch(documentUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = documentName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Failed to download document");
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
            Business Details
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
                GSTIN
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
                Contact Person
              </label>
              <p className="text-[13px] text-black">
                {verification.contactPerson || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Contact Email
              </label>
              <p className="text-[13px] text-black">
                {verification.contactEmail || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Contact Phone
              </label>
              <p className="text-[13px] text-black">
                {verification.contactPhone || "N/A"}
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
          </div>
        </div>

        {/* Status Information */}
        <div>
          <h3 className="text-[14px] font-bold text-black mb-4">
            Verification Status
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-200 p-4">
              <label className="text-[11px] text-gray-500 block mb-1">
                Current Status
              </label>
              <p
                className={`text-[16px] font-semibold ${
                  verification.verificationStatus === "verified"
                    ? "text-green-600"
                    : verification.verificationStatus === "rejected"
                    ? "text-red-600"
                    : verification.verificationStatus === "under_review"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {verification.verificationStatus
                  ?.replace(/_/g, " ")
                  .toUpperCase() || "N/A"}
              </p>
            </div>

            <div className="border border-gray-200 p-4">
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
              <div className="border border-gray-200 p-4">
                <label className="text-[11px] text-gray-500 block mb-1">
                  Verified Date
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

            {/* Action Buttons */}
            {verification.verificationStatus === "pending" ||
            verification.verificationStatus === "under_review" ? (
              <div className="space-y-2 mt-6">
                <button
                  onClick={() => handleAction("approve")}
                  disabled={actionLoading}
                  className="w-full bg-green-600 text-white px-4 py-2 text-[13px] font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Verification
                </button>
                <button
                  onClick={() => handleAction("review")}
                  disabled={actionLoading}
                  className="w-full bg-blue-600 text-white px-4 py-2 text-[13px] font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Mark Under Review
                </button>
                <button
                  onClick={() => handleAction("reject")}
                  disabled={actionLoading}
                  className="w-full bg-red-600 text-white px-4 py-2 text-[13px] font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Verification
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const renderDocuments = () => {
    if (!verification?.documents) {
      return <p className="text-[13px] text-gray-500">No documents uploaded</p>;
    }

    const documentEntries = Object.entries(verification.documents).filter(
      ([_, url]) => url
    );

    if (documentEntries.length === 0) {
      return <p className="text-[13px] text-gray-500">No documents uploaded</p>;
    }

    return (
      <div>
        <h3 className="text-[14px] font-bold text-black mb-4">
          Attached Documents
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {documentEntries.map(([key, url]) => {
            const fileName = key.replace(/([A-Z])/g, " $1").trim();
            const displayName =
              fileName.charAt(0).toUpperCase() + fileName.slice(1);

            return (
              <div
                key={key}
                className="border border-gray-200 p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-black truncate">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-gray-500">Document</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    title="View Document"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </a>
                  <button
                    onClick={() =>
                      handleDownloadDocument(url!, `${displayName}.pdf`)
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
            {history.map((event, index) => (
              <div key={event.id} className="relative flex gap-4">
                {/* Timeline Node */}
                <div className="relative z-10 flex-shrink-0">
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
      </div>
    </AdminLayout>
  );
}
