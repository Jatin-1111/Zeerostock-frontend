"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/buyer-dashboard/DashboardHeader";
import StatsCards from "@/components/buyer-dashboard/StatsCards";
import ActiveRFQsList from "@/components/buyer-dashboard/ActiveRFQsList";
import CostSavings from "@/components/buyer-dashboard/CostSavings";
import { buyerService } from "@/services/buyer.service";
import type { OrderStats } from "@/types/buyer.types";

export default function BuyerDashboardPage() {
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch user profile for name
        const token =
          localStorage.getItem("zeerostock_access_token") ||
          localStorage.getItem("token");
        console.log("Auth token found:", token ? "Yes" : "No");

        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const profileResponse = await fetch(`${apiBaseUrl}/buyer/profile`, {
          credentials: "include",
          headers,
        });

        console.log("Profile response status:", profileResponse.status);

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log("Profile data received:", profileData);

          if (profileData.success && profileData.data) {
            const name =
              profileData.data.firstName || profileData.data.first_name || "";
            console.log("Setting userName to:", name);
            setUserName(name);
          }
        } else {
          console.error("Profile fetch failed:", profileResponse.status);
          // Try to get from localStorage as fallback
          const userStr = localStorage.getItem("user");
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              const name = user.firstName || user.first_name || user.name || "";
              console.log("Using localStorage name:", name);
              setUserName(name);
            } catch (e) {
              console.error("Failed to parse user from localStorage");
            }
          }
        }

        // Fetch order statistics
        const statsResponse = await buyerService.getOrderStats();
        if (statsResponse.success && statsResponse.data) {
          setOrderStats(statsResponse.data);
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
    <div className="min-h-screen bg-white px-20 py-6">
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <DashboardHeader userName={userName} />

      <div className="mt-6">
        <StatsCards stats={orderStats} isLoading={isLoading} />
      </div>

      <div className="flex gap-6 mt-6">
        <div className="flex-[3]">
          <ActiveRFQsList />
        </div>

        <div className="flex-[1] mt-14">
          <CostSavings />
        </div>
      </div>
    </div>
  );
}
