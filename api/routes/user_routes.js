const express = require("express");
const Router = express.Router();

const {
  report,
  get_users,
  get_single_user,
} = require("../controllers/user_controllers");
const auth = require("../middleware/auth");

Router.route("/get").get(auth, get_single_user);
Router.route("/get/:userId").get(get_users);
Router.route("/report").get(auth, report);

module.exports = Router;
