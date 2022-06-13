const express = require("express");
const { login } = require("../../controllers/authController");

const router = express.Router();

// user login
router.post("/", login);

module.exports = router;
