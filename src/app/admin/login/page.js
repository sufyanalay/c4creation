"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.ok) {
      router.push("/admin");
    } else {
      setError(data.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-center font-serif text-3xl font-bold text-cream">
          C4 <span className="text-gold">Admin</span>
        </h1>
        <p className="mt-1 text-center text-sm text-cream/50">Sign in to manage your website</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-cream/70">Username</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-cream outline-none focus:border-gold" required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-cream/70">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-cream outline-none focus:border-gold" required />
          </div>
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-500/15 px-4 py-2.5 text-sm text-red-300">{error}</p>}

        <button type="submit" disabled={loading}
          className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-semibold text-ink transition hover:bg-gold-dark disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}