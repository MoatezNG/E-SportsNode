const Match = require("../models/Match");
const TeamInGame = require("../models/TeamInGame");
var _ = require("lodash");

function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const arr = [];
module.exports = {
  matchSimulation: async function(req, res) {
    for (i = 0; i < 2; i++) {
      const teamInGame = new TeamInGame({
        win: "Fail",
        firstBlood: _.sample([true, false]),
        firstTower: _.sample([true, false]),
        firstInhibitor: _.sample([true, false]),
        firstBaron: _.sample([true, false]),
        firstDragon: _.sample([true, false]),
        firstRiftHerald: _.sample([true, false]),
        towerKills: between(1, 11),
        inhibitorKills: between(1, 3),
        baronKills: between(1, 2),
        dragonKills: between(1, 4)
      });
      teamInGame.bans.push(
        {
          championId: between(100, 200),
          pickTurn: 1
        },
        {
          championId: between(100, 200),
          pickTurn: 2
        },
        {
          championId: between(100, 200),
          pickTurn: 3
        },
        {
          championId: between(100, 200),
          pickTurn: 4
        },
        {
          championId: between(100, 200),
          pickTurn: 5
        }
      );
      const teams = await teamInGame.save();
      arr.push(teams);
    }

    const match = new Match({
      DateStart: null,
      platformId: "EUW1",
      gameCreation: between(1000000000000, 1584940269561),
      gameDuration: between(900, 3000),
      queueId: between(100, 500),
      seasonId: 13,
      gameMode: "CLASSIC",
      gameType: "COSTUM_GAME",
      teamsIngame: arr
    });
    match.teams.push(req.params.team1, req.params.team2);
    const savedmatch = await match.save();
    res.json(savedmatch);
  },
  //getMatch
  getMatch: async function(req, res) {
    try {
      const match = await Match.findById(req.params.matchId)
        .populate("teamsIngame")
        .populate("teams");
      res.json(match);
    } catch (err) {
      res.json({ message: err });
    }
  }
};
