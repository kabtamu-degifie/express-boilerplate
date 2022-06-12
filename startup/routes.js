const express = require("express");
// routes
const userRoute = require("../routes/user");
const historyRoute = require("../routes/history");
// async error
const error = require("../middlewares/error");

const makeApp = (app) => {
  app.use(express.json());

  // routes goes here
  app.use("/api/users", userRoute);
  app.use("/api/histories", historyRoute);
  // handle async errors
  app.use(error);
};

module.exports = makeApp;
