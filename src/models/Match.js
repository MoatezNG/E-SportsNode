const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MatchSchema = mongoose.Schema({
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  Date: {
    type: Date
  },
  TypeOfMath: {
    type: Number
  },
  TeamWining: { type: Schema.Types.ObjectId, ref: "Team" }
});
module.exports = mongoose.model("Match", MatchSchema);
