import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import StatsSection from "./sections/StatsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CtaBanner from "./sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
