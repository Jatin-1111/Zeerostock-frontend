import HeroSection from "@/components/partner-agent/HeroSection";
import WhyPartnerSection from "@/components/partner-agent/WhyPartnerSection";
import CommissionSection from "@/components/partner-agent/CommissionSection";
import HowItWorksSection from "@/components/partner-agent/HowItWorksSection";
import ApplicationForm from "@/components/partner-agent/ApplicationForm";
import FAQSection from "@/components/partner-agent/FAQSection";
import CTASection from "@/components/partner-agent/CTASection";

export default function PartnerAgentPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyPartnerSection />
      <CommissionSection />
      <HowItWorksSection />
      <ApplicationForm />
      <FAQSection />
      <CTASection />
    </div>
  );
}
