const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrophiesSchema = mongoose.Schema({
  TrophyName: {
    type: String
  },
  picture: {
    type: String
  }
});
const Trophies = mongoose.model("Trophies", TrophiesSchema);
module.exports = Trophies;
