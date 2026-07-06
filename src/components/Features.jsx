import { FiGlobe, FiScissors, FiClock, FiAward } from "react-icons/fi";

const items = [
  { icon: FiGlobe, title: "Worldwide Shipping", text: "Export quality, delivered globally." },
  { icon: FiScissors, title: "Fully Custom", text: "Aapke design, aapki branding." },
  { icon: FiAward, title: "Premium Quality", text: "Best fabric & fine stitching." },
  { icon: FiClock, title: "On-time Delivery", text: "Deadlines ka pura khayal." },
];

export default function Features() {
  return (
    <section className="bg-ink py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon size={26} />
              </div>
              <h3 className="mt-4 font-bold text-cream">{title}</h3>
              <p className="mt-1 text-sm text-cream/60">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}