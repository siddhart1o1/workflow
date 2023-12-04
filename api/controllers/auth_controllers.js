const user_model = require("../models/User_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(5);

const register = async (req, res) => {
  try {
    const { email, password } = req.body.form;
    const { role } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please provide email and password" });
    }
    const if_email = await user_model.find({ email: email });
    if (if_email.length != 0) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hash_pwd = await bcrypt.hashSync(password, salt);
    const user = await user_model.create({
      email,
      password: hash_pwd,
      role: role,
    });
    res.status(200).json({
      message: "user registered successfully",
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body.form;

    if (password.length === 0) {
      return res.status(400).json({ message: "password cannot be empty" });
    }
    const if_user = await user_model.find({
      $or: [{ email: email }],
    });
    if (if_user.length == 0) {
      return res.status(400).json({ message: "user does not exists" });
    }
    const if_pwd = await bcrypt.compareSync(password, if_user[0].password);
    if (!if_pwd) {
      return res.status(400).json({ message: "password don't match" });
    }
    const payload = {
      role: if_user[0].role,
      email: if_user[0].email,
      id: if_user[0]._id,
    };
    const token = jwt.sign(payload, process.env.JWT);
    res.status(200).json({
      message: "Login Successful",
      user: {
        email: if_user[0].email,
        role: if_user[0].role,
        id: if_user[0]._id,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = { register, login };
