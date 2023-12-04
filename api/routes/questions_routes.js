const express = require("express");
const Router = express.Router();

const {
  get_all,
  ans_match,
  add_que,
  add_topic_subtopic_que,
  add_subtopic_que,
} = require("../controllers/questions_controller");
const auth = require("../middleware/auth");

Router.route("/:topic/:subtopic").get(get_all);
Router.route("/match/:topic/:subtopic").post(auth, ans_match);
Router.route("/add").post(auth, add_que);
Router.route("/new-topic").post(auth, add_topic_subtopic_que);
Router.route("/new-subtopic").post(auth, add_subtopic_que);

module.exports = Router;
