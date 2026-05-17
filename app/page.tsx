import BackgroundGradient from "@/components/BackgroundGradient";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import InteractiveTimeline from "@/components/InteractiveTimeline";
import DotNavigation from "@/components/DotNavigation";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HomePage() {
  return (
    <main className="relative">
      <BackgroundGradient />
      <LanguageSwitcher />
      <DotNavigation />
      <Hero />
      <SkillsSection />
      <InteractiveTimeline />
      <ContactCTA />
      <Footer />
    </main>
  );
}
