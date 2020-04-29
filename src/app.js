const express = require("express");
const userRouter = require("./routers/user");
const port = process.env.PORT;
require("./db/db");
const app = express();
const teamRoute = require("./routers/teams");
const tournamentRoute = require("./routers/tourrnaments");
const notificationRoute = require("./routers/notification");
const TUNotificationRoute = require("./routers/teamusernotifications");
const matchRoute = require("./routers/matchs");
const bodyParser = require("body-parser");
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
var cors = require("cors");
app.use(bodyParser.json());
app.use("/tunotifications", TUNotificationRoute);
app.use("/team", teamRoute);
app.use("/tournament", tournamentRoute);
app.use("/notification", notificationRoute);
app.use("/match", matchRoute);
app.use(express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//test git
//test git2
