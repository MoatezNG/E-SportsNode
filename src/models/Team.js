const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = mongoose.Schema({
  teamName: {
    type: String,
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  picture: {
    type: String,
  },
  description: {
    type: String,
  },
  trophies: [{ type: Schema.Types.ObjectId, ref: "Trophies" }],
});

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
