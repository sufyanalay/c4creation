"use client";
import { useState } from "react";

export default function SectionSlider({ section, flip }) {
  const [tab, setTab] = useState("all");
  const [active, setActive] = useState(0);

  const filtered =
    tab === "all" ? section.slides : section.slides.filter((s) => s.subSection === tab);
  const slide = filtered[active] || filtered[0];

  const changeTab = (t) => { setTab(t); setActive(0); };
  const next = () => setActive((p) => (p + 1) % filtered.length);
  const subName = (slug) => section.subSections.find((x) => x.slug === slug)?.name || "";
  const countFor = (slug) =>
    slug === "all" ? section.slides.length : section.slides.filter((s) => s.subSection === slug).length;

  return (
    <section id={section.slug} className="scroll-mt-20 border-t border-ink/5 bg-cream py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* heading */}
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">Our Craft</p>
          <h2 className="mt-2 font-serif text-4xl font-bold text-ink sm:text-5xl">{section.title}</h2>
          <p className="mt-3 text-neutral-500">{section.description}</p>
        </div>

        {/* filter bar */}
        <p className="mt-8 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
          Filter by type
        </p>
        <div className="no-bar mt-3 flex flex-wrap justify-center gap-2.5 overflow-x-auto pb-1">
          <TabBtn active={tab === "all"} onClick={() => changeTab("all")} count={countFor("all")}>
            All
          </TabBtn>
          {section.subSections.map((ss) => (
            <TabBtn
              key={ss.slug}
              active={tab === ss.slug}
              onClick={() => changeTab(ss.slug)}
              count={countFor(ss.slug)}
            >
              {ss.name}
            </TabBtn>
          ))}
        </div>

        <div className={`mt-10 grid gap-7 lg:grid-cols-[1.4fr_1fr] lg:gap-8 ${flip ? "lg:[direction:rtl]" : ""}`}>
          {/* IMAGE side */}
          <div className={flip ? "lg:[direction:ltr]" : ""}>
            <button onClick={next} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-ink shadow-xl" aria-label="Next image">
              <img
                key={slide.img}
                src={slide.img}
                alt={slide.title}
                className="animate-fade h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">
                {active + 1}/{filtered.length}
              </span>
              <div className="absolute bottom-5 left-6 text-left">
                <p className="font-serif text-2xl font-semibold text-cream drop-shadow">{slide.title}</p>
                {slide.subSection && (
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
                    {subName(slide.subSection)}
                  </p>
                )}
              </div>
              <span className="absolute bottom-5 right-5 rounded-full bg-ink/60 px-3 py-1 text-[11px] font-medium text-cream backdrop-blur transition group-hover:bg-gold group-hover:text-ink">
                Next →
              </span>
            </button>

            {/* thumbnails — stagger fade on filter change */}
            <div key={tab} className="no-bar mt-3 flex gap-2.5 overflow-x-auto pb-1">
              {filtered.map((s, i) => (
                <button
                  key={s.img}
                  onClick={() => setActive(i)}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className={`animate-fade aspect-square w-20 flex-shrink-0 overflow-hidden rounded-xl transition ${
                    i === active ? "ring-2 ring-gold ring-offset-2 ring-offset-cream" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS side */}
          <div className={flip ? "lg:[direction:ltr]" : ""}>
            <div key={slide.img} className="animate-fade flex h-full flex-col rounded-[20px] border border-ink/10 bg-white p-7">
              {slide.subSection && (
                <span className="w-fit rounded-full bg-gold/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
                  {subName(slide.subSection)}
                </span>
              )}
              <h3 className="mt-4 font-serif text-3xl font-bold text-ink">{slide.title}</h3>
              <p className="mt-3 leading-relaxed text-neutral-600">{slide.details}</p>

              {slide.specs?.length > 0 && (
                <ul className="mt-5 grid gap-2.5">
                  {slide.specs.map((sp) => (
                    <li key={sp} className="flex items-center gap-3 text-sm text-neutral-700">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      {sp}
                    </li>
                  ))}
                </ul>
              )}

              <a href="#contact" className="mt-auto block rounded-full bg-ink px-7 py-3.5 pt-4 text-center text-sm font-semibold text-cream transition hover:bg-ink-soft">
                Get a Quote for this
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabBtn({ active, onClick, children, count }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
        active
          ? "scale-105 bg-ink text-cream shadow-lg shadow-ink/25"
          : "border border-ink/15 bg-white text-neutral-600 hover:-translate-y-0.5 hover:border-gold hover:text-gold-dark hover:shadow-md"
      }`}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
      {children}
      {typeof count === "number" && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
            active
              ? "bg-gold text-ink"
              : "bg-ink/5 text-neutral-500 group-hover:bg-gold/20 group-hover:text-gold-dark"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}