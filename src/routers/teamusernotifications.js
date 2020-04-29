const express = require("express");
const router = express.Router();
const TUNotification = require("../models/TeamUserNotifications");
const Team = require("../models/Team");
const User = require("../models/User");
const auth = require("../middleware/auth");

// invite player  to join team
router.post("/inviteplayer/:recevingPlayer", auth, async (req, res) => {
  const notification = new TUNotification({
    invitingUser: req.user.id,
    recevingUser: req.params.recevingL,
    invite: TUNotification.inviteToTeamEnum.Pending,
  });
  const savedInvite = await notification.save();
  res.json(savedInvite);
  console.log(savedInvite);
});
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
module.exports = router;
