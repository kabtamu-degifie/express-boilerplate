const bycrpt = require("bcrypt");

const getHashedData = async (data) => {
  const salt = await bycrpt.genSalt(10);
  return await bycrpt.hash(data, salt);
};

exports.getHashedData = getHashedData;
