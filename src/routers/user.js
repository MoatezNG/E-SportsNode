const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const axios = require("axios");
const router = express.Router();
var schedule = require("node-schedule");
const storageFile = require("../db/storage");

//check if the user have a league of legend acount
async function sumonerNam(name) {
  console.log(process.env.API_KEY);
  let response = await axios.get(
    "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      name +
      "?api_key=" +
      process.env.API_KEY
  );
  if (response.status == 200) {
    return response.data.name;
  }
  return "";
}
router.post(
  "/users/aa",
  storageFile.upload.single("userImage"),
  async (req, res) => {
    // Create a new user
    try {
      let sumonnerName = await sumonerNam(req.body.sumonnerName);
      console.log(sumonnerName);
      if (sumonnerName != "") {
        const user = new User({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          userImage: req.file.path,
          sumonnerName: req.body.sumonnerName
        });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
      } else {
        res.status(400).send(error);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post("/users/login", async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
  //console.log(req.user.isactivated);
});

router.post("/users/me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/users/me/updateprofile", auth, async (req, res) => {
  try {
    const updatedUser = await req.user.updateOne({ $set: req.body });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/users/me/desactivate", auth, async (req, res) => {
  try {
    const updatedUser = await req.user.updateOne({ $set: { isactivated: 0 } });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* let startTime = new Date(Date.now() + 1000);
let startTime2 = new Date(Date.now() + 15000); */

/* let dates = [startTime, startTime2];
date = new Date(Date.now() + 5000);
var q = schedule.scheduleJob(date, function() {
  let matchs = await Match.find({
    DateStart: { $gte: new Date(Date.now()) }
  });
  dates = []
  matchs.forEach(element=>{
    dates.push(element.DateStart);
  })
  dates.forEach(element => {
    let endTime = new Date(element.getTime() + 5000);
    var j = schedule.scheduleJob(
      { start: element, end: endTime, rule: "/1 * * * * *" },
      function() {
        console.log("test");
      }
    );
  });
});
let x = "avant";

dates.forEach(element => {
  let endTime = new Date(element.getTime() + 5000);
  var j = schedule.scheduleJob(
    { start: element, end: endTime, rule: "/1 * * * * *" },
    function() {
      console.log("test");
    }
  );
}); */

//test
module.exports = router;
