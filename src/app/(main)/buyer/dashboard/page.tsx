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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

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
    <div className="min-h-screen bg-white p-4">
      <DashboardHeader />

      <div className="w-full mx-auto mt-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <StatsCards stats={orderStats} isLoading={isLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ActiveRFQsList />
          </div>

          <div className="lg:col-span-1">
            <CostSavings />
          </div>
        </div>
      </div>
    </div>
  );
}
