const bcrypt = require("bcrypt");
const User = require("../models/user");

const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username / passwords.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username / password.");

  const token = user.generateToken();
  res
    .header("x-auth-token", token)
    .send({ _id: user._id, fullName: user.fullName, username: user.username });
};

module.exports = { login };
