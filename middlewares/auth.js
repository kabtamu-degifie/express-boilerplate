const jwt = require("jsonwebtoken");
require("dotenv").config();

const protected = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.send(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(400).send("Invalid token.");
  }
};

module.exports = {
  protected,
};
