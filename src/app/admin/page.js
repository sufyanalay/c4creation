"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", tagline: "", description: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch("/api/sections");
    const data = await res.json();
    if (data.ok) setSections(data.sections);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const addSection = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (data.ok) { setForm({ title: "", tagline: "", description: "" }); load(); }
    else alert(data.error);
  };

  const removeSection = async (id, title) => {
    if (!confirm('Delete "' + title + '" and all its images? This cannot be undone.')) return;
    const res = await fetch("/api/sections/" + id, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) load(); else alert(data.error);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-cream p-6 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-ink">C4 <span className="text-gold-dark">Admin</span></h1>
          <button onClick={logout} className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream hover:bg-ink-soft">Logout</button>
        </div>

        <form onSubmit={addSection} className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-ink">Add New Section</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input placeholder="Section title (e.g. Embroidery)" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-gold" required />
            <input placeholder="Tagline (short)" value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-gold" />
          </div>
          <textarea placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
            className="mt-4 w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-gold" />
          <button disabled={saving} className="mt-4 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink hover:bg-gold-dark disabled:opacity-60">
            {saving ? "Adding..." : "Add Section"}
          </button>
        </form>

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">Your Sections</h2>
        {loading ? (
          <p className="mt-4 text-neutral-500">Loading...</p>
        ) : sections.length === 0 ? (
          <p className="mt-4 rounded-xl border border-ink/10 bg-white p-6 text-neutral-500">No sections yet. Add your first one above.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {sections.map((s) => (
              <div key={s._id} className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-5">
                <div>
                  <p className="font-serif text-lg font-bold text-ink">{s.title}</p>
                  <p className="text-sm text-neutral-500">{(s.tagline || "No tagline") + " · " + (s.subSections?.length || 0) + " sub-sections · " + (s.slides?.length || 0) + " images"}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={"/admin/sections/" + s._id} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-soft">Manage</Link>
                  <button onClick={() => removeSection(s._id, s.title)} className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}