"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/buyer-dashboard/DashboardHeader";
import StatsCards from "@/components/buyer-dashboard/StatsCards";
import ActiveRFQsList from "@/components/buyer-dashboard/ActiveRFQsList";
import CostSavings from "@/components/buyer-dashboard/CostSavings";
import { buyerService } from "@/services/buyer.service";
import { getRFQStats } from "@/services/rfq.service";
import { getQuoteStats } from "@/services/quote.service";
import type { OrderStats, RFQStats, QuoteStats } from "@/types/buyer.types";

export default function BuyerDashboardPage() {
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [rfqStats, setRfqStats] = useState<RFQStats | null>(null);
  const [quoteStats, setQuoteStats] = useState<QuoteStats | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

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

        // Define profile fetch promise
        const fetchProfile = async () => {
          try {
            const response = await fetch(`${apiBaseUrl}/buyer/profile`, {
              credentials: "include",
              headers,
            });
            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data) {
                return data.data.firstName || data.data.first_name || "";
              }
            }
          } catch (e) {
            console.error("Profile fetch error", e);
          }
          // Fallback to local storage
          const userStr = localStorage.getItem("user");
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              return user.firstName || user.first_name || user.name || "";
            } catch (e) {
              return "";
            }
          }
          return "";
        };

        // Execute all requests in parallel
        const [profileName, statsRes, rfqRes, quoteRes] = await Promise.all([
          fetchProfile(),
          buyerService.getOrderStats(),
          getRFQStats(),
          getQuoteStats(),
        ]);

        // Set state
        setUserName(profileName);

        if (statsRes.success && statsRes.data) {
          setOrderStats(statsRes.data);
        }

        if (rfqRes.success && rfqRes.data) {
          setRfqStats(rfqRes.data);
        }

        if (quoteRes.success && quoteRes.data) {
          setQuoteStats(quoteRes.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-15 py-3 sm:py-4 md:py-4.5">
      {error && (
        <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <DashboardHeader userName={userName} />

      <div className="mt-3 sm:mt-4 md:mt-4.5">
        <StatsCards
          orderStats={orderStats}
          rfqStats={rfqStats}
          quoteStats={quoteStats}
          isLoading={isLoading}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-4.5 mt-3 sm:mt-4 md:mt-4.5">
        <div className="flex-1 lg:flex-3">
          <ActiveRFQsList />
        </div>

        <div className="flex-1 lg:mt-10.5">
          <CostSavings />
        </div>
      </div>
    </div>
  );
}
