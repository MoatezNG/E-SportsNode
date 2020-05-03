const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const matchController = require("../controller/matchController");
const Team = require("../models/Team");
const Moment = require("moment");
const events = require("../events");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
var schedule = require("node-schedule");
var CronJob = require("cron").CronJob;

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// ChallengeTeam
router.post("/challenge/:invitingL/:recevingL", async (req, res) => {
  const io = req.app.get("io");

  const notification = new Notification({
    invitingLeader: req.params.invitingL,
    recevingLeader: req.params.recevingL,
    invite: Notification.inviteForChallengeEnum.Pending,
    Readed: false,
    DateGame: req.body.DateGame,
  });

  const savedInvite = await notification.save();
  io.to(req.params.recevingL).emit("newNotif", savedInvite);
  const notifications = await events.fetchNotifications(req.params.recevingL);
  io.to(req.params.recevingL).emit("notifications", notifications);
  res.json(savedInvite);
  console.log(savedInvite);
});
module.exports = router;
// acceptingChallenge
router.patch(
  "/accept/:notificationId/:invitingL/:recevingL",
  async (req, res) => {
    try {
      const updatedNotification = await Notification.updateOne(
        { _id: req.params.notificationId },
        { $set: { invite: Notification.inviteForChallengeEnum.Accepted } }
      );

      res.json(updatedNotification);
    } catch (err) {
      res.json({ message: err });
    }
    const team1 = await Team.findOne({ teamLeader: req.params.invitingL });
    const notification = await Notification.findById(req.params.notificationId);
    const team2 = await Team.findOne({ teamLeader: req.params.recevingL });

    const datenow = moment(Date.now());

    console.log(datenow.toISOString());
    console.log(notification.DateGame);
    var j = schedule.scheduleJob(
      notification.DateGame.getTime(),
      async function () {
        await timeout(matchController.gameDuration);
        console.log(matchController.gameDuration);
        router.post(matchController.matchSimulation(team1, team2));
      }
    );
  }
);

//GetInvitesForchallenge
router.get("/get/:teamLeaderId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      recevingLeader: req.params.teamLeaderId,
      invite: Notification.inviteForChallengeEnum.Pending,
    })
      .populate("invitingLeader")
      .populate({
        path: "invitingLeader",
        populate: { path: "teamOwned" },
      })
      .populate("recevingLeader")
      .populate({
        path: "recevingLeader",
        populate: { path: "teamOwned" },
      });

    // req.app.get("socketio").to(req.params.teamLeaderId).emit("notifications", notifications);

    res.json(notifications);
  } catch (err) {
    res.json({ message: err });
  }
});
//readnotification
router.get("/read/:teamLeaderId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      invitingLeader: req.params.teamLeaderId,
      invite: Notification.inviteForChallengeEnum.Accepted,
      Readed: false,
    });
    notifications = await Notification.updateMany({ $set: { Readed: true } });
    res.json(notifications);
  } catch (err) {
    res.json({ message: err });
  }
});
//get unreaded notifications
router.get("/unreaded/:teamLeaderId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      invitingLeader: req.params.teamLeaderId,
      invite: Notification.inviteForChallengeEnum.Accepted,
      Readed: false,
    });

    res.json(notifications);
  } catch (err) {
    res.json({ message: err });
  }
});
//getAcceptedinvites
router.get("/getaccepted/:teamLeaderId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      invitingLeader: req.params.teamLeaderId,
      invite: Notification.inviteForChallengeEnum.Accepted,
    })
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate("invitingLeader")
      .populate({
        path: "invitingLeader",
        populate: { path: "teamOwned" },
      })
      .populate("recevingLeader")
      .populate({
        path: "recevingLeader",
        populate: { path: "teamOwned" },
      });

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
