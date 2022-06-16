const express = require("express");
const { addHistory } = require("../../controllers/historyController");
const { hasPermission } = require("../../middlewares/auth");

const router = express.Router();

// add history
router.put("/:id", hasPermission("Admin", "Staff"), addHistory);

module.exports = router;
