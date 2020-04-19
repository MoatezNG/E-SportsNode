const matchController = require("../controller/matchController");
const express = require("express");
const router = express.Router();
var schedule = require("node-schedule");
const Match = require("../models/Match");
//simulateMatch

router.post("/:team1/:team2", matchController.matchSimulation);

//simulateMatchAlreadyCreated

router.post("/:matchId", matchController.matchSimulation2);

//getMatch

router.get("/get/:matchId", matchController.getMatch);

module.exports = router;
