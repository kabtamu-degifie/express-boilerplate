const { users } = require("../config/migrations");
const logger = require("../config/logger");

const User = require("../models/user");

const migrateUser = async () => {
  logger.info("Checking user migrations...");

  users.forEach(async (user) => {
    const migratedUser = await User.countDocuments({
      username: user.username,
    });

    if (migratedUser === 0) {
      await User.create({
        ...user,
      });
      logger.info(`Completed ${user.username} user migrated!`);
    }
    logger.info("Completed users migrations...");
  });
};

module.exports = { migrateUser };
