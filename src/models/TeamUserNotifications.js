const mongoose = require("mongoose");
const inviteToTeamEnum = Object.freeze({
  Default: "DEFAULT",
  Pending: "PENDING",
  Accepted: "ACCEPTED",
  Refused: "REFUSED",
});
const TeamUserNotificationSchema = mongoose.Schema({
  invitingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recevingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  invite: {
    type: String,
    enum: Object.values(inviteToTeamEnum),
  },
  description: {
    type: String,
  },
});
Object.assign(TeamUserNotificationSchema.statics, {
  inviteToTeamEnum,
});
module.exports = mongoose.model("TUNotifications", TeamUserNotificationSchema);
