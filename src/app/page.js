import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SectionSlider from "@/components/SectionSlider";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { connectDB } from "@/lib/db";
import Section from "@/models/Section";

export const dynamic = "force-dynamic"; // hamesha fresh data

async function getSections() {
  try {
    await connectDB();
    const sections = await Section.find().sort({ order: 1, createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(sections)); // plain objects
  } catch {
    return [];
  }
}

export default async function Home() {
  const sections = await getSections();

  return (
    <main>
      <Navbar />
      <Hero />
      <Reveal><Features /></Reveal>
      {sections.map((s, i) => (
        <Reveal key={s._id} delay={i * 100}>
          <SectionSlider section={s} flip={i % 2 === 1} />
        </Reveal>
      ))}
      <Reveal><Contact /></Reveal>
      <Footer />
    </main>
  );
}