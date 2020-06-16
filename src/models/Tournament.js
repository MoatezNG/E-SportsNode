const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TournamentSchema = mongoose.Schema({
  tournamentAdmin: { type: Schema.Types.ObjectId, ref: "User" },
  tournamentName: {
    type: String,
    required: true,
  },
  tournamentPicture: {
    type: String,
    required: false,
  },
  numberOfTeams: {
    type: Number,
  },
  teamsParticiping: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  matchs: [{ type: Schema.Types.ObjectId, ref: "Match" }],
  dateRound0: {
    type: Date,
  },
  dateRound1: {
    type: Date,
  },
  dateRound2: {
    type: Date,
  },
  dateRound3: {
    type: Date,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("Tournament", TournamentSchema);
