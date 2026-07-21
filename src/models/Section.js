import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "video"], default: "image" },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    title: { type: String, default: "" },
    details: { type: String, default: "" },
    specs: { type: [String], default: [] },
    subSection: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SubSectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
    subSections: { type: [SubSectionSchema], default: [] },
    slides: { type: [SlideSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Section || mongoose.model("Section", SectionSchema);