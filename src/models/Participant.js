const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantSchema = mongoose.Schema({
  team: { type: Schema.Types.ObjectId, ref: "Team" },
  championId: {
    type: Number
  },
  spell1Id: {
    type: Number
  },
  spell2Id: {
    type: Number
  },
  stats: { type: Schema.Types.ObjectId, ref: "DetailsInGame" }
});
module.exports = mongoose.model("Participant", ParticipantSchema);
