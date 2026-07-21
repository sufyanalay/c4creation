import { connectDB } from "@/lib/db";
import Section from "@/models/Section";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/checkAuth";

export async function PUT(req, { params }) {
  if (!(await isAdmin())) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id, slideId } = await params;
    const body = await req.json();

    const section = await Section.findById(id);
    if (!section) return Response.json({ ok: false, error: "Not found" }, { status: 404 });

    const slide = section.slides.id(slideId);
    if (!slide) return Response.json({ ok: false, error: "Slide not found" }, { status: 404 });

    if (body.title !== undefined) slide.title = body.title;
    if (body.details !== undefined) slide.details = body.details;
    if (body.specs !== undefined) slide.specs = body.specs;
    if (body.subSection !== undefined) slide.subSection = body.subSection;

    await section.save();
    return Response.json({ ok: true, section });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!(await isAdmin())) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id, slideId } = await params;

    const section = await Section.findById(id);
    if (!section) return Response.json({ ok: false, error: "Not found" }, { status: 404 });

    const slide = section.slides.id(slideId);
    if (slide?.publicId) {
      try {
        await cloudinary.uploader.destroy(slide.publicId, {
          resource_type: slide.type === "video" ? "video" : "image",
        });
      } catch {}
    }
    section.slides.pull(slideId);
    await section.save();
    return Response.json({ ok: true, section });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}