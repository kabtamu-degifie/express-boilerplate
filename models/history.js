const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  blockchain: {
    type: [{}],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("History", historySchema);
