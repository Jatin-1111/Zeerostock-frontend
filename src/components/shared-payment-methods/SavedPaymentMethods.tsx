"use client";

import { useState } from "react";
import { CreditCard, Building2, Trash2, Plus } from "lucide-react";
import AddPaymentMethodModal from "./AddPaymentMethodModal";
import { supplierService } from "@/services/supplier.service";
import { toast } from "react-hot-toast";

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "upi";
  is_primary: boolean;
  is_verified: boolean;
  status: string;
  card_last_four?: string;
  card_brand?: string;
  card_holder_name?: string;
  bank_account_number_last_four?: string;
  bank_name?: string;
  paypal_email?: string;
  upi_id?: string;
  upi_provider?: string;
  nickname?: string;
  processing_fee_percent?: number;
  processing_time?: string;
}

interface SavedPaymentMethodsProps {
  methods?: PaymentMethod[];
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRefresh?: () => void;
}

export default function SavedPaymentMethods({
  methods = [],
  loading = false,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
}: SavedPaymentMethodsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getIcon = (type: string) => {
    return type === "bank" ? Building2 : CreditCard;
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    if (onAdd) {
      onAdd();
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddPaymentMethod = async (paymentData: any) => {
    try {
      setIsSubmitting(true);
      const response = await supplierService.addPaymentMethod(paymentData);

      if (response.success) {
        toast.success("Payment method added successfully!");
        setIsModalOpen(false);

        // Refresh the payment methods list
        if (onRefresh) {
          onRefresh();
        }
      } else {
        toast.error(response.message || "Failed to add payment method");
      }
    } catch (error: any) {
      console.error("Error adding payment method:", error);
      toast.error(
        error.message || "An error occurred while adding payment method",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this payment method?")) {
      return;
    }

    try {
      const response = await supplierService.deletePaymentMethod(id);

      if (response.success) {
        toast.success("Payment method deleted successfully!");

        // Refresh the payment methods list
        if (onRefresh) {
          onRefresh();
        }
      } else {
        toast.error(response.message || "Failed to delete payment method");
      }
    } catch (error: any) {
      console.error("Error deleting payment method:", error);
      toast.error(
        error.message || "An error occurred while deleting payment method",
      );
    }
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
    <>
      <div className="bg-white rounded-[8px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] relative">
        <div className="flex items-center justify-between px-[15px] pt-[15px] pb-[8px]">
          <h3 className="text-[11px] font-semibold text-[#0d1b2a] leading-[10px]">
            Saved Payment Methods
          </h3>
          <button
            onClick={handleAddClick}
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
                Add a bank account or card to receive payments from your sales
              </p>
              <button
                onClick={handleAddClick}
                className="bg-[#1e3a8a] text-white rounded-[6px] px-[34px] py-[6px] inline-flex items-center gap-[5px] hover:bg-[#1e3a8a]/90 transition-colors"
              >
                <Plus className="w-[8px] h-[8px]" />
                <span className="text-[8px] font-semibold">
                  Add Your First Payment Method
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-[10px]">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className="border border-gray-200 rounded-[6px] p-[10px] flex items-center justify-between"
                >
                  <div className="flex items-center gap-[10px]">
                    {method.type === "card" && (
                      <CreditCard className="w-[16px] h-[16px] text-[#2AAE7A]" />
                    )}
                    {method.type === "bank" && (
                      <Building2 className="w-[16px] h-[16px] text-[#2AAE7A]" />
                    )}
                    {method.type === "upi" && (
                      <CreditCard className="w-[16px] h-[16px] text-[#2AAE7A]" />
                    )}
                    <div>
                      <p className="text-[8px] font-semibold text-[#0d1b2a]">
                        {method.nickname || `${method.type.toUpperCase()}`}
                      </p>
                      <p className="text-[7px] text-[#9c9c9c]">
                        {method.type === "card" &&
                          `${method.card_brand} •••• ${method.card_last_four}`}
                        {method.type === "bank" && method.paypal_email}
                        {method.type === "upi" && method.upi_id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    {method.is_primary && (
                      <span className="text-[6px] bg-[#EEFFEF] text-[#2AAE7A] px-[6px] py-[2px] rounded">
                        Primary
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteClick(method.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-[12px] h-[12px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddPaymentMethodModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAdd={handleAddPaymentMethod}
      />
    </>
  );
}
