const express = require("express");
const { restrictTo } = require("../../middlewares/auth");
const controller = require("../../controllers/userController");

const router = express.Router();
// get user
router.get("/:id", restrictTo("view_user"), controller.get);

// get all users
router.get("/", restrictTo("view_user"), controller.all);

// add a new user
router.post("/", restrictTo("create_user"), controller.create);

// update user
router.put("/:id", restrictTo("update_user"), controller.update);
module.exports = router;
