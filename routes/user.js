const express = require("express");
const { getAllUsers, addUser } = require("../controllers/userController");

const router = express.Router();

// get all users
router.get("/", getAllUsers);

// add a new user
router.post("/", addUser);

module.exports = router;
