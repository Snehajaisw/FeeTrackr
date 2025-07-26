const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret123");  // 🔒 Use env var in production
    req.adminId = decoded.id; // ✅ Attach admin ID to the request
    next(); // 🚀 Continue to the route
  } catch (err) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = verifyToken;
