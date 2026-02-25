const express = require("express");
const router = express.Router();
const db = require("./sql_connection");
const path = require("path");
const multer = require("multer");
const fs = require("fs/promises");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // IMPORTANT: req.body.title may be empty in some clients, so keep a fallback
      const rawTitle = (req.body.title || "news_coverage")
        .toString()
        .toLowerCase();
      const newsTitle = rawTitle.replace(/[^a-z0-9]/g, "_");

      const baseDir =
        file.fieldname === "feature_image"
          ? path.join(process.cwd(), "uploads", "feature_image_news")
          : path.join(process.cwd(), "uploads", "news_coverage_images");

      const uploadDir = path.join(baseDir, newsTitle);
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (same as your other routes) [file:163]
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
      return;
    }
    cb(null, true);
  },
});

// Convert absolute path to relative "uploads/..." storage path
const getRelativePath = (filepath) => {
  return filepath.replace(/\\/g, "/").replace(/^.*?uploads\//, "");
};

// GET all news coverage items for the gallery
router.get("/gallery-news-coverage", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT nc.id, nc.title, nc.date, nc.feature_image, nci.image_name " +
        "FROM news_coverage nc " +
        "LEFT JOIN news_coverage_images nci ON nci.news_coverage_id = nc.id " +
        "ORDER BY nc.date DESC"
    );

    const newsCoverageMap = {};
    results.forEach((row) => {
      if (!newsCoverageMap[row.id]) {
        newsCoverageMap[row.id] = {
          id: row.id,
          name: row.title,
          date: row.date,
          thumbnail: row.feature_image,
          images: [],
        };
      }

      if (
        row.image_name &&
        row.image_name !== row.feature_image &&
        !newsCoverageMap[row.id].images.includes(row.image_name)
      ) {
        newsCoverageMap[row.id].images.push(row.image_name);
      }
    });

    const galleryNewsCoverages = Object.values(newsCoverageMap);
    res.status(200).json({ newsCoverages: galleryNewsCoverages });
  } catch (err) {
    console.error("Database error fetching gallery news coverages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET a single news coverage item by ID (useful for future edit screens)
router.get("/news-coverage/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT id, title, date, feature_image FROM news_coverage WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "News coverage not found" });
    }

    const nc = rows[0];

    const [images] = await db.query(
      "SELECT image_name FROM news_coverage_images WHERE news_coverage_id = ? AND image_name != ?",
      [id, nc.feature_image]
    );

    res.status(200).json({
      newsCoverage: {
        id: nc.id,
        name: nc.title,
        date: nc.date,
        thumbnail: nc.feature_image,
        images: images.map((r) => r.image_name),
      },
    });
  } catch (err) {
    console.error("Database error fetching news coverage:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new news coverage item
router.post(
  "/news-coverage",
  upload.fields([
    { name: "feature_image", maxCount: 1 },
    { name: "news_coverage_images", maxCount: 50 },
  ]),
  async (req, res) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const { title, date } = req.body;
      const featureImage = req.files["feature_image"]?.[0];
      const newsCoverageImages = req.files["news_coverage_images"] || [];

      if (!title || !date || !featureImage) {
        throw new Error("Title, date, and feature image are required");
      }

      const [result] = await connection.query(
        "INSERT INTO news_coverage (title, date, feature_image, update_date) VALUES (?, ?, ?, NOW())",
        [title, date, getRelativePath(featureImage.path)]
      );

      const newsCoverageId = result.insertId;

      if (newsCoverageImages.length > 0) {
        const imageValues = newsCoverageImages.map((file) => [
          newsCoverageId,
          getRelativePath(file.path),
          new Date(),
        ]);

        await connection.query(
          "INSERT INTO news_coverage_images (news_coverage_id, image_name, update_date) VALUES ?",
          [imageValues]
        );
      }

      await connection.commit();
      res.status(201).json({
        message: "News coverage created successfully",
        newsCoverageId,
      });
    } catch (error) {
      await connection.rollback();
      console.error("Error creating news coverage:", error);
      res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  }
);

// PATCH (edit) an existing news coverage item
// Behavior: updates title/date; replaces thumbnail if new feature_image uploaded;
// if any new gallery images uploaded, it REPLACES existing gallery images (excluding the feature image).
router.patch(
  "/news-coverage/:id",
  upload.fields([
    { name: "feature_image", maxCount: 1 },
    { name: "news_coverage_images", maxCount: 50 },
  ]),
  async (req, res) => {
    const id = req.params.id;
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const { title, date } = req.body;
      const featureImage = req.files["feature_image"]?.[0] || null;
      const newGalleryImages = req.files["news_coverage_images"] || [];

      // Title/date are required by your admin UI; also helps multer folder naming. [file:163]
      if (!title || !date) {
        return res.status(400).json({ error: "Title and date are required" });
      }

      const [existingRows] = await connection.query(
        "SELECT id, feature_image FROM news_coverage WHERE id = ?",
        [id]
      );

      if (existingRows.length === 0) {
        await connection.rollback();
        return res.status(404).json({ error: "News coverage not found" });
      }

      const existing = existingRows[0];
      const nextFeatureImagePath = featureImage
        ? getRelativePath(featureImage.path)
        : existing.feature_image;

      // Update main row
      await connection.query(
        "UPDATE news_coverage SET title = ?, date = ?, feature_image = ?, update_date = NOW() WHERE id = ?",
        [title, date, nextFeatureImagePath, id]
      );

      // Replace gallery images if user uploaded any new ones
      if (newGalleryImages.length > 0) {
        // Remove existing (non-feature) gallery records
        await connection.query(
          "DELETE FROM news_coverage_images WHERE news_coverage_id = ? AND image_name != ?",
          [id, nextFeatureImagePath]
        );

        const imageValues = newGalleryImages.map((file) => [
          id,
          getRelativePath(file.path),
          new Date(),
        ]);

        await connection.query(
          "INSERT INTO news_coverage_images (news_coverage_id, image_name, update_date) VALUES ?",
          [imageValues]
        );
      }

      await connection.commit();
      return res.status(200).json({ message: "News coverage updated successfully" });
    } catch (err) {
      await connection.rollback();
      console.error("Database error updating news coverage:", err);
      return res.status(500).json({ error: "Internal server error" });
    } finally {
      connection.release();
    }
  }
);

// DELETE a news coverage item
router.delete("/news-coverage/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM news_coverage_images WHERE news_coverage_id = ?", [
      id,
    ]);

    const [result] = await db.query("DELETE FROM news_coverage WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "News coverage not found" });
    }

    return res.status(200).json({ message: "News coverage deleted successfully" });
  } catch (err) {
    console.error("Database error deleting news coverage:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
