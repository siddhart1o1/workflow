const express = require("express");
const Router = express.Router();

const {
  add_blog,
  get_all,
  like,
  delete_blog,
} = require("../controllers/blog_controllers");
const auth = require("../middleware/auth");

Router.route("/add").post(auth, add_blog);
Router.route("/get").get(get_all);
Router.route("/like").post(auth, like);
Router.route("/delete").post(auth, delete_blog);

module.exports = Router;
