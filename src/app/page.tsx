import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Header from "@/components/landing/LandingHeader";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <BenefitsSection />
          <TestimonialsSection />
          <CTASection />
        </main>
      </div>
      <Footer />
    </>
  );
}
