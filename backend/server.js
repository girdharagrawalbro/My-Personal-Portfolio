import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);

// DB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () =>
            console.log(`Server running on port ${process.env.PORT}`)
        );
    })
    .catch((err) => console.log("DB Connection Error:", err));
