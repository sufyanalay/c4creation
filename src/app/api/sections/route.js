import { connectDB } from "@/lib/db";
import Section from "@/models/Section";
import { isAdmin } from "@/lib/checkAuth";

export async function GET() {
  try {
    await connectDB();
    const sections = await Section.find().sort({ order: 1, createdAt: 1 }).lean();
    return Response.json({ ok: true, sections });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (!(await isAdmin())) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const slug = (body.slug || body.title || "")
      .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!body.title || !slug) return Response.json({ ok: false, error: "Title required" }, { status: 400 });

    const exists = await Section.findOne({ slug });
    if (exists) return Response.json({ ok: false, error: "Slug already exists" }, { status: 400 });

    const count = await Section.countDocuments();
    const section = await Section.create({
      title: body.title,
      slug,
      tagline: body.tagline || "",
      description: body.description || "",
      order: count,
      subSections: [],
      slides: [],
    });
    return Response.json({ ok: true, section });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}