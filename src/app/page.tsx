import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SiteBackground } from "@/components/SiteBackground";
import { Skills } from "@/components/Skills";
import { Works } from "@/components/Works";

export default function HomePage() {
  return (
    <div id="top" className="relative min-h-screen">
      <SiteBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <main>
          <Works />
          <Skills />
          <About />
        </main>
        <Footer />
      </div>
    </div>
  );
}
