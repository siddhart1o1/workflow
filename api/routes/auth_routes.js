const express = require("express");
const Router = express.Router();

const { register, login } = require("../controllers/auth_controllers");

Router.route("/signup").post(register);
Router.route("/login").post(login);

module.exports = Router;
