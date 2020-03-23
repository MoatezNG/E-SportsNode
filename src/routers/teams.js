const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/aaa", (req, res) => {
  // example route for auth
  res.json({ message: "Anyone can access(only authorized)" });
});

router.post("/create", auth, async (req, res) => {
  const team = new Team({
    teamName: req.body.teamName,
    teamLeader: req.user
  });
  const savedTeam = await team.save();
  const updatedUser = await User.updateOne(
    { _id: team.teamLeader._id },
    { $set: { role: User.roleEnum.TeamLeader } }
  );
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
//get teambyTeamLeader
router.get("/:teamL", async (req, res) => {
  try {
    const team = await Team.find({ teamLeader: req.params.teamL });
    res.json(team);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
