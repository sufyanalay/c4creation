import { connectDB } from "@/lib/db";
import Section from "@/models/Section";

export async function GET() {
  try {
    await connectDB();
    const count = await Section.countDocuments();
    return Response.json({ ok: true, message: "DB connected", sections: count });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}