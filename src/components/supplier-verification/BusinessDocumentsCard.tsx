import { Clock, CheckCircle2, BadgeCheck, BadgeAlert } from "lucide-react";
import { DocumentRowNew } from "./VerificationBenefitsSidebar";

interface Document {
  label: string;
  url: string;
  required: boolean;
  status: string;
  uploadedDate: string;
}

interface BusinessDocumentsCardProps {
  documents: Document[];
  status: string;
  formatDate: (date: string) => string;
}

export default function BusinessDocumentsCard({
  documents,
  status,
  formatDate,
}: BusinessDocumentsCardProps) {
  // Check if all required documents are verified
  const allDocumentsVerified = documents.every(
    (doc) => doc.status === "approved" || doc.status === "verified"
  );

  // Overall verification status considers both the main status and individual document status
  const isVerified =
    (status === "approved" || status === "verified") && allDocumentsVerified;

  return (
    <div className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] p-[20px]">
      <div className="flex items-center justify-between mb-[15px]">
        <div className="flex items-center gap-[13px]">
          {isVerified ? (
            <BadgeCheck className="w-[19px] h-[19px] text-[#00B14F]" />
          ) : (
            <BadgeAlert className="w-[19px] h-[19px] text-[#fc3]" />
          )}
          <h3 className="font-semibold text-[12px] text-[#0d1b2a]">
            Business Documents
          </h3>
        </div>
        <div
          className={`px-[10px] py-[3px] rounded-[10px] shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] flex items-center gap-[5px] ${
            isVerified ? "bg-[#eeffef]" : "bg-[#fff3cf]"
          }`}
        >
          {isVerified ? (
            <CheckCircle2 className="w-[11px] h-[11px] text-[#2aae7a]" />
          ) : (
            <Clock className="w-[11px] h-[11px] text-[#fc3]" />
          )}
          <span
            className={`font-medium text-[12px] ${
              isVerified ? "text-[#2aae7a]" : "text-[#fc3]"
            }`}
          >
            {isVerified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-[15px]"></div>

      <div className="space-y-[10px]">
        {documents.map((doc, index) => (
          <DocumentRowNew
            key={index}
            label={doc.label}
            date={`Uploaded ${formatDate(doc.uploadedDate)}`}
            status={doc.status}
            optional={!doc.required}
          />
        ))}
      </div>
    </div>
  );
}
