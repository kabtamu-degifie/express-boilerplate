const bcrpt = require("bcrypt");

const getHashedData = async (data) => {
  const salt = await bcrpt.genSalt(10);
  return await bcrpt.hash(data, salt);
};

exports.getHashedData = getHashedData;
