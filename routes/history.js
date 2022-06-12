const express = require("express");
const { addHistory } = require("../controllers/historyController");

const router = express.Router();
// add history
router.put("/:id", addHistory);

module.exports = router;
