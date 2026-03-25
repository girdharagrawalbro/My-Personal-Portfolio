import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    url: String,
    repo: String,
    github: String,
    tags: [String],
    category: String,
    forSale: Boolean,
    price: Number
});

export default ProjectSchema;