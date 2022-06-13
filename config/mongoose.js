const mongoose = require("mongoose");
const logger = require("../config/logger");
require("dotenv").config();

const { migrateUser } = require("../lib/migration.lib");

/**
 * Connect to Mongodb
 *
 * @returns {object} mongoose connection
 * @public
 *
 */
exports.connect = () => {
  mongoose
    .connect(process.env.DB_URI, {
      keepAlive: true,
    })
    .then(async () => {
      logger.info("MongoDB is connected...");
      await migrateUser();
    });

  return mongoose.connection;
};
