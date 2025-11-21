import Sidebar from "@/components/shared/Sidebar";
import HeroSectionV1 from "@/components/home-v1/HeroSectionV1";
import PlatformSection from "@/components/home-v1/PlatformSection";
import UniqueFeaturesSection from "@/components/home-v1/UniqueFeaturesSection";
import TrendingListingsSection from "@/components/home-v1/TrendingListingsSection";
import HowItWorksSection from "@/components/home-v1/HowItWorksSection";
import ROICalculatorSection from "@/components/home-v1/ROICalculatorSection";
import TestimonialsSectionV1 from "@/components/home-v1/TestimonialsSectionV1";
import FinalCTASection from "@/components/home-v1/FinalCTASection";

export default function HomeV1Page() {
  return (
    <div className="w-full">
      <HeroSectionV1 />
      <div className="bg-gray-400 h-1" />
      <PlatformSection />
      <div className="bg-gray-400 h-1" />
      <UniqueFeaturesSection />
      <div className="bg-gray-400 h-1" />
      <TrendingListingsSection />
      <div className="bg-gray-400 h-1" />
      <HowItWorksSection />
      <div className="bg-gray-400 h-1" />
      <ROICalculatorSection />
      <div className="bg-gray-400 h-1" />
      <TestimonialsSectionV1 />
      <div className="bg-gray-400 h-1" />
      <FinalCTASection />
      <div className="bg-gray-400 h-1" />
    </div>
  );
}
