const User = require("../models/user");

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("The user is not found.");
  res.status(200).send(user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
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

const updateUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User is not found");

  user = await User.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        ...req.body,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).send(user);
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
};
