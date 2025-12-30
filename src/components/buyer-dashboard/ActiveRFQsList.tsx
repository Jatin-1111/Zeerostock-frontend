"use client";

import Link from "next/link";
import { Edit2, Clock, Loader2, Eye } from "lucide-react";
import { useEffect, useState } from "react";

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
          }
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
    <div className="space-y-5">
      <h2
        className="text-[27px] font-semibold text-[#0d1b2a] leading-normal"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Active RFQs
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-9">
          <Loader2 className="w-6 h-6 animate-spin text-[#1e3a8a]" />
        </div>
      ) : error ? (
        <div className="text-center py-9 text-red-600">{error}</div>
      ) : rfqs.length === 0 ? (
        <div className="text-center py-9 text-gray-600">
          <p className="mb-3">No active RFQs found</p>
          <Link
            href="/buyer/rfq"
            className="px-5 py-2 bg-[#1e3a8a] text-white rounded-[11px] font-semibold hover:bg-[#1e3a8a]/90 transition-colors inline-block"
          >
            Post Your First RFQ
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {rfqs.map((rfq) => {
            const budgetRange =
              rfq.budgetMin && rfq.budgetMax
                ? `₹${rfq.budgetMin.toLocaleString("en-IN")}`
                : rfq.budgetMax
                ? `₹${rfq.budgetMax.toLocaleString("en-IN")}`
                : "Budget not specified";

            return (
              <div
                key={rfq.id}
                className="bg-white rounded-[15px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] p-[22px] relative h-[204px]"
              >
                {/* Top Row: Category and Budget */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <p
                      className="text-[15px] font-medium text-[#9c9c9c] leading-normal"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {rfq.category?.name || "Uncategorized"}
                    </p>
                    <span
                      className={`px-[11px] py-0 h-[18px] rounded-[15px] text-[12px] font-medium leading-[18px] inline-flex items-center ${getStatusColor(
                        rfq.status
                      )}`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                    </span>
                  </div>
                  <div
                    className="text-[24px] font-semibold text-[#0d1b2a] leading-[18px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {budgetRange}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-[20px] font-semibold text-[#0d1b2a] leading-[18px] tracking-[0.4px] mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {rfq.title}
                </h3>

                {/* Quantity and Time */}
                <div className="flex items-center justify-between mb-5">
                  <p
                    className="text-[15px] font-medium text-[#9c9c9c] leading-normal"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {rfq.quotesCount || 0}{" "}
                    {(rfq.quotesCount || 0) === 1 ? "Response" : "Responses"}
                  </p>
                  <div className="flex items-center gap-4">
                    <p
                      className="text-[15px] font-medium text-[#9c9c9c] leading-normal"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {rfq.quantity} {rfq.unit}
                    </p>
                    <div className="flex items-center gap-[5px]">
                      <Clock
                        className="w-[16px] h-[16px] text-[#9c9c9c]"
                        strokeWidth={1.5}
                      />
                      <span
                        className="text-[15px] font-medium text-[#9c9c9c] leading-normal"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {calculateTimeLeft(rfq.expiresAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="absolute left-[22px] right-[22px] h-[1px] bg-gray-300"
                  style={{ top: "118px" }}
                ></div>

                {/* Action Buttons */}
                <div className="absolute bottom-[22px] left-[22px] flex items-center gap-3">
                  <Link
                    href={`/buyer/quotes?rfqId=${rfq.id}`}
                    className="h-[45px] px-[35px] bg-[#1e3a8a] text-white rounded-[11px] font-semibold text-[15px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center gap-[8px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Eye className="w-[19px] h-[19px]" strokeWidth={1.5} />
                    View Quotes
                  </Link>
                  <Link
                    href={`/buyer/rfq?edit=${rfq.id}`}
                    className="h-[45px] px-[45px] bg-white border border-[#9c9c9c] text-[#9c9c9c] rounded-[11px] font-semibold text-[15px] hover:bg-gray-50 transition-colors flex items-center gap-[8px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Edit2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
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
