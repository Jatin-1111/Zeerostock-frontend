import { ShieldCheck } from "lucide-react";

interface EscrowProtectionProps {
  amount: string;
  releaseDate: string;
}

export default function EscrowProtection({
  amount,
  releaseDate,
}: EscrowProtectionProps) {
  return (
    <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[15px] p-[23px] mb-5 relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Icon and Title */}
      <div className="flex items-center gap-[14px] mb-5">
        <ShieldCheck
          className="w-[25px] h-[25px] text-[#2aae7a]"
          strokeWidth={1.5}
        />
        <h3 className="font-['Poppins'] font-medium text-[#0d1b2a] text-[18px] leading-normal">
          Escrow Protection
        </h3>
      </div>

      {/* Main Description */}
      <p className="font-['Poppins'] font-medium text-[#9c9c9c] text-[15px] leading-normal mb-8">
        Your payment of ${amount} is securely held in escrow until {releaseDate}
        . Funds will be released to suppliers automatically after the escrow
        period, or when you confirm receipt and satisfaction.
      </p>

      {/* View More Details Button */}
      <button className="w-[165px] mx-auto block bg-[#1e3a8a] text-white font-['Poppins'] font-medium text-[14px] leading-[17px] py-[11px] rounded-[15px] hover:bg-[#1e3a8a]/90 transition-colors">
        View More Details
      </button>

      {/* Footer Note */}
      <p className="font-['Poppins'] font-medium text-[#9c9c9c] text-[12px] leading-normal text-center mt-5">
        You can release funds early or extend the escrow period if needed
      </p>
    </div>
  );
}
