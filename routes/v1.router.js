const express = require("express");

const indexRoute = require("./v1/index");
const userRoute = require("./v1/user");
const historyRoute = require("./v1/history");
const authRoute = require("./v1/auth");

const router = express.Router();

router.use("/", indexRoute);
router.use("/api/users", userRoute);
router.use("/api/histories", historyRoute);
router.use("/api/auth", authRoute);

module.exports = router;
