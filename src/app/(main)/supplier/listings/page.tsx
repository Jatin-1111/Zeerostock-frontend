"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Star,
  MessageCircle,
  Clock,
  Edit,
  BarChart3,
  Package,
} from "lucide-react";
import { supplierService, SupplierListing } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Link from "next/link";
import { getTimeRemaining } from "@/utils/time.utils";

export default function SupplierListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState<SupplierListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [roleError, setRoleError] = useState(false);

  useEffect(() => {
    // Check if user has supplier role
    if (user && user.activeRole !== "supplier") {
      setRoleError(true);
      setLoading(false);
      return;
    }
    fetchListings();
  }, [user, filter, page]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await supplierService.getMyListings({
        status: filter === "all" ? undefined : filter,
        page,
        limit: 12,
        sortBy: "created_at",
        sortOrder: "DESC",
      });

      if (response.success && response.data) {
        setListings(response.data.listings);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        toast.error(response.message || "Unable to fetch your listings");
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Unable to load your listings at this time");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Show role error if user is not in supplier mode
  if (roleError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Supplier Access Required
          </h2>
          <p className="text-gray-600 mb-6">
            You are currently in{" "}
            <span className="font-semibold">{user?.activeRole}</span> mode.
            Please switch to supplier mode to access this page.
          </p>
          <div className="space-y-3">
            {user?.roles?.includes("supplier") ? (
              <Link
                href="/profile?switchRole=supplier"
                className="block px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
              >
                Switch to Supplier Mode
              </Link>
            ) : (
              <Link
                href="/supplier/register"
                className="block px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
              >
                Register as Supplier
              </Link>
            )}
            <Link
              href="/"
              className="block px-6 py-3 border-2 border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEFBF6]">
      <div className="max-w-[1440px] mx-auto px-10 py-4">
        {/* Page Title */}
        <h1 className="text-xl font-semibold text-[#0d1b2a] mb-4">
          Active Listing
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading listings...</p>
            </div>
          </div>
        ) : listings.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No listings found
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === "all"
                ? "Start by creating your first product listing"
                : `No ${filter} listings found`}
            </p>
            <Link
              href="/supplier/listings/new"
              className="px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add New Product
            </Link>
          </div>
        ) : (
          <>
            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-[10px] overflow-hidden relative flex flex-col"
                  style={{
                    boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.25)",
                    height: "275px",
                  }}
                >
                  {/* Status Badge */}
                  <div
                    className="absolute top-[7.5px] right-[7.5px] px-[6px] py-[1.5px] rounded-[40px] z-10"
                    style={{
                      backgroundColor:
                        listing.status === "active"
                          ? "#eeffef"
                          : listing.status === "draft"
                          ? "#f2f2f2"
                          : listing.status === "sold"
                          ? "#dbeafe"
                          : "#fee2e2",
                    }}
                  >
                    <p className="text-xs font-medium leading-normal capitalize">
                      {listing.status}
                    </p>
                  </div>

                  {/* Product Image */}
                  <div
                    className="w-full h-[99px] bg-gray-200 rounded-[10px] m-[7.5px] overflow-hidden"
                    style={{ width: "calc(100% - 15px)" }}
                  >
                    {listing.image_url ? (
                      <img
                        src={listing.image_url}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div
                    className="px-[10px] pb-[10px] flex flex-col"
                    style={{ height: "calc(300px - 114px)" }}
                  >
                    {/* Title - Fixed height */}
                    <div className="h-[28px] mb-1">
                      <h3 className="text-xs font-medium text-[#0d1b2a] line-clamp-2">
                        {listing.title}
                      </h3>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs font-medium text-[#9c9c9c] mb-2 h-[10px]">
                      {listing.city || "Location not specified"}
                    </p>

                    {/* Pricing */}
                    <div className="mb-2 flex items-center gap-1.5 h-[18px]">
                      <span className="text-sm font-bold text-[#1e3a8a] leading-none">
                        {formatCurrency(listing.price_after)}
                      </span>
                      {listing.price_before && listing.price_before > 0 && (
                        <div className="relative">
                          <span className="text-xs font-bold text-[#9c9c9c]">
                            {formatCurrency(listing.price_before)}
                          </span>
                          <div
                            className="absolute top-1/2 left-0 w-full h-[1px] bg-[#9c9c9c]"
                            style={{ transform: "translateY(-50%)" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Availability Info */}
                    <div className="flex items-center gap-1 mb-2 h-[10px]">
                      <p className="text-xs font-medium text-[#9c9c9c] truncate">
                        Total value:{" "}
                        {formatCurrency(listing.price_after * listing.quantity)}
                      </p>
                      <span className="text-xs font-medium text-[#9c9c9c]">
                        |
                      </span>
                      <p className="text-xs font-medium text-[#9c9c9c] truncate">
                        {listing.quantity} {listing.unit} available
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-2 pb-2 border-b border-[#e5e5e5] mb-2 h-[25px]">
                      <div className="flex items-center gap-1">
                        <Eye className="w-[11px] h-[11px] text-[#9c9c9c]" />
                        <span className="text-xs font-medium text-[#9c9c9c]">
                          {listing.views_count || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-[11px] h-[11px] text-[#9c9c9c]" />
                        <span className="text-xs font-medium text-[#9c9c9c]">
                          {listing.rating
                            ? Number(listing.rating).toFixed(1)
                            : "0.0"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-[11px] h-[11px] text-[#9c9c9c]" />
                        <span className="text-xs font-medium text-[#9c9c9c]">
                          {listing.inquiries_count || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-[11px] h-[11px] text-[#9c9c9c]" />
                        <span className="text-xs font-medium text-[#9c9c9c]">
                          {getTimeRemaining(listing.expires_at)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons - Pushed to bottom with mt-auto */}
                    <div className="flex gap-1 h-[25px]">
                      <Link
                        href={`/supplier/listings/${listing.id}/edit`}
                        className="flex-1 h-[25px] flex items-center justify-center gap-1 px-2.5 py-2 border border-[#9c9c9c] rounded-[7.5px] hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-2.5 h-2.5 text-[#9c9c9c]" />
                        <span className="text-xs font-medium text-[#9c9c9c]">
                          Edit
                        </span>
                      </Link>
                      <Link
                        href={`/supplier/analytics?product=${listing.id}`}
                        className="flex-1 h-[25px] flex items-center justify-center gap-1 px-2.5 py-2 bg-[#1e3a8a] rounded-[7.5px] hover:bg-[#1e40af] transition-colors"
                      >
                        <BarChart3 className="w-2.5 h-2.5 text-white" />
                        <span className="text-xs font-medium text-white">
                          Analytics
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2 py-1 border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-2 py-1 text-xs text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-2 py-1 border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
