const mongoose = require("mongoose");
const logger = require("./logger");
require("dotenv").config();

module.exports = async () => {
  const connected = await mongoose.connect(process.env.DB_URI);
  logger.info("Database is connected successfully!");
  return connected;
};
