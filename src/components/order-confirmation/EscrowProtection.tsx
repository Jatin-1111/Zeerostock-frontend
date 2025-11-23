import { Lock, Info } from "lucide-react";

interface EscrowProtectionProps {
  amount: string;
  releaseDate: string;
}

export default function EscrowProtection({
  amount,
  releaseDate,
}: EscrowProtectionProps) {
  return (
    <div className="border-2 border-gray-900 rounded p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5 text-gray-900" />
        <h3 className="font-bold text-gray-900">Escrow Protection</h3>
      </div>

      <div className="bg-gray-50 border border-gray-900 rounded p-4 mb-4">
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">
            Your payment of ${amount} is securely held in escrow until{" "}
            {releaseDate}.
          </span>{" "}
          Funds will be released to suppliers automatically after the escrow
          period, or when you confirm receipt and satisfaction.
        </p>
      </div>

      <button className="w-full py-2.5 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
        <Info className="w-4 h-4" />
        <span>View Escrow Details</span>
      </button>
    </div>
  );
}
