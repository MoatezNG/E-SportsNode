const express = require("express");
const router = express.Router();
const TUNotification = require("../models/TeamUserNotifications");
const Team = require("../models/Team");
const User = require("../models/User");
const auth = require("../middleware/auth");

// invite player  to join team-team leader bark yajouti des membres
router.post("/inviteplayer/:recevingPlayer", auth, async (req, res) => {
  const notification = new TUNotification({
    invitingUser: req.params.recevingL,
    recevingUser: req.user.id,
    invite: TUNotification.inviteToTeamEnum.Pending,
  });
  const savedInvite = await notification.save();
  res.json(savedInvite);
  console.log(savedInvite);
});
//accept invite
router.patch("/accept/:notificationId", async (req, res) => {
  try {
    const updatedTUNotification = await TUNotification.updateOne(
      { _id: req.params.notificationId },
      { $set: { invite: TUNotification.inviteToTeamEnum.Accepted } }
    );
    res.json(updatedTUNotification);
  } catch (err) {
    res.json({ message: err });
  }
});
//refuse invite
router.patch("/refuse/:notificationId", async (req, res) => {
  try {
    const updatedTUNotification = await TUNotification.updateOne(
      { _id: req.params.notificationId },
      { $set: { invite: TUNotification.inviteToTeamEnum.Refused } }
    );
    res.json(updatedTUNotification);
  } catch (err) {
    res.json({ message: err });
  }
});
//request to join team
router.post("/joinrequest/:recevingL", auth, async (req, res) => {
  const notification = new TUNotification({
    invitingUser: req.user.id,
    recevingUser: req.params.recevingL,
    invite: TUNotification.inviteToTeamEnum.Pending,
    description: req.body.description,
  });
  const savedInvite = await notification.save();
  res.json(savedInvite);
  console.log(savedInvite);
});
//accept request to join team
router.patch("/accept/:notificationId", async (req, res) => {
  try {
    const updatedTUNotification = await TUNotification.updateOne(
      { _id: req.params.notificationId },
      { $set: { invite: TUNotification.inviteToTeamEnum.Accepted } }
    );
    res.json(updatedTUNotification);
  } catch (err) {
    res.json({ message: err });
  }
});
//GetAllNotification
router.get("/getnotifications", auth, async (req, res) => {
  try {
    const notifications = await TUNotification.find({
      $or: [
        {
          recevingLeader: req.user,
          invite: TUNotification.inviteToTeamEnum.Pending,
        },
        {
          invitingLeader: req.user,
          invite: TUNotification.inviteToTeamEnum.Accepted,
        },
      ],
    });
    console.log(notifications);
    res.json(notifications);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
