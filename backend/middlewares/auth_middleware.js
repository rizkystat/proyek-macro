const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired token", error: err });
    }
    // Simpan user ke dalam request agar bisa digunakan di controller
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
