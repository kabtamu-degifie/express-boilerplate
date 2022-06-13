const User = require("../models/user");
const _ = require("lodash");

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
  let user = await User.find({ username: req.body.username });
  if (user.length !== 0)
    return res.send(`The ${req.body.username} already taken.`);
  user = new User(req.body);
  const response = await user.save();
  res.status(201).send(_.pick(response, ["fullName"]));
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
