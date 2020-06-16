const Match = require("../models/Match");
const TeamInGame = require("../models/TeamInGame");
const Team = require("../models/Team");
const Tournament = require("../models/Tournament");
const Participant = require("../models/Participant");
const DetailsInGame = require("../models/DetailsInGame");
var _ = require("lodash");
var schedule = require("node-schedule");
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const arr = [];

const arrParticipants = [];
const arrdetails = [];

var date = new Date(Date.now() + 100000);
let id = "5e61e3d35e83425f00a9a30c";
/* let find = async () => {
  let i = 0;
  let tournaments = await Tournament.find()
    .populate("teams")
    .populate("matchs")
    .populate({
      path: "matchs",
      populate: { path: "teams" },
    });
  var q = schedule.scheduleJob("/1 * * * * *", async function () {
    tournaments = await Tournament.find()
      .populate("teams")
      .populate("matchs")
      .populate({
        path: "matchs",
        populate: { path: "teams" },
      });
  });
  let date = new Date(Date.now() + 30000);
  tournaments.forEach((element) => {
    var q = schedule.scheduleJob(date, function () {
      console.log(i + "k");
      i++;
    });
  });
};
find(); */
/* let tournaments = await Tournament.find()
  .populate("teams")
  .populate("matchs")
  .populate({
    path: "matchs",
    populate: { path: "teams" },
  });
console.log(tournaments.length); */

