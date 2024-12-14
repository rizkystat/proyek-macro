const db = require("../config/db");

const HealthNotes = {
  create: (user_id, date, callback) => {
    const query = "INSERT INTO health_notes (user_id, date) VALUES (?, ?)";
    db.query(query, [user_id, date], callback);
  },

  findByUserIdAndDate: (user_id, date, callback) => {
    const query = "SELECT * FROM health_notes WHERE user_id = ? AND date = ?";
    db.query(query, [user_id, date], callback);
  },

  update: (health_note_id, date, callback) => {
    const query = "UPDATE health_notes SET date = ? WHERE id = ?";
    db.query(query, [date, health_note_id], callback);
  },

  delete: (health_note_id, callback) => {
    const query = "DELETE FROM health_notes WHERE id = ?";
    db.query(query, [health_note_id], callback);
  },

  findByUserId: (user_id, callback) => {
    const query = "SELECT * FROM health_notes WHERE user_id = ?";
    db.query(query, [user_id], callback);
  },

  // Menambahkan fungsi untuk mengambil semua catatan kesehatan
  getAll: (callback) => {
    const query = "SELECT * FROM health_notes";
    db.query(query, callback);
  },
};

module.exports = HealthNotes;
