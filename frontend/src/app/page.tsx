import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import TrustStrip from "../components/landing/TrustStrip";
import WhyArgus from "../components/landing/WhyArgus";
import Pipeline from "../components/landing/Pipeline";
import Features from "../components/landing/Features";
import Research from "../components/landing/Research";
import DemoPreview from "../components/landing/DemoPreview";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="bg-[#050510] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <WhyArgus />
      <Pipeline />
      <Features />
      <Research />
      <DemoPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}
