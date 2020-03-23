const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamInGameSchema = mongoose.Schema({
  win: {
    type: String
  },
  firstBlood: {
    type: Boolean
  },
  firstTower: {
    type: Boolean
  },
  firstInhibitor: {
    type: Boolean
  },
  firstBaron: {
    type: Boolean
  },
  firstDragon: {
    type: Boolean
  },
  firstRiftHerald: {
    type: Boolean
  },
  towerKills: {
    type: Number
  },
  inhibitorKills: {
    type: Number
  },
  baronKills: {
    type: Number
  },
  dragonKills: {
    type: Number
  },
  bans: [
    {
      championId: {
        type: Number
      },
      pickTurn: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model("TeamInGame", TeamInGameSchema);
