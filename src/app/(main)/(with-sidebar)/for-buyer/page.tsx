import HeroSection from "@/components/buyer/HeroSection";
import WhyChooseSection from "@/components/buyer/WhyChooseSection";
import TestimonialsSection from "@/components/buyer/TestimonialsSection";
import IndustriesSection from "@/components/buyer/IndustriesSection";
import FeaturesSection from "@/components/buyer/FeaturesSection";
import HowItWorksSection from "@/components/buyer/HowItWorksSection";
import CTASection from "@/components/buyer/CTASection";

export default function BuyerLandingPage() {
  return (
    <div className="bg-[#eefbf6]">
      <HeroSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <IndustriesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
