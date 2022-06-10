const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userName: {
      username: {
        type: String,
        unique: true,
        max: 15,
        required: true,
      },

      password: {
        type: String,
        max: 100,
        required: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
