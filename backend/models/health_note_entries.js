const db = require("../config/db");

const HealthNoteEntries = {
  create: (health_note_id, time_of_day, note, callback) => {
    const checkEntryQuery = `
    SELECT id FROM health_note_entries 
    WHERE health_note_id = ? AND time_of_day = ?
  `;

    db.query(checkEntryQuery, [health_note_id, time_of_day], (err, result) => {
      if (err) {
        return callback(err, null); // Return error if query fails
      }

      // If entry exists, delete it
      if (result.length > 0) {
        const deleteEntryQuery = `
        DELETE FROM health_note_entries 
        WHERE id = ?
      `;

        db.query(deleteEntryQuery, [result[0].id], (err) => {
          if (err) {
            return callback(err, null); // Return error if delete fails
          }

          // After deletion, insert the new entry
          insertNewEntry();
        });
      } else {
        // If no entry exists, insert the new entry
        insertNewEntry();
      }

      // Function to insert the new entry
      function insertNewEntry() {
        const insertEntryQuery = `
        INSERT INTO health_note_entries (health_note_id, time_of_day, note) 
        VALUES (?, ?, ?)
      `;

        db.query(
          insertEntryQuery,
          [health_note_id, time_of_day, note],
          (err, result) => {
            if (err) {
              return callback(err, null); // Return error if insert fails
            }

            callback(null, result); // Success callback with result
          }
        );
      }
    });
  },

  // Find all entries for a specific health note
  findByHealthNoteId: (health_note_id, callback) => {
    const query = "SELECT * FROM health_note_entries WHERE health_note_id = ?";
    db.query(query, [health_note_id], callback);
  },

  // Find a specific entry (pagi, siang, malam) for a health note
  findByHealthNoteIdAndTime: (health_note_id, time_of_day, callback) => {
    const query =
      "SELECT * FROM health_note_entries WHERE health_note_id = ? AND time_of_day = ?";
    db.query(query, [health_note_id, time_of_day], callback);
  },

  // Update a specific entry
  update: (entry_id, time_of_day, note, callback) => {
    const query =
      "UPDATE health_note_entries SET time_of_day = ?, note = ? WHERE id = ?";
    db.query(query, [time_of_day, note, entry_id], callback);
  },

  // Delete a specific entry
  delete: (entry_id, callback) => {
    const query = "DELETE FROM health_note_entries WHERE id = ?";
    db.query(query, [entry_id], callback);
  },
};

module.exports = HealthNoteEntries;
