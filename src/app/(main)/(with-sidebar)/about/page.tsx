import HeroSection from "@/components/about/HeroSection";
import MissionSection from "@/components/about/MissionSection";
import TestimonialSection from "@/components/about/TestimonialSection";
import ValuesSection from "@/components/about/ValuesSection";
import TimelineSection from "@/components/about/TimelineSection";
import TeamSection from "@/components/about/TeamSection";
import AwardsSection from "@/components/about/AwardsSection";
import CTASection from "@/components/about/CTASection";

export default function AboutPage() {
  return (
    <div className="bg-[#EEFBF6] space-y-3">
      <HeroSection />
      <MissionSection />
      <TestimonialSection />
      <ValuesSection />
      <TimelineSection />
      <TeamSection />
      <AwardsSection />
      <CTASection />
    </div>
  );
}
