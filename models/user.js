const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, lowercase: true, required: true },
    username: { type: String, unique: true, max: 15 },
    password: { type: String, max: 100 },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles" }],
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permissions" }],
    passwordChangedAt: { type: Date },
    lastLogin: { type: Date },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/**
 * Methods
 */
userSchema.pre("save", function preSave(next) {
  let model = this;

  model.hashPassword(model.password, (err, hash) => {
    if (err) throw new Error(err);
    model.password = hash;
    next();
  });
});

userSchema.method({
  verifyPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }

        resolve(isMatch);
      });
    });
  },
  hashPassword(password, cb) {
    let createHash = (err, hash) => {
      if (err) {
        return cb(err);
      }

      cb(null, hash);
    };

    let generateSalt = (err, salt) => {
      if (err) {
        return cb(err);
      }

      // Hash the password using the generated salt
      bcrypt.hash(password, salt, createHash);
    };

    // Generate a salt factor
    bcrypt.genSalt(12, generateSalt);
  },
});

module.exports = mongoose.model("Users", userSchema);
