const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailsInGameSchema = mongoose.Schema({
  item0: {
    type: Number
  },
  item1: {
    type: Number
  },
  item2: {
    type: Number
  },
  item3: {
    type: Number
  },
  item4: {
    type: Number
  },
  item5: {
    type: Number
  },
  item6: {
    type: Number
  },
  kills: {
    type: Number
  },
  deaths: {
    type: Number
  },
  assists: {
    type: Number
  },
  largestKillingSpree: {
    type: Number
  },
  largestMultiKill: {
    type: Number
  },
  killingSprees: {
    type: Number
  },
  longestTimeSpentLiving: {
    type: Number
  },
  doubleKills: {
    type: Number
  },
  triplekills: {
    type: Number
  },
  quadrakills: {
    type: Number
  },
  pentakills: {
    type: Number
  },
  totalDamageDealt: {
    type: Number
  },
  magicDamageDealt: {
    type: Number
  },
  physicalDamageDealt: {
    type: Number
  },
  trueDamageDealt: {
    type: Number
  },
  largestCriticalStrike: {
    type: Number
  },
  totalDamageDealtToChampions: {
    type: Number
  },
  magicDamageDealtToChampions: {
    type: Number
  },
  physicalDamageDealtToChampions: {
    type: Number
  },
  trueDamageDealtToChampions: {
    type: Number
  },
  totalHeal: {
    type: Number
  },
  totalUnitsHealed: {
    type: Number
  },
  damageSelfMitigated: {
    type: Number
  },
  damageDealtToObjectives: {
    type: Number
  },
  damageDealtToTurrets: {
    type: Number
  },
  visionScore: {
    type: Number
  },
  totalDamageTaken: {
    type: Number
  },
  magicalDamageTaken: {
    type: Number
  },
  physicalDamageTaken: {
    type: Number
  },
  trueDamageTaken: {
    type: Number
  },
  goldEarned: {
    type: Number
  },
  goldSpent: {
    type: Number
  },
  turretKills: {
    type: Number
  },
  totalMinionsKilled: {
    type: Number
  },
  inhibitorKills: {
    type: Number
  },
  totalTimeCrowdControlDealt: {
    type: Number
  },
  neutralMinionsKilled: {
    type: Number
  },
  totalMinionsKilled: {
    type: Number
  },
  champLevel: {
    type: Number
  },
  visionWardsBoughtInGame: {
    type: Number
  },
  wardsPlaced: {
    type: Number
  },
  wardsKilled: {
    type: Number
  },
  firstBloodKill: {
    type: Number
  },
  creepsPerMin: {
    type: Number
  },
  xpPerMinDeltas: {
    type: Number
  },
  goldPerMinDeltas: {
    type: Number
  },
  csDiffPerMinDeltas: {
    type: Number
  },
  xpDiffPerMinDeltas: {
    type: Number
  },
  damageTakenPerMinDeltas: {
    type: Number
  },
  damageTakenDiffPerMinDeltas: {
    type: Number
  },
  role: {
    type: String
  },
  lane: {
    type: String
  }
});

module.exports = mongoose.model("DetailsInGame", DetailsInGameSchema);
