"use client";

import Link from "next/link";
import { Edit2, Clock, Loader2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/currency.utils";

interface RFQ {
  id: string;
  title: string;
  rfqNumber: string;
  category?: { name: string };
  status: string;
  quantity: number;
  unit: string;
  budgetMin?: number;
  budgetMax?: number;
  quotesCount: number;
  expiresAt?: string;
  createdAt: string;
}

export default function ActiveRFQsList() {
  const { currency } = useAuth();
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRFQs = async () => {
      try {
        setIsLoading(true);
        const token =
          localStorage.getItem("zeerostock_access_token") ||
          localStorage.getItem("token");
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          `${apiBaseUrl}/rfq?status=active&limit=3`,
          {
            credentials: "include",
            headers,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch RFQs");
        }

        const data = await response.json();
        console.log("RFQ API response:", data);

        // Backend returns 'items' not 'rfqs'
        if (data.success && data.data?.items) {
          console.log("RFQs found:", data.data.items.length);
          setRfqs(data.data.items);
        } else {
          console.log("No RFQs found in response");
        }
      } catch (err) {
        console.error("Error fetching RFQs:", err);
        setError("Failed to load RFQs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRFQs();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "urgent":
        return "bg-[#fff5f5] text-[#dc2626] shadow-[0px_0px_4px_0px_rgba(220,38,38,0.25)]";
      case "active":
        return "bg-[#eeffef] text-[#2aae7a] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)]";
      case "closed":
        return "bg-gray-100 text-gray-600 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]";
      case "expired":
        return "bg-orange-50 text-orange-600 shadow-[0px_0px_4px_0px_rgba(255,165,0,0.25)]";
      default:
        return "bg-gray-100 text-gray-900 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]";
    }
  };

  const calculateTimeLeft = (expiresAt?: string) => {
    if (!expiresAt) return "No deadline";
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Expires today";
    if (diffDays === 1) return "1 day";
    return `${diffDays} days`;
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-[#0d1b2a] leading-normal">
          Active RFQs
        </h2>
        <Link
          href="/buyer/rfq/my-rfqs"
          className="text-[12px] sm:text-[13px] font-medium text-[#9c9c9c] hover:text-[#0d1b2a] transition-colors"
        >
          See All
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-7">
          <Loader2 className="w-4.5 h-4.5 animate-spin text-[#1e3a8a]" />
        </div>
      ) : error ? (
        <div className="text-center py-7 text-red-600">{error}</div>
      ) : rfqs.length === 0 ? (
        <div className="text-center py-7 text-gray-600">
          <p className="mb-2">No active RFQs found</p>
          <Link
            href="/buyer/rfq/post"
            className="px-4 py-1.5 bg-[#1e3a8a] text-white rounded-[8px] font-semibold hover:bg-[#1e3a8a]/90 transition-colors inline-block"
          >
            Post Your First RFQ
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {rfqs.map((rfq) => {
            const budgetRange =
              rfq.budgetMin && rfq.budgetMax
                ? `${formatPrice(rfq.budgetMin, currency)} - ${formatPrice(rfq.budgetMax, currency)}`
                : rfq.budgetMin
                  ? `${formatPrice(rfq.budgetMin, currency)}+`
                  : rfq.budgetMax
                    ? `Up to ${formatPrice(rfq.budgetMax, currency)}`
                    : "Budget not specified";

            return (
              <div
                key={rfq.id}
                className="bg-white rounded-[10px] sm:rounded-[11px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[14px] sm:p-[17px] relative min-h-[145px] sm:h-[153px]"
              >
                {/* Top Row: Category and Budget */}
                <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <p className="text-[10px] sm:text-[11px] font-medium text-[#9c9c9c] leading-normal">
                      {rfq.category?.name || "Uncategorized"}
                    </p>
                    <span
                      className={`px-[6px] sm:px-[8px] py-0 h-[12px] sm:h-[13px] rounded-[10px] sm:rounded-[11px] text-[8px] sm:text-[9px] font-medium leading-[12px] sm:leading-[13px] inline-flex items-center ${getStatusColor(
                        rfq.status,
                      )}`}
                    >
                      {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-[15px] sm:text-[18px] font-semibold text-[#0d1b2a] leading-[13px] shrink-0">
                    {budgetRange}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[13px] sm:text-[15px] font-semibold text-[#0d1b2a] leading-[13px] tracking-[0.3px] mb-1.5">
                  {rfq.title}
                </h3>

                {/* Quantity and Time */}
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <p className="text-[10px] sm:text-[11px] font-medium text-[#9c9c9c] leading-normal">
                    {rfq.quotesCount || 0}{" "}
                    {(rfq.quotesCount || 0) === 1 ? "Response" : "Responses"}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
                    <p className="text-[10px] sm:text-[11px] font-medium text-[#9c9c9c] leading-normal">
                      {rfq.quantity} {rfq.unit}
                    </p>
                    <div className="flex items-center gap-[4px]">
                      <Clock
                        className="w-[11px] sm:w-[12px] h-[11px] sm:h-[12px] text-[#9c9c9c]"
                        strokeWidth={1.5}
                      />
                      <span className="text-[10px] sm:text-[11px] font-medium text-[#9c9c9c] leading-normal">
                        {calculateTimeLeft(rfq.expiresAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="absolute left-[14px] sm:left-[17px] right-[14px] sm:right-[17px] h-[1px] bg-gray-300"
                  style={{ top: "85px" }}
                ></div>

                {/* Action Buttons */}
                <div className="absolute bottom-[14px] sm:bottom-[17px] left-[14px] sm:left-[17px] flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <Link
                    href={`/buyer/quotes?rfqId=${rfq.id}`}
                    className="h-[30px] sm:h-[34px] px-[20px] sm:px-[26px] bg-[#1e3a8a] text-white rounded-[7px] sm:rounded-[8px] font-semibold text-[10px] sm:text-[11px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center gap-[5px] sm:gap-[6px]"
                  >
                    <Eye
                      className="w-[13px] sm:w-[14px] h-[13px] sm:h-[14px]"
                      strokeWidth={1.5}
                    />
                    <span className="hidden xs:inline">View Quotes</span>
                    <span className="xs:hidden">View</span>
                  </Link>
                  <Link
                    href={`/buyer/rfq/edit/${rfq.id}`}
                    className="h-[30px] sm:h-[34px] px-[24px] sm:px-[34px] bg-white border border-[#9c9c9c] text-[#9c9c9c] rounded-[7px] sm:rounded-[8px] font-semibold text-[10px] sm:text-[11px] hover:bg-gray-50 transition-colors flex items-center gap-[5px] sm:gap-[6px]"
                    title={
                      rfq.quotesCount && rfq.quotesCount > 0
                        ? `Editing will mark ${rfq.quotesCount} pending quote(s) as outdated`
                        : "Edit RFQ"
                    }
                  >
                    <Edit2
                      className="w-[12px] sm:w-[13px] h-[12px] sm:h-[13px]"
                      strokeWidth={1.5}
                    />
                    Edit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
