const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();
// get user
router.get("/:id", getUser);

// get all users
router.get("/", getAllUsers);

// add a new user
router.post("/", addUser);

// update user
router.put("/:id", updateUser);
module.exports = router;
