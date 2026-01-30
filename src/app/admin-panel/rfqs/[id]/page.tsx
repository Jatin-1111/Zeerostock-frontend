"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Package,
  Calendar,
  MapPin,
  DollarSign,
} from "lucide-react";
import { AdminLayout, PageHeader } from "@/components/admin-panel";
import { useRouter, useParams } from "next/navigation";
import adminService, { RFQ } from "@/services/admin.service";

export default function AdminRFQDetailPage() {
  const router = useRouter();
  const params = useParams();
  const rfqId = params.id as string;

  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (rfqId) {
      fetchRFQDetails();
    }
  }, [rfqId]);

  const fetchRFQDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminService.getRFQById(rfqId);

      if (response.success && response.data) {
        setRfq(response.data);
      }
    } catch (err: any) {
      console.error("Error fetching RFQ details:", err);
      setError(err.message || "Failed to load RFQ details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "fulfilled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12">Loading RFQ details...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !rfq) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12 text-red-600">
            {error || "RFQ not found"}
          </div>
          <div className="text-center">
            <button
              onClick={() => router.push("/admin-panel/rfqs")}
              className="text-blue-600 hover:underline"
            >
              Back to RFQs
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin-panel/rfqs")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to RFQs
          </button>
          <PageHeader
            title={`RFQ: ${rfq.rfqNumber}`}
            description="Request for Quote Details"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* RFQ Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {rfq.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Posted on {new Date(rfq.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                    rfq.status,
                  )}`}
                >
                  {rfq.status}
                </span>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {rfq.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Requirements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Quantity</div>
                    <div className="font-medium text-gray-900">
                      {rfq.quantity} {rfq.unit}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Delivery Date</div>
                    <div className="font-medium text-gray-900">
                      {new Date(rfq.deliveryDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">
                      Delivery Location
                    </div>
                    <div className="font-medium text-gray-900">
                      {rfq.deliveryLocation}
                    </div>
                  </div>
                </div>
                {rfq.budgetMin && rfq.budgetMax && (
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Budget Range</div>
                      <div className="font-medium text-gray-900">
                        ₹{rfq.budgetMin.toLocaleString()} - ₹
                        {rfq.budgetMax.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Market Insights
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <strong>Industry:</strong>{" "}
                  {rfq.industry?.name || "Not specified"}
                </p>
                <p className="text-gray-700">
                  <strong>Category:</strong>{" "}
                  {rfq.category?.name || "Not specified"}
                </p>
                <p className="text-gray-700 mt-4">
                  💡 <strong>Analysis:</strong> This RFQ indicates buyer demand
                  in the {rfq.industry?.name} sector. Consider onboarding more
                  suppliers in this category to meet market needs.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Buyer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Buyer Information
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Company</div>
                  <div className="font-medium text-gray-900">
                    {rfq.buyer.companyName || "Not provided"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Contact Person</div>
                  <div className="font-medium text-gray-900">
                    {rfq.buyer.firstName} {rfq.buyer.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium text-gray-900 break-all">
                    {rfq.buyer.businessEmail}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Days Active</span>
                  <span className="font-medium text-gray-900">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(rfq.createdAt).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <span className="font-medium text-gray-900">
                    {new Date(rfq.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
