const Notification = require("../src/models/Notification");
// const notifs = [
//   {
//     title: "notif1",
//     body: "This is a notification",
//     user: "xMohsenx",
//   },
//   {
//     title: "notif2",
//     body: "this a notification too",
//     user: "3ezdin",
//   },
// ];
const fetchNotifications = async (userId) => {
  /**
   * Dans ton cas, tu va chercher les notifications depuis la base de données et ca sera un truc du genre: (el code elli kont ketbou fel route mte3ek)
   * const notifs = await Notifications.findMany({user: userId});
   */

  const notifications = await Notification.find({
    recevingLeader: userId,
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
  return notifications;
  // req.app.get("socketio").to(req.params.teamLeaderId).emit("notifications", notifications);
};
const saveNotification = async (notification) => {
  /**
   * kif kif dans ton cas bech ta3mel await new Notification(notification).save()
   */
};

const handleEvents = (socket) => {
  // step 3 : le serveur recoit l'evenement "auth", il fait rejoindre la socket un channel dédié à l'utilisateur et on lui renvoie les notifications
  socket.on("auth", async (userId) => {
    // la socket rejoint un channel
    socket.join(userId);
    // on récupère la liste des notifications
    const notifications = await fetchNotifications(userId);
    socket.emit("notifications", notifications);
    // ou req.io.to(userId).emit("notifications",notifications) si tu utilise l'object io au lieu de l'instance socket
  });

  // step 6 : le serveur recoit l'évement "new", tu récupère les données et tu sauvegardes la nouvelle notif.
  // optionnement ba3d el sauvegarde tu peux aussi envoyer la nouvelle liste de notifications.
  // socket.on("new", async (body) => {
  //   // tu enregistre la notification dans ta base de données

  //   //  fetch les nouvelles notifications et les envoyer au client
  //   const notifications = await fetchNotifications(body.recevingLeader);

  //   socket.emit("notifications", notifications);
  //   console.log(notifications);
  // });
};
module.exports = {
  handleEvents,
  fetchNotifications,
};
