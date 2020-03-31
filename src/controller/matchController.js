const Match = require("../models/Match");
const TeamInGame = require("../models/TeamInGame");
var _ = require("lodash");
var schedule = require("node-schedule");
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const arr = [];
var date = new Date(Date.now() + 100000);
let id = "5e61e3d35e83425f00a9a30c";

var j = schedule.scheduleJob("*/59 * * * * *", async function() {
  /*  console.log(matchs); */
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

  try {
    /*  console.log(new Date(Date.now())); */
    const matchs = await Match.find({
      DateStart: { $gte: new Date(Date.now()) }
    });
    let dateNow = new Date(Date.now() + 120000);

    matchs.forEach(async element => {
      console.log(element.DateStart < dateNow);
      if (element.DateStart.getTime() < dateNow) {
        console.log("a");
        /*   const m = new Match(); */
        const match = await Match.updateOne(
          { _id: "5e61e3d35e83425f00a9a30d" },
          {
            $set: {
              platformId: "EUW4",
              gameCreation: between(1000000000000, 1584940269561),
              gameDuration: between(900, 3000),
              queueId: between(100, 500),
              seasonId: 13,
              gameMode: "CLASSIC",
              gameType: "COSTUM_GAME",
              teamsIngame: arr
            }
          }
        );
      }
    });

    /* match.teams.push(match.teams[0], match.teams[1]); */

    res.json(match);
  } catch (err) {}
});

module.exports = {
  matchCreate: async function(req, res) {
    const match = await Match.updateOne(
      { _id: "5e61e3d35e83425f00a9a30c" },
      {
        $set: {
          DateStart: null,
          platformId: "EUW5",
          seasonId: 13,
          gameMode: "CLASSIC",
          gameType: "COSTUM_GAME"
        }
      }
    ).populate("teams");
    res.json(match);
  },
  matchSimulation2: async function(req, res) {
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

    try {
      const match = await Match.updateOne(
        { _id: req.params.matchId },
        {
          $set: {
            DateStart: null,
            platformId: "EUW4",
            gameCreation: between(1000000000000, 1584940269561),
            gameDuration: between(900, 3000),
            queueId: between(100, 500),
            seasonId: 13,
            gameMode: "CLASSIC",
            gameType: "COSTUM_GAME",
            teamsIngame: arr
          }
        }
      ).populate("teams");
      console.log(match);
      /* match.teams.push(match.teams[0], match.teams[1]); */
      /* let matchs = await Match.find({
        DateStart: { $gte: new Date(Date.now()) }
      });
      let matche = await Match.find({}); */

      /* console.log(matche.DateStart); */
      /*   let x = new Date(Date.now());
      matche.forEach(element => {
        console.log(element.DateStart);
      }); */
      res.json(match);
    } catch (err) {
      console.log(err);
    }
  },
  matchSimulation: async function(req, res) {
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
