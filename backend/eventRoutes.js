const express = require("express");
const router = express.Router();
const db = require("./sql_connection");
const path = require("path");
const multer = require("multer");
const fs = require("fs/promises");

// FIX 1: Safe Storage Engine (Does not depend on req.body keys existing yet)
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // Use a safe, static default folder first. We will organize it later if needed.
      // This prevents the "toString() of undefined" crash.
      const baseDir = file.fieldname === "feature_image" || file.fieldname === "thumbnail"
          ? path.join(process.cwd(), "uploads", "feature_image")
          : path.join(process.cwd(), "uploads", "event_images");
          
      await fs.mkdir(baseDir, { recursive: true });
      cb(null, baseDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    // FIX 2: Sanitize filename to prevent collisions/errors
    const safeName = Date.now() + '-' + file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    cb(null, safeName);
  },
});

const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const getRelativePath = (filepath) => filepath.replace(/\\/g, "/").replace(/^.*?uploads\//, "");

// GET Route (Mapped for Frontend)
router.get("/gallery-events", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT e.id, e.title, e.date, e.feature_image, ei.image_name " +
      "FROM events e LEFT JOIN event_images ei ON ei.event_id = e.id ORDER BY e.date DESC"
    );
    const eventsMap = {};
    results.forEach((row) => {
      if (!eventsMap[row.id]) {
        eventsMap[row.id] = {
          id: row.id,
          name: row.title,
          date: row.date,
          thumbnail: row.feature_image,
          images: [],
        };
      }
      if (row.image_name && row.image_name !== row.feature_image && !eventsMap[row.id].images.includes(row.image_name)) {
        eventsMap[row.id].images.push(row.image_name);
      }
    });
    res.status(200).json({ events: Object.values(eventsMap) });
  } catch (err) { res.status(500).json({ error: "Internal server error" }); }
});

// POST Route
router.post("/events", upload.fields([
  { name: "feature_image", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 }, 
  { name: "event_images", maxCount: 50 }
]), async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const title = req.body.title || req.body.name;
    const date = req.body.date;
    const featureImage = req.files["feature_image"]?.[0] || req.files["thumbnail"]?.[0];

    if (!title || !date || !featureImage) {
      throw new Error("Title, date, and feature image are required"); 
    }

    const [result] = await connection.query(
      "INSERT INTO events (title, date, feature_image, update_date) VALUES (?, ?, ?, NOW())",
      [title, date, getRelativePath(featureImage.path)]
    );
    const eventId = result.insertId;
    
    // Process gallery images
    const eventImages = req.files["event_images"] || [];
    if (eventImages.length > 0) {
      const imageValues = eventImages.map((file) => [eventId, getRelativePath(file.path), new Date()]);
      await connection.query("INSERT INTO event_images (event_id, image_name, update_date) VALUES ?", [imageValues]);
    }
    
    await connection.commit();
    res.status(201).json({ message: "Event created successfully", eventId });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally { connection.release(); }
});

router.delete("/events/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM event_images WHERE event_id = ?", [id]);
    const [result] = await db.query("DELETE FROM events WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ error: "Internal server error" }); }
});

module.exports = router;
