const express = require("express");
// routes
const userRoute = require("../routes/user");
const historyRoute = require("../routes/history");
const authRoute = require("../routes/auth");

// async error
const error = require("../middlewares/error");

const makeApp = (app) => {
  app.use(express.json());

  // routes goes here
  app.use("/api/users", userRoute);
  app.use("/api/histories", historyRoute);
  app.use("/api/auth", authRoute);

  // handle async errors
  app.use(error);
};

module.exports = makeApp;
