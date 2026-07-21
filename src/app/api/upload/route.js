import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/checkAuth";

export async function POST(req) {
  if (!(await isAdmin())) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return Response.json({ ok: false, error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const isVideo = file.type.startsWith("video");

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "c4creation", resource_type: isVideo ? "video" : "image" },
          (err, res) => (err ? reject(err) : resolve(res))
        )
        .end(buffer);
    });

    return Response.json({
      ok: true,
      url: result.secure_url,
      publicId: result.public_id,
      type: isVideo ? "video" : "image",
    });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}