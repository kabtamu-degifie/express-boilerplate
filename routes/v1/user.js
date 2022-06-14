const express = require("express");
const { restrictTo } = require("../../middlewares/auth");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
} = require("../../controllers/userController");

const router = express.Router();
// get user
router.get("/:id", restrictTo("view_user"), getUser);

// get all users
router.get("/", restrictTo("view_user"), getAllUsers);

// add a new user
router.post("/", restrictTo("create_user"), addUser);

// update user
router.put("/:id", restrictTo("update_user"), updateUser);
module.exports = router;
