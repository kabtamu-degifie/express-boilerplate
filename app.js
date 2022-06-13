const express = require("express");
const cors = require("cors");
const { port } = require("./config/vars");
const mongoose = require("./config/mongoose");
const logger = require("./config/logger");

const v1Router = require("./routes/v1.router");

const app = express();

// Open mongoose connection
mongoose.connect();

app.use(cors());
app.use(express.json());

// Diffrent version of routers
app.use("/v1", v1Router);

// Launch server
app.listen(port, () => {
  logger.info(`Listening on port: ${port}`);
});
