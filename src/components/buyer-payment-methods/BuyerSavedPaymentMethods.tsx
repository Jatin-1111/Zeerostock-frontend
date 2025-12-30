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
      <div className="bg-white rounded-[15px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] relative">
        <div className="flex items-center justify-between p-[26.25px] pb-[15px]">
          <h3 className="text-[19.5px] font-semibold text-[#0d1b2a] leading-[18px]">
            Saved Payment Methods
          </h3>
        </div>
        <div className="p-9 text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment methods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[15px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] relative">
      <div className="flex items-center justify-between px-[26.25px] pt-[26.25px] pb-[15px]">
        <h3 className="text-[19.5px] font-semibold text-[#0d1b2a] leading-[18px]">
          Saved Payment Methods
        </h3>
        <button
          onClick={onAdd}
          className="bg-[#1e3a8a] text-white rounded-[11.25px] px-[50px] py-[11.25px] flex items-center gap-[7.5px] h-[45px] hover:bg-[#1e3a8a]/90 transition-colors"
        >
          <Plus className="w-[18px] h-[18px]" />
          <span className="text-[15px] font-semibold leading-[16.5px]">
            Add Payment Method
          </span>
        </button>
      </div>
      <div className="px-[37.5px] pb-[37.5px] pt-[22.5px]">
        {methods.length === 0 ? (
          <div className="text-center py-[45px]">
            <div className="w-[60px] h-[60px] bg-[#fbfbfb] border border-[#9c9c9c] rounded-[15px] mx-auto flex items-center justify-center mb-6">
              <CreditCard className="w-[30px] h-[30px] text-[#9c9c9c]" />
            </div>
            <h4 className="text-[18px] font-semibold text-[#0d1b2a] mb-3">
              No Payment Methods Yet
            </h4>
            <p className="text-[12px] text-[#9c9c9c] mb-6">
              Add a bank account or card to make payments to suppliers
            </p>
            <button
              onClick={onAdd}
              className="bg-[#1e3a8a] text-white rounded-[11.25px] px-[60px] py-[11.25px] inline-flex items-center gap-[7.5px] hover:bg-[#1e3a8a]/90 transition-colors"
            >
              <Plus className="w-[15px] h-[15px]" />
              <span className="text-[13.5px] font-semibold">
                Add Your First Payment Method
              </span>
            </button>
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            Payment methods will appear here once added.
          </p>
        )}
      </div>
    </div>
  );
}
