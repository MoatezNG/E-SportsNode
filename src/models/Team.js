const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = mongoose.Schema({
  teamName: {
    type: String
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Team", TeamSchema);
