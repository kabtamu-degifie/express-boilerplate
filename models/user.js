const mongoose = require("mongoose");

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

    userType: {
      type: String,
      enum: ["Supper Admin", "Patient", "Employee"],
    },

    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
