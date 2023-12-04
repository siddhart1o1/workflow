const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
});

const subtopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  correctOptionIndices: [{ type: Number, required: true }],
  subtopic_icon: { type: String },
  questions: [questionSchema],
});

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topic_icon: { type: String },
  subtopics: [subtopicSchema],
});

const mcqQuestionSchema = new mongoose.Schema({
  topics: [topicSchema],
});

const MCQQuestion = mongoose.model("MCQQuestion", mcqQuestionSchema);

module.exports = MCQQuestion;
