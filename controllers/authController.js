const _ = require("lodash");
const User = require("../models/user");

const login = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  }).populate({ path: "roles", populate: { path: "permissions" } });

  if (user && user.verifyPassword(req.body.password)) {
    // Maping roles => find permissions inside role => combine them and form set
    let permissions = user.roles.reduce((previousRole, currentRole) => {
      return [
        ...previousRole,
        ...currentRole.permissions.map((permission) => permission.name),
      ];
    }, []);
    user._doc.permissions = Array.from(
      new Set([
        ...user._doc.permissions.map((permission) => permission.name),
        ...permissions,
      ])
    );
    res.send({ ...user._doc, token: user.generateToken(user._doc) });
  } else {
    return res.status(400).send("Invalid username / password.");
  }
};

module.exports = { login };
