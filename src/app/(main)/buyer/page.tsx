import HeroSection from "@/components/buyer/HeroSection";
import WhyChooseSection from "@/components/buyer/WhyChooseSection";
import TestimonialsSection from "@/components/buyer/TestimonialsSection";
import IndustriesSection from "@/components/buyer/IndustriesSection";
import FeaturesSection from "@/components/buyer/FeaturesSection";
import HowItWorksSection from "@/components/buyer/HowItWorksSection";
import PricingSection from "@/components/buyer/PricingSection";
import CTASection from "@/components/buyer/CTASection";

export default function BuyerLandingPage() {
  return (
    <div className="bg-white p-10">
      <HeroSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <IndustriesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
