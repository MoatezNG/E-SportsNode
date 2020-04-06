const Match = require("../models/Match");
const TeamInGame = require("../models/TeamInGame");
const Participant = require("../models/Participant");
const DetailsInGame = require("../models/DetailsInGame");
const Champs = require("../helpers/champions");
const Spells = require("../helpers/spells");
var _ = require("lodash");

Array.prototype.findByValueOfObject = function (key, value) {
  return this.filter(function (item) {
    return item[key] === value;
  });
};
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  matchSimulation: async function (req, res) {
    const arr = [];
    const arrParticipants = [];
    const arrParticipantsRed = [];
    const arrdetails = [];
    for (i = 0; i < 2; i++) {
      let x = "";
      if (i == 0) {
        x = "win";
      } else x = "fail";
      const teamInGame = new TeamInGame({
        win: x,
        firstBlood: _.sample([true, false]),
        firstTower: _.sample([true, false]),
        firstInhibitor: _.sample([true, false]),
        firstBaron: _.sample([true, false]),
        firstDragon: _.sample([true, false]),
        firstRiftHerald: _.sample([true, false]),
        towerKills: between(1, 11),
        inhibitorKills: between(1, 3),
        baronKills: between(1, 2),
        dragonKills: between(1, 4),
      });
      teamInGame.bans.push(
        {
          championId: _.sample(Champs.championsBans),
          pickTurn: 1,
        },
        {
          championId: _.sample(Champs.championsBans),
          pickTurn: 2,
        },
        {
          championId: _.sample(Champs.championsBans),
          pickTurn: 3,
        },
        {
          championId: _.sample(Champs.championsBans),
          pickTurn: 4,
        },
        {
          championId: _.sample(Champs.championsBans),
          pickTurn: 5,
        }
      );
      const teams = await teamInGame.save();
      arr.push(teams);
    }
    for (i = 0; i < 10; i++) {
      const detailsinGame = new DetailsInGame({
        item1: between(1, 200),
        item2: between(1, 200),
        item3: between(2, 200),
        item4: between(3, 200),
        item5: between(4, 200),
        item6: between(0, 1),
        kills: between(0, 20),
        deaths: between(0, 20),
        assists: between(0, 20),
        champLevel: between(13, 18),
        lane: "BOTTOM",
      });
      const saveddetails = await detailsinGame.save();
      arrdetails.push(saveddetails);
    }

    for (j = 0; j < 5; j++) {
      const participants = new Participant({
        championId: _.sample(Champs.championsPicks),
        spell1Id: _.sample(Spells.Spell1),
        spell2Id: 4,
        stats: arrdetails[j],
      });
      const savedParticipants = await participants.save();
      arrParticipants.push(savedParticipants);
    }
    for (j = 0; j < 5; j++) {
      const participants = new Participant({
        championId: _.sample(Champs.championsPicks),
        spell1Id: _.sample(Spells.Spell1),
        spell2Id: 4,
        stats: arrdetails[j],
      });
      const savedParticipantsRed = await participants.save();
      arrParticipantsRed.push(savedParticipantsRed);
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
      teamsIngame: arr,
      participentsBlue: {
        team: req.params.team1,
        part: arrParticipants,
      },
      participentsRed: {
        team: req.params.team2,
        part: arrParticipantsRed,
      },
    });
    match.teams.push(req.params.team1, req.params.team2);
    const savedmatch = await match.save();
    res.json(savedmatch);
  },
  //getMatch
  getMatch: async function (req, res) {
    try {
      const match = await Match.findById(req.params.matchId)
        .populate("teamsIngame")
        .populate("teams");
      // .populate("participents")
      // .populate({
      //   path: "participents",
      //   populate: { path: "stats" },
      // });

      res.json(match);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //getMatchbsByTeamId
  getMatchbsByTeamId: async function (req, res) {
    try {
      const match = await Match.find({ teams: { $in: [req.params.teamId] } })
        .populate("teamsIngame")
        .populate("teams")
        .populate("participentsRed.part")
        .populate("participentsRed.team")
        .populate({
          path: "participentsRed.team",
          populate: {
            path: "members",
          },
        })
        .populate({
          path: "participentsRed.team",
          populate: {
            path: "teamLeader",
          },
        })
        .populate("participentsBlue.part")
        .populate("participentsBlue.team")
        .populate({
          path: "participentsBlue.team",
          populate: {
            path: "members",
          },
        })
        .populate({
          path: "participentsBlue.team",
          populate: {
            path: "teamLeader",
          },
        });
      // .populate({
      //   path: "participents",
      //   populate: {
      //     path: "team",
      //     populate: {
      //       path: "members",
      //       model: "User",
      //     },
      //   },
      // });

      res.json(match);
    } catch (err) {
      res.json({ message: err });
    }
  },
};
