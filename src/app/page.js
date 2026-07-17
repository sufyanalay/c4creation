import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SectionSlider from "@/components/SectionSlider";
import Footer from "@/components/Footer";
import { sections } from "@/data/sections";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Reveal><Features /></Reveal>
      {sections.map((s, i) => (
        <Reveal key={s.slug} delay={i * 100}>
          <SectionSlider section={s} flip={i % 2 === 1} />
        </Reveal>
      ))}
      <Reveal><Contact /></Reveal>
      <Footer />
    </main>
  );
}