const express = require("express");
const router = express.Router();
const Tournament = require("../models/Tournament");
const Match = require("../models/Match");
const tournamentController = require("../controller/tournamentController");
const storageFile = require("../db/storage");
const auth = require("../middleware/auth");
//create tournament
router.post(
  "/",
  storageFile.upload.single("tournamentImage"),
  tournamentController.createTournament
);
//get tournament by id
router.get("/:tournamentId", tournamentController.getTournamentById);
//get teams that are participating to tournament
router.get(
  "/teams/:tournamentId",
  tournamentController.teamParticpingTournament
);
//get my Tournament
router.get("/my/Tournament", auth, tournamentController.getMyTournament);
//Add team to tournament
router.get(
  "/:teamId/:tournamentId",
  auth,
  tournamentController.addTeamToTournament
);
//get all tournaments
router.get("/", tournamentController.getTournament);

//Create first matchs of the first phase of tournament
router.patch("/:tournamentId", tournamentController.createFirstMatchs);

//Create next Matchs
router.patch("/next/:tournamentId", tournamentController.creatNextMatch);

//update a tournament
router.put(
  "/updateTournamen/:tournamentId",

  tournamentController.updateTournament
);

module.exports = router;
