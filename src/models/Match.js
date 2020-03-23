const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MatchSchema = mongoose.Schema({
  DateStart: {
    type: Date
  },
  platformId: {
    type: String
  },
  gameCreation: {
    type: Number
  },
  gameDuration: {
    type: Number
  },
  queueId: {
    type: Number
  },
  seasonId: {
    type: String
  },
  gameMode: {
    type: String
  },
  gameType: {
    type: String
  },
  TypeOfMath: {
    type: Number
  },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],

  teamsIngame: [{ type: Schema.Types.ObjectId, ref: "TeamInGame" }],

  participents: [{ type: Schema.Types.ObjectId, ref: "Participant" }],

  TeamWining: { type: Schema.Types.ObjectId, ref: "Team" }
});
module.exports = mongoose.model("Match", MatchSchema);
