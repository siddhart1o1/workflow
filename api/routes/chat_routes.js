const express = require("express");
const Router = express.Router();

const {
  new_chat,
  get_chat,
  delete_chat,
} = require("../controllers/chat_controllers");
const auth = require("../middleware/auth");

Router.route("/add").post(new_chat);
Router.route("/get").get(auth, get_chat);
Router.route("/delete").post(auth, delete_chat);

module.exports = Router;
