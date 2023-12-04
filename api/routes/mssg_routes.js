const express = require("express");
const Router = express.Router();

const {
  add_mssg,
  get_mssg,
  delete_mssg,
} = require("../controllers/mssg_controllers");
const auth = require("../middleware/auth");

Router.route("/add").post(add_mssg);
Router.route("/get/:conversationId").get(get_mssg);
Router.route("/delete").post(delete_mssg);

module.exports = Router;
