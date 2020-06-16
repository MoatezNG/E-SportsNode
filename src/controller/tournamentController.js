const Tournament = require("../models/Tournament");
const Match = require("../models/Match");
module.exports = {
  createTournament: async function (req, res) {
    try {
      const user = JSON.parse(JSON.stringify(req.body.tournamentAdmin));

      const tournament = new Tournament({
        tournamentName: req.body.tournamentName,
        numberOfTeams: req.body.numberOfTeams,
        description: req.body.description,
        dateRound0: req.body.dateRound0,
        dateRound1: req.body.dateRound1,
        dateRound2: req.body.dateRound2,
        dateRound3: req.body.dateRoun3,
        tournamentPicture: req.file.path,
        tournamentAdmin: user,
      });
      const savedTournaments = await tournament.save();
      res.json(savedTournaments);
    } catch (error) {
      return res.status(404).json(error);
    }
  },
  updateTournament: async function (req, res) {
    try {
      const updatedTournament = await Tournament.updateOne(
        { _id: req.params.tournamentId },
        {
          $set: req.body,
        }
      );
      res.json(updatedTournament);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  //get Tournament By Id
  getTournamentById: async function (req, res) {
    try {
      const tournament = await Tournament.findById(req.params.tournamentId)
        .populate("teams")
        .populate("matchs")
        .populate({
          path: "matchs",
          populate: { path: "teams" },
        });
      res.json(tournament);
    } catch (error) {
      res.json(error);
    }
  },
  //get my Tournament
  getMyTournament: async function (req, res) {
    try {
      const tournament = await Tournament.find({
        tournamentAdmin: req.user._id,
      })
        .populate("teams")
        .populate("matchs")
        .populate({
          path: "matchs",
          populate: { path: "teams" },
        });
      res.json(tournament);
    } catch (error) {
      res.json(error);
    }
  },
  //get All tournaments
  getTournament: async function (req, res) {
    try {
      const tournaments = await Tournament.find()
        .populate("teams")
        .populate("matchs")
        .populate({
          path: "matchs",
          populate: { path: "teams" },
        });
      res.json(tournaments);
    } catch (err) {
      res.json({ message: err });
    }
  },
  //get teams participating to tournament
  teamParticpingTournament: async function (req, res) {
    try {
      const tournament = await Tournament.findById(req.params.tournamentId);
      teams = tournament.teams;
      res.json(teams);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  //create match for tournament
  createFirstMatchs: async function (req, res) {
    try {
      const tournament = await Tournament.findById(req.params.tournamentId);

      teams = tournament.teams;
      dateF = null;
      switch (tournament.numberOfTeams) {
        case 4:
          dateF = tournament.dateDemiFinale;
          break;
        case 8:
          dateF = tournament.dateQuartFinale;
          break;
        case 16:
          dateF = dateSeixiemeFinale;
      }
      Array.prototype.sample = function () {
        return this[Math.floor(Math.random() * this.length)];
      };
      len = teams.length;
      /*  console.log(teams.length); */
      for (i = 0; i < len / 2; i++) {
        /*    console.log(teams[i]); */
        team1 = teams.sample();
        const index = teams.indexOf(team1);
        if (index > -1) {
          teams.splice(index, 1);
        }

        team2 = teams.sample();
        const index2 = teams.indexOf(team2);
        if (index2 > -1) {
          teams.splice(index2, 1);
        }
        /*  console.log(tournament.dateRound0); */
        const match = new Match({
          dateStart: tournament.dateRound0,
          teams: [team1, team2],
          TypeOfMath: 0,
          TeamWining: null,
        });

        match.save();

        const updatedTournament = await Tournament.updateOne(
          { _id: req.params.tournamentId },
          { $push: { matchs: match._id } }
        );
      }
      res.json();
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }
  },
  //Create next Matchs
  creatNextMatch: async function (req, res) {
    try {
      const tournament = await Tournament.findById(req.params.tournamentId)
        .populate("matchs")
        .populate({
          path: "matchs",
          populate: { path: "teams" },
          populate: { path: "TeamWining" },
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
      /*  matchs.forEach(element => {
       
          if (element.TypeOfMath != 0 && element.TypeOfMath != 2) {
            currentF = 1;
          } else if (element.TypeOfMath != 0 && element.TypeOfMath != 1) {
            currentF = 2;
          } else {
            currentF = 0;
          }
          break;
        }); */

      winingTeams = [];
      matchs.forEach((element) => {
        if (element.TypeOfMath == currentF) {
          if (element.TeamWining != null) {
            /*   console.log(currentF); */
            winingTeams.push(element.TeamWining);
          }
        }
      });
      matchs = [];
      let dateMatch;
      if (currentF == 0) {
        dateMatch = tournament.dateRound1;
      } else if (currentF == 1) {
        dateMatch = tournament.dateRound2;
      }
      if (winingTeams.length > 0) {
        for (i = 0; i < winingTeams.length / 2; i++) {
          j = i;
          if (j != 0) {
            j = i + 1;
          }
          const match = new Match({
            dateStart: dateMatch,
            teams: [winingTeams[j], winingTeams[j + 1]],
            TypeOfMath: currentF + 1,
            TeamWining: null,
          });
          match.save();
          const updatedTournament = await Tournament.updateOne(
            { _id: req.params.tournamentId },
            { $push: { matchs: match._id } }
          );
          matchs.push(match);
        }
      }

      res.json(matchs);
    } catch (error) {
      res.json({ message: error });
    }
  },
  //Add team to tournament
  addTeamToTournament: async function (req, res) {
    /*    http://localhost:3001/tournament/5e999104138f1a1310bb8426/5e9c7342d7820931f478afba */
    try {
      const tournament = (
        await Tournament.findById(req.params.tournamentId)
      ).populate("teams");
      let found = false;
      let userTeam = "";
      let tournamentTeam = "";

      tournament.teams.forEach((element) => {
        userTeam = req.user.team._id;
        tournamentTeam = element._id;

        if (element._id.toString() == req.user.team._id.toString()) {
          found = true;
        }
      });

      if (found === false) {
        const updatedTournament = await Tournament.updateOne(
          { _id: req.params.tournamentId },
          { $push: { teams: req.params.teamId } }
        );
        res.json(updatedTournament);
      } else {
        const updatedTournament = await Tournament.updateOne(
          { _id: req.params.tournamentId },
          { $pull: { teams: req.params.teamId } }
        );
        res.json(updatedTournament);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
