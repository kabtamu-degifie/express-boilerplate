const express = require("express");
const cors = require("cors");
const logger = require("./startup/logger");
const app = express();

app.use(cors());

// add routes
require("./startup/routes")(app);

// add listner
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  const dbConnected = await require("./startup/db")();
  if (dbConnected) {
    // migrate data
    // log info
    logger.info(`Listening on port: ${port}`);
  }
});
