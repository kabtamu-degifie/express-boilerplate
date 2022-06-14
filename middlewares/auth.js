const jwt = require("jsonwebtoken");
const { jwt_key } = require("../config/vars");

const restrictTo = (...permissions) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.send(401).send("Access denied. No token provided.");
    const errors = [];
    try {
      const user = jwt.verify(token, jwt_key);
      if (user) {
        permissions.forEach((permission) => {
          if (!user.data.permissions.includes(permission)) {
            errors.push(`You don't have ${permission} permission`);
          }
        });

        if (errors.length === 0) {
          next();
        } else {
          throw new Error("You dont have permission to perform this action.");
        }
      }
    } catch (error) {
      res.status(401).send([...errors, error]);
    }
  };
};

module.exports = { restrictTo };
