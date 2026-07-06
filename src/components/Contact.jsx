"use client";
import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const ACCESS_KEY = "c3995f85-5587-41e7-b7f5-50512a7287a5";

export default function Contact() {
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New Quote Request — C4 Creation");
    formData.append("from_name", "C4 Creation Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-ink py-20 text-cream">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Get in Touch</p>
          <h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">Request a Quote</h2>
          <p className="mt-3 text-cream/60">
            Tell us what you need — we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="name" label="First Name *" required />
              <Field name="phone" label="Phone Number" type="tel" />
            </div>
            <Field name="email" label="Email Address *" type="email" required />
            <div>
              <label className="mb-1.5 block text-sm text-cream/70">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-cream outline-none transition placeholder:text-cream/30 focus:border-gold"
                placeholder="What would you like to get made?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-dark disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Submit Request"}
            </button>

            {status === "success" && (
              <p className="rounded-lg bg-green-500/15 px-4 py-3 text-sm text-green-300">
                ✓ Thank you! Your message has been sent. We'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-300">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>

          {/* INFO + MAP */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={FiMapPin} title="Address" text="Sialkot, Punjab, Pakistan" />
              <InfoCard icon={FiPhone} title="Phone" text="+92 335 7909412" />
              <InfoCard icon={FiMail} title="Email" text="c4creations0@gmail.com" />
              <InfoCard icon={FiClock} title="Hours" text="Mon–Sat, 9am–6pm" />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="C4 Creation Location"
                src="https://www.google.com/maps?q=Sialkot,Pakistan&z=12&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-cream/70">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-cream outline-none transition placeholder:text-cream/30 focus:border-gold"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
        <Icon size={18} />
      </div>
      <p className="mt-3 text-sm font-semibold text-cream">{title}</p>
      <p className="mt-0.5 text-sm text-cream/60">{text}</p>
    </div>
  );
}