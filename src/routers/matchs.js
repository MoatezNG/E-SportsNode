const matchController = require("../controller/matchController");
const express = require("express");
const router = express.Router();

//simulateMatch
router.post("/:team1/:team2", matchController.matchSimulation);

//getMatch

router.get("/get/:matchId", matchController.getMatch);

module.exports = router;
