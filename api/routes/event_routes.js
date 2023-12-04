const express = require("express");
const Router = express.Router();

const {
  add_event,
  get_events,
  edit_events,
  delete_event,
} = require("../controllers/event_controllers");
const auth = require("../middleware/auth");

Router.route("/add").post(auth, add_event);
Router.route("/get").get(auth, get_events);
Router.route("/edit").patch(edit_events);
Router.route("/delete").post(delete_event);

module.exports = Router;
