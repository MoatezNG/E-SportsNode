const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TournamentSchema = mongoose.Schema({
  tournamentName: {
    type: String
  },
  numberOfTeams: {
    type: Number
  },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  matchs: [{ type: Schema.Types.ObjectId, ref: "Match" }],
  dateSeixiemeFinale: {
    type: Date
  },
  dateQuartFinale: {
    type: Date
  },
  dateDemiFinale: {
    type: Date
  },
  dateFinale: {
    type: Date
  }
});
module.exports = mongoose.model("Tournament", TournamentSchema);
