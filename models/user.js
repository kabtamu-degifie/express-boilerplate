const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { jwt_key } = require("../config/vars");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, max: 50, required: true },
    middleName: { type: String, max: 50, required: true },
    lastName: { type: String, max: 50 },
    address: { type: String },
    phoneNo: { type: String },
    birthDay: { type: Date },
    userType: {
      type: String,
      required: true,
      enum: ["Admin", "Patient", "Staff"],
    },
    username: { type: String, unique: true, max: 15 },
    password: { type: String, max: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/**
 * Methods
 */
userSchema.pre("save", function preSave(next) {
  let model = this;

  model.hashPasswd(model.password, (err, hash) => {
    if (err) throw new Error(err);
    model.password = hash;
    next();
  });
});

userSchema.method({
  verifyPassword(passwd) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(passwd, this.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }

        resolve(isMatch);
      });
    });
  },
  hashPasswd(passwd, cb) {
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
      bcrypt.hash(passwd, salt, createHash);
    };

    // Generate a salt factor
    bcrypt.genSalt(12, generateSalt);
  },

  generateToken() {
    const token = jwt.sign(
      { _id: this._id, userType: this.userType },
      jwt_key,
      { algorithm: "HS256", expiresIn: "6h" }
    );
    return token;
  },
});

// virtual fields
userSchema.virtual("fullName").get(function () {
  return `${
    this.firstName
  } ${this.middleName} ${this.lastName ? this.lastName : ""}`;
});

module.exports = mongoose.model("User", userSchema);
