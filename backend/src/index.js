
import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import { createServer } from "http";
import cron from "node-cron";

import { initializeSocket } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
initializeSocket(httpServer);

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(clerkMiddleware());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp"),
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
}));

// Backend health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Spotify Clone API is running",
  });
});

// Clean temporary files every hour
const tempDir = path.join(process.cwd(), "tmp");

cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.error("Temporary file cleanup failed:", err);
        return;
      }

      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Could not delete ${file}:`, unlinkErr);
          }
        });
      }
    });
  }
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Production frontend
if (process.env.NODE_ENV === "production") {
  const frontendDist = fs.existsSync(
    path.join(__dirname, "frontend", "dist")
  )
    ? path.join(__dirname, "frontend", "dist")
    : path.join(__dirname, "../frontend", "dist");

  app.use(express.static(frontendDist));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendDist, "index.html"));
  });
}

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  const statusCode = err.statusCode || err.status || 500;

  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Something went wrong";

  res.status(statusCode).json({ message });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
