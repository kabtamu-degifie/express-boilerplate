const User = require("../models/user");

// get all users
const getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).send(users);
};

const addUser = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    userType: req.body.userType,
    address: req.body.address,
    phoneNo: req.body.phoneNo,
    birthDay: req.body.birthDay,
    username: req.body.username,
    password: req.body.password,
  });

  const response = await user.save();

  res.status(201).send(response);
};

module.exports = {
  getAllUsers,
  addUser,
};
