import DashboardHeader from "@/components/buyer-dashboard/DashboardHeader";
import StatsCards from "@/components/buyer-dashboard/StatsCards";
import ActiveRFQsList from "@/components/buyer-dashboard/ActiveRFQsList";
import CostSavings from "@/components/buyer-dashboard/CostSavings";

export default function BuyerDashboardPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <DashboardHeader />

      <div className="w-full mx-auto mt-8">
        <StatsCards />

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
