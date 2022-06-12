const mongoose = require("mongoose");
const { getHashedData } = require("../utils/hash");

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
 * Hash password
 */
userSchema.pre("save", async function (next) {
  if (!this.password) {
    next();
  } else {
    this.password = await getHashedData(this.password);
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
