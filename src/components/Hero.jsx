"use client";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink"
    >
      {/* BACKGROUND VIDEO — apni video public/hero.mp4 rakhein.
          poster = video load hone tak / na ho to jo image dikhegi */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&q=80"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* overlays — text readable rakhne ke liye */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />

      {/* faint watermark */}
      <span className="pointer-events-none absolute right-10 top-16 font-serif text-[160px] font-bold leading-none text-gold/5 sm:text-[220px]">
        C4
      </span>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Custom Embroidery & Apparel
          </p>

          <h1 className="font-serif text-5xl font-semibold leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
            Where your brand
            <br />
            becomes <span className="italic text-gold">craft</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">
            We turn ideas into wearable identity — precision patches, logo embroidery,
            and premium apparel, all made to your brand with an export-quality finish.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#embroidery" className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-gold/20 transition hover:bg-gold-dark">
              Explore Our Work
            </a>
            <a href="#contact" className="rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold text-cream transition hover:border-gold hover:text-gold">
              Request a Quote
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4 border-t border-white/10 pt-7">
            {[["500+", "Brands Served"], ["10+", "Years Experience"], ["100%", "Custom Made"]].map(
              ([n, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl font-bold text-gold">{n}</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-cream/60">{l}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a href="#embroidery" className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-cream/60 transition hover:text-gold" aria-label="Scroll down">
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream/40 pt-1.5">
          <span className="h-2 w-0.5 animate-bounce rounded-full bg-gold" />
        </span>
      </a>
    </section>
  );
}