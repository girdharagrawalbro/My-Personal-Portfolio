import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  url: { type: String },
  repo: { type: String },
  github: { type: String },
  tags: [{ type: String }],
  category: { type: String }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
