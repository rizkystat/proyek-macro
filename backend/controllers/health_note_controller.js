const HealthNotes = require("../models/health_notes");
const HealthNoteEntries = require("../models/health_note_entries");
const { json } = require("stream/consumers");

// Create a new health note
exports.createHealthNote = (req, res) => {
  const { date } = req.body;
  const user_id = req.user.id;

  HealthNotes.create(user_id, date, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating health note", error: err });
    }
    res
      .status(201)
      .json({ message: "Health note created successfully", data: result });
  });
};

// Find health note by user_id and date
exports.getHealthNote = (req, res) => {
  const { date } = req.params;
  const user_id = req.user.id; // Ambil user_id dari token

  HealthNotes.findByUserId(user_id, (err, healthNotes) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch health notes for user" });
    }

    if (healthNotes.length === 0) {
      return res
        .status(404)
        .json({ message: "No health notes found for the specified user" });
    }

    // Ambil semua health note entries untuk setiap health note
    const healthNotesWithEntries = [];

    healthNotes.forEach((healthNote) => {
      HealthNoteEntries.findByHealthNoteId(healthNote.id, (err, notes) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to fetch health note entries" });
        }

        // Gabungkan health note dengan entries terkait
        const dataToResponse = {
          healthNote: healthNote,
          entries: notes,
        };

        healthNotesWithEntries.push(dataToResponse);

        // Setelah semua data digabung, kirim respons jika semua sudah diproses
        if (healthNotesWithEntries.length === healthNotes.length) {
          return res.status(200).json(healthNotesWithEntries);
        }
      });
    });
  });
};

// Create a health note entry (e.g., for pagi, siang, malam)
exports.createHealthNoteEntry = (req, res) => {
  const { health_note_id, time_of_day, note } = req.body;
  const user_id = req.user.id; // Ambil user_id dari token

  // Pastikan hanya user yang membuat health note entry untuk catatan mereka sendiri
  HealthNotes.findByUserIdAndDate(
    user_id,
    health_note_id,
    (err, healthNote) => {
      if (err || !healthNote) {
        return res
          .status(404)
          .json({ message: "Health note not found for this user" });
      }

      // Jika valid, buat entry catatan
      HealthNoteEntries.create(
        health_note_id,
        time_of_day,
        note,
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Error creating health note entry",
              error: err,
            });
          }
          res.status(201).json({
            message: "Health note entry created successfully",
            data: result,
          });
        }
      );
    }
  );
};

// Get all entries for a health note
exports.getHealthNoteEntries = (req, res) => {
  const { health_note_id } = req.params;
  const user_id = req.user.id;

  HealthNoteEntries.findByHealthNoteId(health_note_id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching health note entries", error: err });
    }
    res.status(200).json(result);
  });
};

// Get a specific entry for a health note (e.g., pagi, siang, malam)
exports.getHealthNoteEntryByTime = (req, res) => {
  const { health_note_id, time_of_day } = req.params;
  const user_id = req.user.id;

  HealthNoteEntries.findByHealthNoteIdAndTime(
    health_note_id,
    time_of_day,
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching health note entry", error: err });
      }
      res.status(200).json(result);
    }
  );
};

// Update a health note entry
exports.updateHealthNoteEntry = (req, res) => {
  const { entry_id, time_of_day, note } = req.body;
  const user_id = req.user.id;

  HealthNoteEntries.update(entry_id, time_of_day, note, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating health note entry", error: err });
    }
    res.status(200).json({
      message: "Health note entry updated successfully",
      data: result,
    });
  });
};

// Delete a health note entry
exports.deleteHealthNoteEntry = (req, res) => {
  const { entry_id } = req.params;
  const user_id = req.user.id;

  HealthNoteEntries.delete(entry_id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting health note entry", error: err });
    }
    res.status(200).json({
      message: "Health note entry deleted successfully",
      data: result,
    });
  });
};

// Delete a health note
exports.deleteHealthNote = (req, res) => {
  const { health_note_id } = req.params;
  const user_id = req.user.id;

  HealthNotes.delete(health_note_id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting health note", error: err });
    }
    res
      .status(200)
      .json({ message: "Health note deleted successfully", data: result });
  });
};