/* var j = schedule.scheduleJob("/5 * * * * *", async function () {
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
        championId: between(100, 200),
        pickTurn: 1,
      },
      {
        championId: between(100, 200),
        pickTurn: 2,
      },
      {
        championId: between(100, 200),
        pickTurn: 3,
      },
      {
        championId: between(100, 200),
        pickTurn: 4,
      },
      {
        championId: between(100, 200),
        pickTurn: 5,
      }
    );
    const teams = await teamInGame.save();
    arr.push(teams);
  }

  try {
    const matchs = await Match.find({
      DateStart: { $gte: new Date(Date.now()) },
    });
    console.log(matchs);
    let dateNow = new Date(Date.now() + 120000);

    matchs.forEach(async (element) => {
      console.log(element.DateStart);
      console.log(Date().toString());
      console.log(element.DateStart < Date());
      if (element.DateStart.getTime() < dateNow) {
        console.log("a");

                const match = await Match.updateOne(
          { _id: "5eaeff7f7da2fc0534ecfc5d" },
          {
            $set: {
              platformId: "EUW4",
              gameCreation: between(1000000000000, 1584940269561),
              gameDuration: between(900, 3000),
              queueId: between(100, 500),
              seasonId: 13,
              gameMode: "CLASSIC",
              gameType: "COSTUM_GAME",
              teamsIngame: arr,
            },
          }
        ); 
      }
    });

    res.json(match);
  } catch (err) {}
}); */
async function test2(tournamentId, teamId) {
  try {
    console.log(teamId);
    const match = await Match.updateOne(
      { _id: tournamentId },
      { $set: { TeamWining: teamId } }
    );
    console.log(match);
  } catch (error) {
    console.log(error);
  }
}
async function test(matchId) {
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
        championId: between(100, 200),
        pickTurn: 1,
      },
      {
        championId: between(100, 200),
        pickTurn: 2,
      },
      {
        championId: between(100, 200),
        pickTurn: 3,
      },
      {
        championId: between(100, 200),
        pickTurn: 4,
      },
      {
        championId: between(100, 200),
        pickTurn: 5,
      }
    );
    const teams = await teamInGame.save();
    arr.push(teams);
  }

  try {
    const matche = await Match.findById(matchId);
    const match = await Match.updateOne(
      { _id: matchId },
      {
        $set: {
          platformId: "EUW4",
          gameCreation: between(1000000000000, 1584940269561),
          gameDuration: between(900, 3000),
          queueId: between(100, 500),
          seasonId: 13,
          gameMode: "CLASSIC",
          gameType: "COSTUM_GAME",
          teamsIngame: arr,
          TeamWining: matche.teams[0],
        },
      }
    ).populate("teams");
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  nani: async function (req, res) {
    try {
      console.log(req.params.teamId);
      const team = await Team.findById(req.params.teamId);
      const match = await Match.updateOne(
        { _id: req.params.matchId },
        { $set: { TeamWining: req.params.teamId } }
      );
      console.log(match);
    } catch (error) {
      console.log(error);
    }
  },
  checkIn: async function (req, res) {
    const match = await Match.updateOne(
      { _id: req.params.matchId },
      { $push: { teamsChecked: req.params.teamId } }
    );
    res.json(match);
  },

  matchTournamentSimulation: async function (req, res) {
    try {
      const tournament = await Tournament.findById(req.params.tournamentId)
        .populate("matchs")
        .populate({
          path: "matchs",
          populate: { path: "teams" },
          populate: { path: "TeamWining" },
          populate: { path: "teamsChecked" },
        });
      matchs = await tournament.matchs;
      var currentF = null;
      for (i = 0; i < matchs.length; i++) {
        if (matchs[i].TypeOfMath != 0 && matchs[i].TypeOfMath != 2) {
          currentF = 1;
        } else if (matchs[i].TypeOfMath != 0 && matchs[i].TypeOfMath != 1) {
          currentF = 2;
        } else {
          currentF = 0;
        }
      }
      let dateNow = new Date();
      dateNow.setSeconds(0, 0);
      let datePlusOneMinute = new Date();
      matchs.forEach((element) => {
        let dateStart = new Date(element.dateStart);

        date.setSeconds(0, 0);
        dateStart.setTime(dateStart.getTime() + 1000 * 60);
        /*  console.log(dateNow.toString());
        console.log(dateStart.toString());
        console.log(dateNow.getTime() > dateStart.getTime()); */
        if (
          element.TypeOfMath == currentF &&
          dateNow.getTime() > dateStart.getTime()
        ) {
          if (element.TeamWining == null && element.teamsChecked.length == 1) {
            console.log("wesh");
            test2(element._id, element.teamsChecked[0]);
            /*  const match =  Tournament.updateOne(
              { _id: element._id },
              { $set: { TeamWining: element.teamsChecked[0]._id } }
            ); */
          } else if (element.TeamWining == null) {
            console.log("va");
            test(element._id);
          }
        }
      });
      res.json("worked");
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  matchCreate: async function (req, res) {
    const match = await Match.updateOne(
      { _id: "5e61e3d35e83425f00a9a30c" },
      {
        $set: {
          DateStart: null,
          platformId: "EUW5",
          seasonId: 13,
          gameMode: "CLASSIC",
          gameType: "COSTUM_GAME",
        },
      }
    ).populate("teams");
    res.json(match);
  },
  matchSimulation2: async function (req, res) {
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
          championId: between(100, 200),
          pickTurn: 1,
        },
        {
          championId: between(100, 200),
          pickTurn: 2,
        },
        {
          championId: between(100, 200),
          pickTurn: 3,
        },
        {
          championId: between(100, 200),
          pickTurn: 4,
        },
        {
          championId: between(100, 200),
          pickTurn: 5,
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
            teamsIngame: arr,
          },
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
  matchSimulation: async function (req, res) {
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
          championId: between(100, 200),
          pickTurn: 1,
        },
        {
          championId: between(100, 200),
          pickTurn: 2,
        },
        {
          championId: between(100, 200),
          pickTurn: 3,
        },
        {
          championId: between(100, 200),
          pickTurn: 4,
        },
        {
          championId: between(100, 200),
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

    for (j = 0; j < 10; j++) {
      const participants = new Participant({
        team: req.params.team1,
        championId: between(100, 200),
        spell1Id: between(1, 9),
        spell2Id: between(1, 2),
        stats: arrdetails[j],
      });
      const savedParticipants = await participants.save();
      arrParticipants.push(savedParticipants);
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
      participents: arrParticipants,
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
        .populate("teams")
        .populate("participents")
        .populate({
          path: "participents",
          populate: { path: "stats" },
        });

      res.json(match);
    } catch (err) {
      res.json({ message: err });
    }
  },
};
