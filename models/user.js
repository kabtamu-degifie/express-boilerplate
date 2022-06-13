const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { getHashedData } = require("../utils/hash");
const { jwt_key } = require("../config/vars");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      max: 50,
      required: true,
    },

    middleName: {
      type: String,
      max: 50,
      required: true,
    },

    lastName: {
      type: String,
      max: 50,
    },

    address: {
      type: String,
    },

    phoneNo: {
      type: String,
    },

    birthDay: {
      type: Date,
    },

    userType: {
      type: String,
      required: true,
      enum: ["Admin", "Patient", "Staff"],
    },

    username: {
      type: String,
      unique: true,
      max: 15,
    },

    password: {
      type: String,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * Hash password on create and update user
 */
userSchema.pre("save", async function (next) {
  if (!this.password) {
    next();
  } else {
    this.password = await getHashedData(this.password);
    next();
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  let update = this.getUpdate();
  if (!update["$set"]?.password) {
    next();
  } else {
    update["$set"].password = await getHashedData(update["$set"].password);
    next;
  }
});

// generate token
userSchema.methods.generateToken = function () {
  console.log(this);
  const token = jwt.sign(
    {
      _id: this._id,
      userType: this.userType,
    },
    jwt_key,
    { expiresIn: "6h" }
  );
  return token;
};

// virtual fields
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

module.exports = mongoose.model("User", userSchema);
