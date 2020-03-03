const express = require("express");
const router = express.Router();
const Tournament = require("../models/Tournament");
const Match = require("../models/Match");
//create tournament
router.post("/", async (req, res) => {
  const tournament = new Tournament({
    tournamentName: req.body.tournamentName,
    numberOfTeams: req.body.numberOfTeams,
    dateQuartFinale: req.body.dateQuartFinale,
    dateDemiFinale: req.body.dateDemiFinale,
    dateFinale: req.body.dateFinale
  });
  const savedTournaments = await tournament.save();
  res.json(savedTournaments);
});
//get teams participating to tournament
router.get("/:tournamentId", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.tournamentId);
    teams = tournament.teams;
    res.json(teams);
  } catch (err) {
    res.json({ message: err });
  }
});
//get tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find()
      .populate("teams")
      .populate("matchs")
      .populate({ path: "matchs", populate: { path: "teams" } });
    res.json(tournaments);
  } catch (err) {
    res.json({ message: err });
  }
});
//create matchs for tournament
router.patch("/:tournamentId", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.tournamentId);
    teams = tournament.teams;
    Array.prototype.sample = function() {
      return this[Math.floor(Math.random() * this.length)];
    };
    len = teams.length;
    for (i = 0; i < len / 2; i++) {
      team1 = teams.sample();
      const index = teams.indexOf(team1);
      if (index > -1) {
        teams.splice(index, 1);
      }
      console.log("team1" + teams);
      team2 = teams.sample();
      const index2 = teams.indexOf(team2);
      if (index2 > -1) {
        teams.splice(index2, 1);
      }
      console.log("team2" + teams);
      const match = new Match({
        Date: "2020-03-02T02:25:00.460Z",
        teams: [team1, team2]
      });
      match.save();
      const updatedTournament = await Tournament.updateOne(
        { _id: req.params.tournamentId },
        { $push: { matchs: match._id } }
      );
    }

    res.json();
  } catch (err) {
    res.json({ message: err });
  }
});
//Add team to tournament
router.patch("/:teamId/:tournamentId", async (req, res) => {
  try {
    const updatedTournament = await Tournament.updateOne(
      { _id: req.params.tournamentId },
      { $push: { teams: req.params.teamId } }
    );
    res.json(updatedTournament);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
