const bcrypt = require("bcrypt");
const User = require("../models/user");

const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username / passwords.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username / password.");

  const token = user.generateToken();
  res.send(token);
};

module.exports = { login };
