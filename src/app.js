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
const events = require("./events");
var cors = require("cors");
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const io = require("socket.io")(server);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE , PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use("/team", teamRoute);
app.use("/tournament", tournamentRoute);
app.use("/notification", notificationRoute);
app.use("/match", matchRoute);
app.use(cors());
app.use(express.json());
app.use(userRouter);

io.on("connection", (socket) => {
  events.handleEvents(socket);
});

app.set("io", io);

//test git
//test git2
