import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { authRouter } from "./routes/auth.js";
import { galleryRouter } from "./routes/gallery.js";
import { testimonialsRouter } from "./routes/testimonials.js";
import { teamRouter } from "./routes/team.js";
import { projectsRouter } from "./routes/projects.js";
import { eventsRouter } from "./routes/events.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/team", teamRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/events", eventsRouter);

// Serve the built frontend in production (single-origin deployment)
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "..", "frontend", "dist");
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message?.includes("allowed")) {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeDatabaseError") {
    const message = err.errors?.map((e) => e.message).join("; ") || "Invalid data submitted.";
    return res.status(400).json({ error: message });
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: "A record with that value already exists." });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
