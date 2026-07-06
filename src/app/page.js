import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SectionSlider from "@/components/SectionSlider";
import Footer from "@/components/Footer";
import { sections } from "@/data/sections";
import Contact from "@/components/Contact";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      {sections.map((s, i) => (
        <SectionSlider key={s.slug} section={s} flip={i % 2 === 1} />
      ))}
            <Contact />
      <Footer />
    </main>
  );
}