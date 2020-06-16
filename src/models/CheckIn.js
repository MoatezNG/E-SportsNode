const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckInSchema = mongoose.Schema({
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],

  match: { type: Schema.Types.ObjectId, ref: "Trophies" },
});

const CheckIn = mongoose.model("CheckIn", CheckInSchema);
module.exports = CheckIn;
