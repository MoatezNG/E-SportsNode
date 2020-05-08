const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const auth = require("../middleware/auth");
const User = require("../models/User");
const storageFile = require("../db/storage");
router.get("/aaa", (req, res) => {
  // example route for auth
  res.json({ message: "Anyone can access(only authorized)" });
});

router.post(
  "/create",
  storageFile.upload.single("teamImage"),
  auth,
  async (req, res) => {
    try {
      const team = new Team({
        teamName: req.body.teamName,
        teamLeader: req.user,
        picture: req.file.path,
        description: req.body.description,
      });
      const savedTeam = await team.save();
      const updatedUser = await User.updateOne(
        { _id: team.teamLeader._id },
        { $set: { role: User.roleEnum.TeamLeader } }
      );
      res.json(savedTeam);
    } catch (error) {
      res.status(400).send("problem");
    }
  }
);

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
router.get("/find/:teamL", async (req, res) => {
  try {
    const team = await Team.find({ teamLeader: req.params.teamL });
    console.log(team);
    res.json(team);
  } catch (err) {
    res.json({ message: err });
    console.log(team);
  }
});
router.get("/getall", async (req, res) => {
  try {
    const teams = await Team.find().populate("members").populate("teamLeader");
    res.json(teams);
  } catch (err) {
    res.json({ message: err });
    console.log(team);
  }
});
//get my team
router.get("/getmyteam", auth, async (req, res) => {
  try {
    const team = await Team.find({ teamLeader: req.user._id }).populate("members").populate("teamLeader");
    console.log(team);
    res.json(team);
  } catch (err) {
    res.json({ message: err });
    console.log(team);
  }
});
//delete team
router.delete("/delete", auth, async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ teamLeader: req.user._id });
    res.json("This team has been deleted");
  } catch (error) {
    res.status(500).send(error);
  }
})
module.exports = router;
