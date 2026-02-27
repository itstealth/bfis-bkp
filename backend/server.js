require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();

const pool = require("./sql_connection");
const eventRoutes = require("./eventRoutes");
const newsCoverageRoutes = require("./newsCoverageRoutes");

// Configuration Constants
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const MAX_FILES = 50;
const UPLOAD_DIRS = {
  root: path.join(__dirname, "uploads"),
  features: "feature_image",
  events: "event_images",
  feature_news: "feature_image_news", // Add this
  news_coverage: "news_coverage_images", // Add this
  temp: "tmp",
};

// Helper functions
const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-zA-Z0-9\-._ ]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .substring(0, 100)
    .trim();
};

async function initializeServer() {
  // Ensure upload directories exist
  const uploadDirs = [
    UPLOAD_DIRS.root,
    path.join(UPLOAD_DIRS.root, UPLOAD_DIRS.features),
    path.join(UPLOAD_DIRS.root, UPLOAD_DIRS.events),
    path.join(UPLOAD_DIRS.root, UPLOAD_DIRS.feature_news), // Add this
    path.join(UPLOAD_DIRS.root, UPLOAD_DIRS.news_coverage), // Add this
    path.join(UPLOAD_DIRS.root, UPLOAD_DIRS.temp),
  ];

  for (const dir of uploadDirs) {
    await fs.mkdir(dir, { recursive: true });
    // On Linux/Unix systems, you might want to set permissions:
    // await fs.chmod(dir, 0o755);
  }

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
app.use(
  cors({
    origin: [
      "https://www.bfis.in",
      "https://bfis.in",            // Add this line
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

  // CSRF protection: validate Origin header on state-changing requests
  const allowedOrigins = [
    "https://www.bfis.in",
    "https://bfis.in",
    "http://localhost:3000",
  ];
  app.use((req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      return next();
    }
    const origin = req.headers.origin;
    if (origin && !allowedOrigins.includes(origin)) {
      return res.status(403).json({ error: "CSRF validation failed: origin not allowed" });
    }
    return next();
  });


  // Body parser configuration
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

  // Serve static files
  app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Mount event routes
  app.use("/api", eventRoutes);
  app.use("/api", newsCoverageRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error("Error:", err);
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File is too large" });
      }
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal server error" });
  });

  // Handle 404
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Upload directory: ${UPLOAD_DIRS.root}`);
  });
}

// Error handling for unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Initialize server
initializeServer().catch((err) => {
  console.error("Server initialization failed:", err);
  process.exit(1);
});
