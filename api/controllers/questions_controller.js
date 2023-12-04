const MCQQuestion = require("../models/Questions_schema");
const Test_model = require("../models/Test_model");

const get_all = async (req, res) => {
  try {
    const { topic, subtopic } = req.params;
    MCQQuestion.aggregate([
      { $match: { "topics.name": topic } },
      { $unwind: "$topics" },
      { $match: { "topics.subtopics.name": subtopic } },
      { $unwind: "$topics.subtopics" },
      { $match: { "topics.subtopics.name": subtopic } },
      {
        $project: {
          _id: 0, // Exclude the _id field from the response
          // correctOptionIndices: "$topics.subtopics.correctOptionIndices", // Project the correctOptionIndices field
          questions: "$topics.subtopics.questions", // Project the questions array
        },
      },
    ]).then((result) => {
      if (result.length > 0) {
        const selectedSubtopic = result;
        return res.json(selectedSubtopic);
      } else {
        return res.status(404).json({ error: "Topic or subtopic not found" });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};
const ans_match = async (req, res) => {
  try {
    const { selectedOptions } = req.body;
    const { topic, subtopic } = req.params;
    const { email, id } = req.user;
    MCQQuestion.aggregate([
      { $match: { "topics.name": topic } },
      { $unwind: "$topics" },
      { $match: { "topics.subtopics.name": subtopic } },
      { $unwind: "$topics.subtopics" },
      { $match: { "topics.subtopics.name": subtopic } },
      {
        $project: {
          _id: 0, // Exclude the _id field from the response
          correctOptionIndices: "$topics.subtopics.correctOptionIndices", // Project the correctOptionIndices field
        },
      },
    ]).then(async (result) => {
      if (result.length > 0) {
        const correct = result[0].correctOptionIndices;
        let score = 0;
        if (
          selectedOptions.includes(null) ||
          correct.length !== selectedOptions.length
        ) {
          return res.status(400).json({
            msg: "Please attempt all questions before submitting",
          });
        }
        for (let i = 0; i < correct.length; i++) {
          if (correct[i] === selectedOptions[i]) {
            score += 1;
          }
        }
        const final_score = (score / correct.length) * 100;
        const new_entry = await Test_model.create({
          test_by: id,
          score: final_score,
          email: email,
          topic: topic,
          subtopic: subtopic,
        });
        return res.status(200).json({ final_score, correct });
      } else {
        return res.status(404).json({ error: "Topic or subtopic not found" });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const add_que = async (req, res) => {
  try {
    const { topic, subtopic, question, correct } = req.body;
    let correct_ind = 0;
    if (correct === "a") {
      correct_ind = 0;
    } else if (correct === "b") {
      correct_ind = 1;
    } else if (correct === "c") {
      correct_ind = 2;
    } else if (correct === "d") {
      correct_ind = 3;
    } else {
      return res
        .status(400)
        .json({ message: "Please enter correct value for correct answer" });
    }
    const { options } = { ...req.body };
    let options_arr = [];
    for (let i = 1; i <= 4; i++) {
      options_arr.push(options[`opt${i}`]);
    }
    MCQQuestion.findOne({ _id: "64ddef5adfb18cb38daedbcf" })
      .then((mcqQuestion) => {
        if (!mcqQuestion) {
          // Handle if no document found
          console.log("no doc found");
          return;
        }
        let topicObj = mcqQuestion.topics.find((t) => t.name === topic);
        if (!topicObj) {
          return res.status(400).json({ message: "Topic does not exists" });
        }
        let subtopicObj = topicObj.subtopics.find((st) => st.name === subtopic);
        if (!subtopicObj) {
          return res.status(400).json({ message: "Subtopic does not exists" });
        }
        // const correctIndex = correct; // Assuming correct is a single value representing the correct index
        const newQuestion = {
          questionText: question,
          options: options_arr,
        };
        subtopicObj.questions.push(newQuestion);
        subtopicObj.correctOptionIndices.push(correct_ind); // Add correct index to correctOptionIndices
        mcqQuestion
          .save()
          .then(() => {
            // Data saved successfully
            console.log("saved");
            return res
              .status(200)
              .json({ message: "Question added successfully" });
          })
          .catch((saveErr) => {
            console.log("saveErr", saveErr);
            // Handle save error
          });
      })
      .catch((err) => {
        console.log("// Handle error while querying", err);
      });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const add_topic_subtopic_que = async (req, res) => {
  try {
    const { topic, topic_icon, subtopic, subtopic_icon, question, correct } =
      req.body;
    if (!topic_icon || !subtopic_icon) {
      return res
        .status(400)
        .json({ message: "Please select svg for both topic and subtopic" });
    }
    let correct_ind = 0;
    if (correct === "a") {
      correct_ind = 0;
    } else if (correct === "b") {
      correct_ind = 1;
    } else if (correct === "c") {
      correct_ind = 2;
    } else if (correct === "d") {
      correct_ind = 3;
    } else {
      return res
        .status(400)
        .json({ message: "Please enter correct value for correct answer" });
    }
    const { options } = { ...req.body };
    let options_arr = [];
    for (let i = 1; i <= 4; i++) {
      options_arr.push(options[`opt${i}`]);
    }
    MCQQuestion.findOne({ _id: "64ddef5adfb18cb38daedbcf" })
      .then((mcqQuestion) => {
        if (!mcqQuestion) {
          // Handle if no document found
          console.log("no doc found");
          return res.status(404).json({ error: "Document not found" });
        }

        const existingTopic = mcqQuestion.topics.find(
          (t) => t.name === topic.toLowerCase()
        );
        if (existingTopic) {
          return res.status(400).json({ error: "Topic already exists" });
        }

        const topicObj = {
          name: topic.toLowerCase(),
          topic_icon: topic_icon,
          subtopics: [],
        };

        // const existingSubtopic = topicObj.subtopics.find(
        //   (st) => st.name === subtopic
        // );
        // if (existingSubtopic) {
        //   return res.status(400).json({ error: "Subtopic already exists" });
        // }

        const subtopicObj = {
          name: subtopic.toLowerCase(),
          questions: [],
          subtopic_icon: subtopic_icon,
          correctOptionIndices: [],
        };
        const newQuestion = {
          questionText: question,
          options: options_arr,
        };
        subtopicObj.questions.push(newQuestion);
        subtopicObj.correctOptionIndices.push(correct_ind);
        topicObj.subtopics.push(subtopicObj);
        mcqQuestion.topics.push(topicObj);

        mcqQuestion
          .save()
          .then(() => {
            console.log("saved");
            return res
              .status(200)
              .json({ message: "Topic and subtopic created successfully" });
          })
          .catch((saveErr) => {
            console.log("saveErr", saveErr);
            return res.status(500).json({ error: "Error saving data" });
          });
      })
      .catch((err) => {
        console.log("Error while querying", err);
        return res.status(500).json({ error: "Error while querying" });
      });
  } catch (err) {
    console.log(err);
    res, status(400).json({ error: err.messge });
  }
};

const add_subtopic_que = async (req, res) => {
  try {
    const { topic, subtopic, subtopic_icon, question, correct } = req.body;
    if (!subtopic_icon) {
      return res
        .status(400)
        .json({ message: "Please select svg for subtopic" });
    }
    let correct_ind = 0;
    if (correct === "a") {
      correct_ind = 0;
    } else if (correct === "b") {
      correct_ind = 1;
    } else if (correct === "c") {
      correct_ind = 2;
    } else if (correct === "d") {
      correct_ind = 3;
    } else {
      return res
        .status(400)
        .json({ message: "Please enter correct value for correct answer" });
    }
    const { options } = { ...req.body };
    let options_arr = [];
    for (let i = 1; i <= 4; i++) {
      options_arr.push(options[`opt${i}`]);
    }
    MCQQuestion.findOne({ _id: "64ddef5adfb18cb38daedbcf" })
      .then((mcqQuestion) => {
        if (!mcqQuestion) {
          // Handle if no document found
          console.log("no doc found");
          return res.status(404).json({ error: "Document not found" });
        }

        const existingTopic = mcqQuestion.topics.find(
          (t) => t.name === topic.toLowerCase()
        );
        if (!existingTopic) {
          return res.status(400).json({ error: "Topic not found" });
        }

        const existingSubtopic = existingTopic.subtopics.find(
          (st) => st.name === subtopic.toLowerCase()
        );
        if (existingSubtopic) {
          return res.status(400).json({ error: "Subtopic already exists" });
        }
        const subtopicObj = {
          name: subtopic.toLowerCase(),
          questions: [],
          subtopic_icon: subtopic_icon,
          correctOptionIndices: [],
        };
        const newQuestion = {
          questionText: question,
          options: options_arr,
        };
        subtopicObj.questions.push(newQuestion);
        subtopicObj.correctOptionIndices.push(correct_ind);
        existingTopic.subtopics.push(subtopicObj);

        mcqQuestion
          .save()
          .then(() => {
            // Data saved successfully
            console.log("saved");
            return res
              .status(200)
              .json({ message: "Subtopic added successfully" });
          })
          .catch((saveErr) => {
            console.log("saveErr", saveErr);
            return res.status(500).json({ error: "Error saving data" });
          });
      })
      .catch((err) => {
        console.log("Error while querying", err);
        return res.status(500).json({ error: "Error while querying" });
      });
  } catch (err) {
    console.log(err);
    res, status(400).json({ error: err.messge });
  }
};
module.exports = {
  get_all,
  ans_match,
  add_que,
  add_topic_subtopic_que,
  add_subtopic_que,
};
