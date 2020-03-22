const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const Team = require("../models/Team");

// ChallengeTeam
router.post("/challenge/:invitingL/:recevingL", async (req, res) => {
  const notification = new Notification({
    invitingLeader: req.params.invitingL,
    recevingLeader: req.params.recevingL,
    invite: Notification.inviteForChallengeEnum.Pending
  });

  const savedInvite = await notification.save();
  res.json(savedInvite);
  console.log(savedInvite);
});
module.exports = router;
// acceptingChallenge
router.patch("/accept/:notificationId/:recevingL", async (req, res) => {
  try {
    const updatedNotification = await Notification.updateOne(
      { _id: req.params.notificationId },
      { $set: { invite: Notification.inviteForChallengeEnum.Accepted } }
    );
    res.json(updatedNotification);
  } catch (err) {
    res.json({ message: err });
  }
});

//GetAllNotification
router.get("/get/:teamLeaderId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        {
          recevingLeader: req.params.teamLeaderId,
          invite: Notification.inviteForChallengeEnum.Pending
        },
        {
          invitingLeader: req.params.teamLeaderId,
          invite: Notification.inviteForChallengeEnum.Accepted
        }
      ]
    }).populate("recevingLeader");
    console.log(notifications);
    res.json(notifications);
  } catch (err) {
    res.json({ message: err });
  }
});

//GetNotifBYId
router.get("/get/:notif", async (req, res) => {
  try {
    const notifications = await Notification.findById(
      req.params.notif
    ).populate("recevingLeader");
    console.log(notifications);
    res.json(notifications);
  } catch (err) {
    res.json({ message: err });
  }
});
