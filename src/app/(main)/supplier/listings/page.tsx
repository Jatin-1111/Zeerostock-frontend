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
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Listings
              </h1>
              <p className="text-sm text-gray-600">
                Manage your product listings
              </p>
            </div>
            <Link
              href="/supplier/listings/new"
              className="px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Add New Product
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            {["all", "active", "draft", "sold", "expired"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setFilter(status);
                  setPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium capitalize ${
                  filter === status
                    ? "border-b-2 border-gray-900 text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>
        </div>

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
                  className="bg-white border-2 border-gray-900 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="w-full h-64 bg-gray-200 border-b-2 border-gray-900 flex items-center justify-center overflow-hidden">
                    {listing.image_url ? (
                      <img
                        src={listing.image_url}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    {/* Status Badge */}
                    <div className="mb-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold ${
                          listing.status === "active"
                            ? "bg-green-100 text-green-800"
                            : listing.status === "draft"
                            ? "bg-gray-100 text-gray-800"
                            : listing.status === "sold"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {listing.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {listing.title}
                    </h3>

                    {/* Pricing */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(listing.price_after)}
                        </span>
                        {listing.price_before && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(listing.price_before)}
                          </span>
                        )}
                      </div>
                      {listing.discount_percent > 0 && (
                        <p className="text-xs text-green-600">
                          {listing.discount_percent}% off
                        </p>
                      )}
                    </div>

                    {/* Availability */}
                    <p className="text-sm text-gray-600 mb-4">
                      {listing.quantity} {listing.unit} available •{" "}
                      {listing.city}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">
                          {listing.views_count}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600">
                          {listing.rating
                            ? Number(listing.rating).toFixed(1)
                            : "0.0"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">
                          {listing.inquiries_count}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">
                          {listing.watchers_count}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Link
                        href={`/supplier/listings/${listing.id}/edit`}
                        className="flex-1 py-2 bg-white border-2 border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <Link
                        href={`/supplier/analytics?product=${listing.id}`}
                        className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Analytics
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
