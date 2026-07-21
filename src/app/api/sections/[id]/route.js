import { connectDB } from "@/lib/db";
import Section from "@/models/Section";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/checkAuth";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const section = await Section.findById(id).lean();
    if (!section) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    return Response.json({ ok: true, section });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  if (!(await isAdmin())) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const update = {};
    if (body.title !== undefined) update.title = body.title;
    if (body.tagline !== undefined) update.tagline = body.tagline;
    if (body.description !== undefined) update.description = body.description;
    if (body.subSections !== undefined) {
      update.subSections = body.subSections.map((s) => ({
        name: s.name,
        slug: (s.slug || s.name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      }));
    }

    const section = await Section.findByIdAndUpdate(id, update, { new: true });
    return Response.json({ ok: true, section });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!(await isAdmin())) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    const section = await Section.findById(id);
    if (!section) return Response.json({ ok: false, error: "Not found" }, { status: 404 });

    for (const slide of section.slides) {
      if (slide.publicId) {
        try {
          await cloudinary.uploader.destroy(slide.publicId, {
            resource_type: slide.type === "video" ? "video" : "image",
          });
        } catch {}
      }
    }
    await section.deleteOne();
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}