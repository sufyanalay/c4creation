export default function Footer() {
  return (
    <footer id="contact" className="bg-ink py-14 text-cream">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-black">
              C4 <span className="text-gold">CREATION</span>
            </h3>
            <p className="mt-3 text-sm text-cream/60">
              Custom embroidery aur premium apparels — aapke brand ke liye, export quality.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#embroidery" className="hover:text-gold">Embroidery</a></li>
              <li><a href="#apparels" className="hover:text-gold">Apparels</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>Email: c4creations0@gmail.com</li>
              <li>Phone: +92 335 7909412</li>
              <li>Sialkot, Pakistan</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-cream/50">
          © 2026 C4 Creation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}