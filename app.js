const express = require("express");
const cors = require("cors");
const logger = require("./startup/logger");
const { migrateUser } = require("./startup/migrations");

const app = express();

app.use(cors());

// add routes
require("./startup/routes")(app);

// Launch server
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  const dbConnected = await require("./startup/db")();
  if (dbConnected) {
    // migrate admin user
    await migrateUser();
    // log info
    logger.info(`Listening on port: ${port}`);
  }
});
