const express = require("express");
const Router = express.Router();

const {
  scoreboard,
  invite,
} = require("../controllers/interviewer_controllers");
const auth = require("../middleware/auth");

Router.route("/scoreboard").get(auth, scoreboard);
Router.route("/invite").post(auth, invite);

module.exports = Router;
