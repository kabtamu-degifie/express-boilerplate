const express = require("express");
const { addHistory } = require("../../controllers/historyController");
const { protected, restrictTo } = require("../../middlewares/auth");

const router = express.Router();

// add history
router.put("/:id", protected, restrictTo("Admin", "Staff"), addHistory);

module.exports = router;
