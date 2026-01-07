"use client";

import { CreditCard, Building2, Edit2, Trash2, Plus } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  name: string;
  last_four: string;
  details: string;
}

interface BuyerSavedPaymentMethodsProps {
  methods?: PaymentMethod[];
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function BuyerSavedPaymentMethods({
  methods = [],
  loading = false,
  onAdd,
  onEdit,
  onDelete,
}: BuyerSavedPaymentMethodsProps) {
  const getIcon = (type: string) => {
    return type === "bank" ? Building2 : CreditCard;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[8px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] relative">
        <div className="flex items-center justify-between px-[15px] pt-[15px] pb-[8px]">
          <h3 className="text-[11px] font-semibold text-[#0d1b2a] leading-[10px]">
            Saved Payment Methods
          </h3>
        </div>
        <div className="p-5 text-center">
          <div className="w-9 h-9 border-[2px] border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-[9px]">Loading payment methods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[8px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] relative">
      <div className="flex items-center justify-between px-[15px] pt-[15px] pb-[8px]">
        <h3 className="text-[11px] font-semibold text-[#0d1b2a] leading-[10px]">
          Saved Payment Methods
        </h3>
        <button
          onClick={onAdd}
          className="bg-[#1e3a8a] text-white rounded-[6px] px-[29px] py-[6px] flex items-center gap-[5px] h-[26px] hover:bg-[#1e3a8a]/90 transition-colors"
        >
          <Plus className="w-[10px] h-[10px]" />
          <span className="text-[8px] font-semibold leading-[9px]">
            Add Payment Method
          </span>
        </button>
      </div>
      <div className="px-[21px] pb-[21px] pt-[13px]">
        {methods.length === 0 ? (
          <div className="text-center py-[26px]">
            <div className="w-[34px] h-[34px] bg-[#fbfbfb] border border-[#9c9c9c] rounded-[8px] mx-auto flex items-center justify-center mb-3">
              <CreditCard className="w-[17px] h-[17px] text-[#9c9c9c]" />
            </div>
            <h4 className="text-[10px] font-semibold text-[#0d1b2a] mb-1.5">
              No Payment Methods Yet
            </h4>
            <p className="text-[7px] text-[#9c9c9c] mb-3">
              Add a bank account or card to make payments to suppliers
            </p>
            <button
              onClick={onAdd}
              className="bg-[#1e3a8a] text-white rounded-[6px] px-[34px] py-[6px] inline-flex items-center gap-[5px] hover:bg-[#1e3a8a]/90 transition-colors"
            >
              <Plus className="w-[8px] h-[8px]" />
              <span className="text-[8px] font-semibold">
                Add Your First Payment Method
              </span>
            </button>
          </div>
        ) : (
          <p className="text-gray-600 text-center py-5">
            Payment methods will appear here once added.
          </p>
        )}
      </div>
    </div>
  );
}
