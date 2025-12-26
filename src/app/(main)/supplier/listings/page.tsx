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
import toast from "react-hot-toast";
import Link from "next/link";

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
        toast.error(response.message || "Failed to fetch listings");
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Failed to load listings");
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
      <div className="max-w-[1440px] mx-auto px-20 py-8">
        {/* Page Title */}
        <h1
          className="text-[36px] font-semibold text-[#0d1b2a] mb-8"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-[20px] overflow-hidden relative"
                  style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)" }}
                >
                  {/* Status Badge */}
                  <div
                    className="absolute top-[30px] left-[309px] px-[12px] py-[3px] rounded-[80px] z-10"
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
                    <p
                      className="text-[15px] font-medium leading-normal"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        color:
                          listing.status === "active"
                            ? "#2aae7a"
                            : listing.status === "draft"
                            ? "#9c9c9c"
                            : listing.status === "sold"
                            ? "#1e3a8a"
                            : "#dc2626",
                      }}
                    >
                      {listing.status.charAt(0).toUpperCase() +
                        listing.status.slice(1)}
                    </p>
                  </div>

                  {/* Product Image */}
                  <div
                    className="w-full h-[198px] bg-gray-200 rounded-[20px] m-[15px] overflow-hidden"
                    style={{ width: "calc(100% - 30px)" }}
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
                  <div className="px-[20px] pb-[20px]">
                    {/* Title */}
                    <h3
                      className="text-[20px] font-medium text-[#0d1b2a] mb-2 line-clamp-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {listing.title}
                    </h3>

                    {/* Subtitle */}
                    <p
                      className="text-[14px] font-medium text-[#9c9c9c] mb-4"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {listing.city || "Location not specified"}
                    </p>

                    {/* Pricing */}
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="text-[26px] font-bold text-[#1e3a8a]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {formatCurrency(listing.price_after)}
                      </span>
                      {listing.price_before && (
                        <div className="relative">
                          <span
                            className="text-[18px] font-bold text-[#9c9c9c]"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {formatCurrency(listing.price_before)}
                          </span>
                          <div
                            className="absolute top-1/2 left-0 w-full h-[2px] bg-[#9c9c9c]"
                            style={{ transform: "translateY(-50%)" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Availability Info */}
                    <div className="flex items-center gap-2 mb-4">
                      <p
                        className="text-[14px] font-medium text-[#9c9c9c]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Price alerts{" "}
                        <span style={{ fontFamily: "Inter, sans-serif" }}>
                          ₹
                        </span>
                        {(
                          parseFloat(listing.price_after.toString()) *
                          parseFloat(listing.quantity.toString())
                        ).toLocaleString("en-IN")}
                      </p>
                      <span
                        className="text-[14px] font-medium text-[#9c9c9c]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        |
                      </span>
                      <p
                        className="text-[14px] font-medium text-[#9c9c9c]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {listing.quantity} {listing.unit} available
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 pb-4 border-b border-[#e5e5e5] mb-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-[22px] h-[22px] text-[#9c9c9c]" />
                        <span
                          className="text-[12px] font-medium text-[#9c9c9c]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {listing.views_count}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-[22px] h-[22px] text-[#9c9c9c]" />
                        <span
                          className="text-[12px] font-medium text-[#9c9c9c]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {listing.rating
                            ? Number(listing.rating).toFixed(1)
                            : "0"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-[22px] h-[22px] text-[#9c9c9c]" />
                        <span
                          className="text-[12px] font-medium text-[#9c9c9c]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {listing.inquiries_count}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-[22px] h-[22px] text-[#9c9c9c]" />
                        <span
                          className="text-[12px] font-medium text-[#9c9c9c]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          3d 20h
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/supplier/listings/${listing.id}/edit`}
                        className="flex-1 h-[50px] flex items-center justify-center gap-2 px-5 py-4 border border-[#9c9c9c] rounded-[15px] hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-5 h-5 text-[#9c9c9c]" />
                        <span
                          className="text-[16px] font-medium text-[#9c9c9c]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Edit
                        </span>
                      </Link>
                      <Link
                        href={`/supplier/analytics?product=${listing.id}`}
                        className="flex-1 h-[50px] flex items-center justify-center gap-2 px-5 py-4 bg-[#1e3a8a] rounded-[15px] hover:bg-[#1e40af] transition-colors"
                      >
                        <BarChart3 className="w-5 h-5 text-white" />
                        <span
                          className="text-[16px] font-medium text-white"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
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
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
