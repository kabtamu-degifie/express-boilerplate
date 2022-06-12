const User = require("../models/user");
const logger = require("../startup/logger");

const migrateUser = async () => {
  const user = {
    firstName: "admin",
    middleName: "admin",
    username: "admin",
    password: "12345678",
  };

  const migratedUser = await User.countDocuments({
    username: user["username"],
  });

  if (migratedUser === 0) {
    await User.create({
      ...user,
    });
    logger.info("User is migrated!");
  }
};

module.exports = { migrateUser };
