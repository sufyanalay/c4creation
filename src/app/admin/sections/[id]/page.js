"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ManageSection() {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await fetch("/api/sections/" + id);
    const data = await res.json();
    if (data.ok) setSection(data.section);
    setLoading(false);
  };
  useEffect(() => { load(); }, [id]);

  if (loading) return <div className="min-h-screen bg-cream p-8 text-neutral-500">Loading...</div>;
  if (!section) return <div className="min-h-screen bg-cream p-8 text-neutral-500">Section not found.</div>;

  return (
    <div className="min-h-screen bg-cream p-6 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin" className="text-sm text-gold-dark hover:underline">← Back to dashboard</Link>
        <h1 className="mt-2 font-serif text-3xl font-bold text-ink">{section.title}</h1>
        <SubSections section={section} onChange={load} />
        <AddSlide section={section} onChange={load} />
        <SlideList section={section} onChange={load} />
      </div>
    </div>
  );
}

function SubSections({ section, onChange }) {
  const [subs, setSubs] = useState(section.subSections || []);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (newSubs) => {
    setSaving(true);
    await fetch("/api/sections/" + section._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subSections: newSubs }),
    });
    setSaving(false);
    onChange();
  };
  const add = () => {
    if (!name.trim()) return;
    const updated = [...subs, { name: name.trim() }];
    setSubs(updated); setName(""); save(updated);
  };
  const remove = (i) => {
    const updated = subs.filter((_, idx) => idx !== i);
    setSubs(updated); save(updated);
  };

  return (
    <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
      <h2 className="font-serif text-xl font-bold text-ink">Sub-sections (filters)</h2>
      <p className="text-sm text-neutral-500">Jaise: Custom Patches, Logo, Badges</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {subs.map((s, i) => (
          <span key={i} className="flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-sm font-medium text-gold-dark">
            {s.name}
            <button onClick={() => remove(i)} className="text-gold-dark hover:text-red-600">✕</button>
          </span>
        ))}
        {subs.length === 0 && <span className="text-sm text-neutral-400">None yet.</span>}
      </div>
      <div className="mt-4 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Sub-section name"
          className="flex-1 rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-gold" />
        <button onClick={add} disabled={saving} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink-soft disabled:opacity-60">Add</button>
      </div>
    </div>
  );
}

function AddSlide({ section, onChange }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({ title: "", details: "", specs: "", subSection: "" });
  const [uploading, setUploading] = useState(false);

  const pick = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f); setPreview(URL.createObjectURL(f));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pehle image ya video choose karein");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const up = await fetch("/api/upload", { method: "POST", body: fd });
    const upData = await up.json();
    if (!upData.ok) { setUploading(false); return alert(upData.error); }
    const res = await fetch("/api/sections/" + section._id + "/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: upData.url, publicId: upData.publicId, type: upData.type,
        title: form.title, details: form.details, subSection: form.subSection,
        specs: form.specs.split(",").map((s) => s.trim()).filter(Boolean),
      }),
    });
    const data = await res.json();
    setUploading(false);
    if (data.ok) {
      setFile(null); setPreview("");
      setForm({ title: "", details: "", specs: "", subSection: "" });
      onChange();
    } else alert(data.error);
  };

  return (
    <form onSubmit={submit} className="mt-6 rounded-2xl border border-ink/10 bg-white p-6">
      <h2 className="font-serif text-xl font-bold text-ink">Add Image / Video</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-neutral-600">File (image or video)</label>
          <input type="file" accept="image/*,video/*" onChange={pick}
            className="block w-full text-sm text-neutral-600 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream" />
          {preview && (
            file?.type.startsWith("video")
              ? <video src={preview} className="mt-3 h-32 rounded-lg object-cover" muted />
              : <img src={preview} alt="preview" className="mt-3 h-32 rounded-lg object-cover" />
          )}
        </div>
        <div className="space-y-3">
          <input placeholder="Title (e.g. 3D Puff Patch)" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-gold" />
          <select value={form.subSection} onChange={(e) => setForm({ ...form, subSection: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-gold">
            <option value="">— No sub-section —</option>
            {section.subSections.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </div>
      </div>
      <textarea placeholder="Details / description" value={form.details}
        onChange={(e) => setForm({ ...form, details: e.target.value })} rows={2}
        className="mt-4 w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-gold" />
      <input placeholder="Specs (comma se alag: Iron-on backing, MOQ 50)" value={form.specs}
        onChange={(e) => setForm({ ...form, specs: e.target.value })}
        className="mt-3 w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-gold" />
      <button disabled={uploading} className="mt-4 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink hover:bg-gold-dark disabled:opacity-60">
        {uploading ? "Uploading..." : "Upload & Add"}
      </button>
    </form>
  );
}

function SlideList({ section, onChange }) {
  const remove = async (slideId) => {
    if (!confirm("Delete this item?")) return;
    const res = await fetch("/api/sections/" + section._id + "/slides/" + slideId, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) onChange(); else alert(data.error);
  };

  return (
    <div className="mt-8">
      <h2 className="font-serif text-2xl font-bold text-ink">{"Items (" + section.slides.length + ")"}</h2>
      {section.slides.length === 0 ? (
        <p className="mt-4 rounded-xl border border-ink/10 bg-white p-6 text-neutral-500">No items yet.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {section.slides.map((sl) => (
            <div key={sl._id} className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
              {sl.type === "video"
                ? <video src={sl.url} className="h-40 w-full object-cover" muted controls />
                : <img src={sl.url} alt={sl.title} className="h-40 w-full object-cover" />}
              <div className="p-4">
                <p className="font-serif text-lg font-bold text-ink">{sl.title || "Untitled"}</p>
                {sl.subSection && <p className="text-xs uppercase tracking-wide text-gold-dark">{sl.subSection}</p>}
                {sl.details && <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{sl.details}</p>}
                <button onClick={() => remove(sl._id)} className="mt-3 rounded-full border border-red-300 px-4 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}