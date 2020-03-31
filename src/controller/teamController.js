const Team = require("../models/Team");
const auth = require("../middleware/auth");
module.exports = {
  createTeam: async function(req, res, auth) {
    const team = new Team({
      teamName: req.body.teamName,
      teamLeader: req.auth.teamLeader
    });
    const savedTeams = await team.save();
    res.json(savedTeams);
  }
};
