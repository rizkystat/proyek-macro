const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user_models");

const authController = {
  register: async (req, res) => {
    const { username_or_email, name, phonenumber, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create(
        { username_or_email, name, phonenumber, password: hashedPassword },
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Error hashing password", error });
    }
  },

  login: (req, res) => {
    const { username_or_email, password } = req.body;
    User.findByUsernameOrEmail(username_or_email, async (err, results) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });
      if (results.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, "secret_key", {
        expiresIn: "7h",
      });
      res.json({ message: "Login successful", token });
    });
  },
};

module.exports = authController;
