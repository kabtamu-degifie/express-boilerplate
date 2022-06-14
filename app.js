const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { expressjwt: jwt } = require("express-jwt");

const { jwt_key } = require("./config/vars");

const routes = require("./config/routes");

const mongoose = require("./config/mongoose");

const v1Router = require("./routes/v1.router");

const app = express();

// Open mongoose connection
mongoose.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  jwt({ secret: jwt_key, algorithms: ["HS256"] }).unless({
    path: routes.public,
  })
);

// Diffrent version of routers
app.use("/v1", v1Router);

module.exports = app;
