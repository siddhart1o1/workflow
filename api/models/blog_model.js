const mongoose = require("mongoose");

const blog_model = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  by: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USERS",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const BlogSchema = mongoose.model("BlogSchema", blog_model);

module.exports = BlogSchema;
