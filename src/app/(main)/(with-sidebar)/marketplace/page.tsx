"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import CategorySection from "@/components/marketplace/CategorySection";
import TodayDealsSection from "@/components/marketplace/TodayDealsSection";
import TrendingIndustriesSection from "@/components/marketplace/TrendingIndustriesSection";
import SponsoredListingsSection from "@/components/marketplace/SponsoredListingsSection";
import AllProductsSection from "@/components/marketplace/AllProductsSection";
import MarketplaceCTASection from "@/components/marketplace/MarketplaceCTASection";
import WhyChooseSection from "@/components/marketplace/WhyChooseSection";
import ExploreProductGrid from "@/components/marketplace/ProductGrid";

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  // If there's a search query, show the ProductGrid with search results
  if (searchQuery) {
    return (
      <div className="max-w-full">
        <ExploreProductGrid initialQuery={searchQuery} />
      </div>
    );
  }

  // Otherwise, show the default marketplace page
  return (
    <div className="max-w-full bg-[#EEFBF6] py-16">
      <MarketplaceHero />
      <CategorySection />
      {/* <TodayDealsSection /> */}
      {/* <TrendingIndustriesSection /> */}
      {/* <SponsoredListingsSection /> */}
      <AllProductsSection />
      <MarketplaceCTASection />
      <WhyChooseSection />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
