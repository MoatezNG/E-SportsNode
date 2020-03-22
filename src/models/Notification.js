const mongoose = require("mongoose");
const inviteForChallengeEnum = Object.freeze({
  Default: "DEFAULT",
  Pending: "PENDING",
  Accepted: "ACCEPTED",
  Refused: "REFUSED"
});
const NotificationSchema = mongoose.Schema({
  invitingLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  recevingLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  invite: {
    type: String,
    enum: Object.values(inviteForChallengeEnum)
  }
});
Object.assign(NotificationSchema.statics, {
  inviteForChallengeEnum
});
module.exports = mongoose.model("Notification", NotificationSchema);
