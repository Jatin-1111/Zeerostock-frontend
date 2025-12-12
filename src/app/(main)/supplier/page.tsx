import HeroSection from "@/components/supplier-landing/HeroSection";
import WhyChooseSection from "@/components/supplier-landing/WhyChooseSection";
import TestimonialsSection from "@/components/supplier-landing/TestimonialsSection";
import CategoriesSection from "@/components/supplier-landing/CategoriesSection";
import ToolsSection from "@/components/supplier-landing/ToolsSection";
import HowItWorksSection from "@/components/supplier-landing/HowItWorksSection";
import FAQSection from "@/components/supplier-landing/FAQSection";

export default function SupplierDashboardPage() {
  return (
    <div className="w-full mx-auto p-10">
      <HeroSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CategoriesSection />
      <ToolsSection />
      <HowItWorksSection />
      <FAQSection />
    </div>
  );
}
