import { Shield } from "lucide-react";

export default function VerificationHeader() {
  return (
    <div className="mb-[23px] bg-white shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] rounded-[10px] px-[41px] py-[13px] flex items-center gap-[17px]">
      <div className="bg-[#eeffef] p-[7px] rounded-[5px] shadow-[0px_0px_7px_0px_rgba(24,181,34,0.25)]">
        <Shield className="w-[23px] h-[23px] text-[#2aae7a]" />
      </div>
      <div>
        <h1 className="font-semibold text-base text-[#0d1b2a] mb-0 leading-normal">
          Supplier Verification
        </h1>
        <p className="font-medium text-[13px] text-[#9c9c9c] leading-normal">
          Complete verification to unlock premium features and build buyer trust
        </p>
      </div>
    </div>
  );
}
