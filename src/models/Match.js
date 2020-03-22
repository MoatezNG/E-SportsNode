const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MatchSchema = mongoose.Schema({
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  Date: {
    type: Date
  }
});
module.exports = mongoose.model("Match", MatchSchema);
