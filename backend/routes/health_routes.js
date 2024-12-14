const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth_middleware");
const HealthController = require("../controllers/health_note_controller");

// Routes untuk HealthNotes
router.post(
  "/health-notes",
  authenticateToken,
  HealthController.createHealthNote
); // Create Health Note
router.get(
  "/health-notes",
  authenticateToken,
  HealthController.getHealthNote
); // Get Health Note by user_id and date
router.delete(
  "/health-notes/:health_note_id",
  authenticateToken,
  HealthController.deleteHealthNote
); // Delete Health Note

// Routes untuk HealthNoteEntries
router.post(
  "/health-note-entries",
  authenticateToken,
  HealthController.createHealthNoteEntry
); // Create Health Note Entry
router.get(
  "/health-note-entries/:health_note_id",
  authenticateToken,
  HealthController.getHealthNoteEntries
); // Get all entries for a Health Note
router.get(
  "/health-note-entries/:health_note_id/:time_of_day",
  authenticateToken,
  HealthController.getHealthNoteEntryByTime
); // Get entry by time (pagi, siang, malam)
router.put(
  "/health-note-entries",
  authenticateToken,
  HealthController.updateHealthNoteEntry
); // Update Health Note Entry
router.delete(
  "/health-note-entries/:entry_id",
  authenticateToken,
  HealthController.deleteHealthNoteEntry
); // Delete Health Note Entry

module.exports = router;
