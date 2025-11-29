"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import InsightsStats from "@/components/market-insights/InsightsStats";
import TrendingCategories from "@/components/market-insights/TrendingCategories";
import VolumeChart from "@/components/market-insights/VolumeChart";
import RegionalDistribution from "@/components/market-insights/RegionalDistribution";
import LowActivityFeed from "@/components/market-insights/LowActivityFeed";
import PricingBenchmarks from "@/components/market-insights/PricingBenchmarks";
import AIRecommendations from "@/components/market-insights/AIRecommendations";

export default function MarketInsightsPage() {
  const [activeTab, setActiveTab] = useState<
    "market-trends" | "volume-analysis" | "pricing-intelligence" | "ai-insights"
  >("market-trends");

  const tabs = [
    { id: "market-trends", label: "Market Trends" },
    { id: "volume-analysis", label: "Volume Analysis" },
    { id: "pricing-intelligence", label: "Pricing Intelligence" },
    { id: "ai-insights", label: "AI Insights" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-gray-900" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Market Insights & Analytics
              </h1>
              <p className="text-sm text-gray-600">
                Real-time data and AI-powered insights to optimize your surplus
                inventory strategy
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <InsightsStats />

        {/* Tabs Navigation */}
        <div className="inline-flex gap-0 mb-6 border-2 border-gray-900">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as
                    | "market-trends"
                    | "volume-analysis"
                    | "pricing-intelligence"
                    | "ai-insights"
                )
              }
              className={`px-6 py-3 text-sm font-medium border-r-2 border-gray-900 last:border-r-0 transition-colors ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "market-trends" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendingCategories />
            <VolumeChart />
          </div>
        )}

        {activeTab === "volume-analysis" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RegionalDistribution />
            <LowActivityFeed />
          </div>
        )}

        {activeTab === "pricing-intelligence" && <PricingBenchmarks />}

        {activeTab === "ai-insights" && <AIRecommendations />}
      </div>
    </div>
  );
}
