import { connectDB } from "@/lib/db";
import Section from "@/models/Section";
import { isAdmin } from "@/lib/checkAuth";

export async function POST(req, { params }) {
  if (!(await isAdmin())) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const section = await Section.findById(id);
    if (!section) return Response.json({ ok: false, error: "Not found" }, { status: 404 });

    section.slides.push({
      type: body.type || "image",
      url: body.url,
      publicId: body.publicId,
      title: body.title || "",
      details: body.details || "",
      specs: body.specs || [],
      subSection: body.subSection || "",
      order: section.slides.length,
    });
    await section.save();
    return Response.json({ ok: true, section });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}