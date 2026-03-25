import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "../../../utils/db";
import ProjectSchema from "../../../schema/project";

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export async function GET() {
    try {
        await connectDB();
        const projects = await Project.find().lean();

        // Pagination logic

        const totalPages = Math.ceil(projects.length / 10);

        // const endIndex = startIndex + 10;
        // const paginatedProjects = response.slice(startIndex, endIndex);


        return NextResponse.json(projects);
    } catch (error) {
        console.error("/api/projects GET error:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}
