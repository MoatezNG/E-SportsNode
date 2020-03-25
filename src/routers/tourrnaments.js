const express = require("express");
const router = express.Router();
const Tournament = require("../models/Tournament");
const Match = require("../models/Match");
const tournamentController = require("../controller/tournamentController");
const storageFile = require("../db/storage");

//create tournament
router.post(
  "/",
  storageFile.upload.single("tournamentImage"),
  tournamentController.createTournament
);

//get teams that are participating to tournament
router.get("/:tournamentId", tournamentController.teamParticpingTournament);

//get all tournaments
router.get("/", tournamentController.getTournament);

//Create first matchs of the first phase of tournament
router.patch("/:tournamentId", tournamentController.createFirstMatchs);

//Create next Matchs
router.patch("/next/:tournamentId", tournamentController.creatNextMatch);

//Add team to tournament
router.patch(
  "/:teamId/:tournamentId",
  tournamentController.addTeamToTournament
);

module.exports = router;
