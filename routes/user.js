const express = require("express");
const { protected, restrictTo } = require("../middlewares/auth");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();
// get user
router.get("/:id", protected, restrictTo("Admin", "Staff"), getUser);

// get all users
router.get("/", protected, restrictTo("Admin", "Staff"), getAllUsers);

// add a new user
router.post("/", protected, restrictTo("Admin", "Staff"), addUser);

// update user
router.put("/:id", protected, restrictTo("Admin", "Staff"), updateUser);
module.exports = router;
