import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import CategorySection from "@/components/marketplace/CategorySection";
import TodayDealsSection from "@/components/marketplace/TodayDealsSection";
import TrendingIndustriesSection from "@/components/marketplace/TrendingIndustriesSection";
import SponsoredListingsSection from "@/components/marketplace/SponsoredListingsSection";
import AllProductsSection from "@/components/marketplace/AllProductsSection";
import MarketplaceCTASection from "@/components/marketplace/MarketplaceCTASection";
import WhyChooseSection from "@/components/marketplace/WhyChooseSection";

export default function MarketplacePage() {
  return (
    <div className="max-w-full">
      <MarketplaceHero />
      <CategorySection />
      <TodayDealsSection />
      <TrendingIndustriesSection />
      <SponsoredListingsSection />
      <AllProductsSection />
      <MarketplaceCTASection />
      <WhyChooseSection />
    </div>
  );
}
