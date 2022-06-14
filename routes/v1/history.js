const express = require("express");
const { addHistory } = require("../../controllers/historyController");
const { restrictTo } = require("../../middlewares/auth");

const router = express.Router();

// add history
router.put("/:id", restrictTo("Admin", "Staff"), addHistory);

module.exports = router;
