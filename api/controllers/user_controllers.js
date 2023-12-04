const Test_model = require("../models/Test_model");
const Users = require("../models/User_schema");

const get_single_user = async (req, res) => {
  try {
    const { id, email } = req.user;
    const user = await Users.findOne({ _id: id });
    res.json(user);
  } catch (err) {
    res.status(400).json({ mssg: err.error });
  }
};

const get_users = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await Users.findOne({ _id: id });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const report = async (req, res) => {
  try {
    const { id, email } = req.user;
    const all_entry = await Test_model.find({ test_by: id }).sort({ date: -1 });
    const max = await Test_model.find({ test_by: id })
      .sort({ score: -1 })
      .limit(1);
    const min = await Test_model.find({ test_by: id })
      .sort({ score: 1 })
      .limit(1);
    const count = all_entry.length;
    let score = 0;
    let i = 0;
    while (count > i) {
      score += all_entry[i].score;
      i++;
    }
    const avg = (score / count).toFixed(3);

    res
      .status(200)
      .json({ all_entry, avg, count, max: max[0].score, min: min[0].score });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { report, get_users, get_single_user };
