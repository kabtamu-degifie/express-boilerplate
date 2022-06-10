const express = require("express");
// routes
const userRoute = require("../routes/user");
// async error
const error = require("../middlewares/error");

const makeApp = (app) => {
  app.use(express.json());

  // routes goes here
  app.user("/api/users", userRoute);
  // handle async errors
  app.use(error);
};

module.exports = makeApp;
