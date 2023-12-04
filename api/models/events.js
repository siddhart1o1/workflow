const mongoose = require("mongoose");

const event_modal = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
});

const EventSchema = mongoose.model("EventSchema", event_modal);

module.exports = EventSchema;
