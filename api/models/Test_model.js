const mongoose = require("mongoose");

const test_schema = mongoose.Schema({
  test_by: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "USERS",
  },
  score: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  subtopic: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("tests", test_schema);
