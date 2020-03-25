const express = require("express");
const userRouter = require("./routers/user");
const port = process.env.PORT;
require("./db/db");
const app = express();
const teamRoute = require("./routers/teams");
const tournamentRoute = require("./routers/tourrnaments");
const notificationRoute = require("./routers/notification");
const matchRoute = require("./routers/matchs");
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(bodyParser.json());
app.use("/team", teamRoute);
app.use("/tournament", tournamentRoute);
app.use("/notification", notificationRoute);
app.use("/match", matchRoute);
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(express.static("uploads"));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//test git
//test git2
