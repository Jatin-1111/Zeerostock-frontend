"use client";

import { CreditCard, Building2, Edit, Trash2, Plus } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  name: string;
  last_four: string;
  details: string;
}

interface SavedPaymentMethodsProps {
  methods?: PaymentMethod[];
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function SavedPaymentMethods({
  methods = [],
  loading = false,
  onAdd,
  onEdit,
  onDelete,
}: SavedPaymentMethodsProps) {
  const getIcon = (type: string) => {
    return type === "bank" ? Building2 : CreditCard;
  };

  if (loading) {
    return (
      <div className="bg-white border-2 border-gray-900 mb-6">
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-900">
          <h3 className="text-lg font-bold text-gray-900">Payout Methods</h3>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payout methods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-900 mb-6">
      <div className="flex items-center justify-between p-6 border-b-2 border-gray-900">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Payout Methods</h3>
          <p className="text-xs text-gray-600 mt-1">
            Configure how you receive payments from customers
          </p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Payout Method
        </button>
      </div>

      <div className="p-6">
        {methods.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 mx-auto flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-gray-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              No Payout Methods Yet
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Add a bank account or card to receive payments from your sales
            </p>
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium inline-flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Payout Method
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {methods.map((method) => {
              const IconComponent = getIcon(method.type);
              return (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border-2 border-gray-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {method.name} •••• {method.last_four}
                      </p>
                      <p className="text-xs text-gray-600">{method.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit && onEdit(method.id)}
                      className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-colors"
                      title="Edit payout method"
                    >
                      <Edit className="w-4 h-4 text-gray-900" />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(method.id)}
                      className="p-2 border-2 border-gray-900 hover:bg-red-50 transition-colors"
                      title="Delete payout method"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
