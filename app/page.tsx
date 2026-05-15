import BackgroundGradient from "@/components/BackgroundGradient";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import TimelineSection from "@/components/TimelineSection";
import DotNavigation from "@/components/DotNavigation";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <BackgroundGradient />
      <DotNavigation />
      <Hero />
      <SkillsSection />
      <TimelineSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}
