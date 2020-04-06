const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const axios = require("axios");
const router = express.Router();

//check if the user have a league of legend acount
async function sumonerNam(name) {
  let response = await axios.get(
    "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      name +
      "?api_key=RGAPI-5c9ef8e7-ab6b-40e5-9c66-45ec112a36df"
  );
  if (response.status == 200) {
    return response.data.name;
  }
  return "";
}
router.post("/users/aa", async (req, res) => {
  // Create a new user
  try {
    let sumonnerName = await sumonerNam(req.body.sumonnerName);
    console.log(sumonnerName);
    if (sumonnerName != "") {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } else {
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(400).send("summoner not found");
  }
});

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

//test
module.exports = router;
