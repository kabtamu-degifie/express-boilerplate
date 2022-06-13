const _ = require("lodash");
const User = require("../models/user");

const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user && user.verifyPassword(req.body.password)) {
    const token = user.generateToken();
    res
      .header("x-auth-token", token)
      .send({ ..._.pick(user, ["_id", "username", "isActive"]), token });
  } else {
    return res.status(400).send("Invalid username / password.");
  }
};

module.exports = { login };
