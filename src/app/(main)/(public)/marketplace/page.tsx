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
  const categoryParam = searchParams.get("category");

  // If there's a search query or category filter, show the ProductGrid
  if (searchQuery || categoryParam) {
    return (
      <div className="max-w-full">
        <ExploreProductGrid
          initialQuery={searchQuery || ""}
          initialCategory={categoryParam || undefined}
        />
      </div>
    );
  }

  // Otherwise, show the default marketplace page
  return (
    <div className="max-w-full bg-[#EEFBF6] py-12 px-3">
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
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
