const { User, validateUser } = require("../models/user");
const _ = require("lodash");

const get = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("The user is not found.");
  res.status(200).send(user);
};

const all = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

const create = async (req, res) => {
  const validation = validateUser(req.body);
  if (validation.error) return res.send(validation.error.details[0].message);

  let user = await User.findOne().or([
    {
      username: req.body.username,
    },
    {
      email: req.body.email,
    },
  ]);

  if (user?.length !== 0) {
    if (req.body.username === user?.username) {
      return res.send(`The username '${req.body.username}' has already taken.`);
    }
    if (req.body.email === user?.email) {
      return res.send(`The email '${req.body.email}' has already taken.`);
    }
  }

  user = new User(req.body);
  const response = await user.save();
  res.status(201).send(_.pick(response, ["username", "email"]));
};

const update = async (req, res) => {
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

module.exports = { get, all, create, update };
