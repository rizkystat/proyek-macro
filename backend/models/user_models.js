const db = require("../config/db");

const User = {
  create: (data, callback) => {
    const query =
      "INSERT INTO users (username_or_email, name, phonenumber, password) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [data.username_or_email, data.name, data.phonenumber, data.password],
      callback
    );
  },

  findByUsernameOrEmail: (username_or_email, callback) => {
    const query = "SELECT * FROM users WHERE username_or_email = ?";
    db.query(query, [username_or_email], callback);
  },
};

module.exports = User;
