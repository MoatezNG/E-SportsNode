const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

router.post("/", async (req, res) => {
  const team = new Team({
    teamName: req.body.teamName
  });
  const savedTeam = await team.save();
  res.json(savedTeam);
});
router.patch("/:teamId/:userId", async (req, res) => {
  try {
    const updatedTeam = await Team.updateOne(
      { _id: req.params.teamId },
      { $push: { members: req.params.userId } }
    );
    res.json(updatedTeam);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
