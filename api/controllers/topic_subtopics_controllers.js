const mongoose = require("mongoose");
const MCQQuestion = require("../models/Questions_schema");

const get_topic = async (req, res) => {
  try {
    const topics = await MCQQuestion.find({})
      .then((questions) => {
        const TopicsandSubtopics = [];

        questions.forEach((question) => {
          question.topics.forEach((topic) => {
            const topicInfo = {
              id: topic._id,
              name: topic.name,
              topic_icon: topic.topic_icon,
              subtopics: topic.subtopics.map((subtopic) => ({
                name: subtopic.name,
                subtopic_icon: subtopic.subtopic_icon,
              })),
            };
            TopicsandSubtopics.push(topicInfo);
          });
        });

        res.status(200).json({ TopicsandSubtopics });
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(400).json({ error });
      });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const get_specific_subtopic = async (req, res) => {
  try {
    const { topic } = req.params; // Replace with the desired topic name
    const req_topic = topic;
    MCQQuestion.findOne({
      /* your query to find the topic */
    })
      .then((mcqQuestion) => {
        if (!mcqQuestion) {
          // Handle if no document found
          console.log("no doc found");
          return res.status(404).json({ error: "Document not found" });
        }

        const targetTopic = mcqQuestion.topics.find(
          (topic) => topic.name === req_topic
        );

        if (!targetTopic) {
          return res.status(400).json({ error: "Target topic not found" });
        }

        const subtopicsOfTargetTopic = targetTopic.subtopics.map(
          (subtopic) => ({
            name: subtopic.name,
            id: subtopic._id,
            subtopic_icon: subtopic.subtopic_icon,
          })
        );

        res.status(200).json({ subtopicsOfTargetTopic });
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Error while querying" });
      });
  } catch (error) {
    console.log(error);
  }
};

const delete_topic = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    console.log(topicId);
    const mcqQuestion = await MCQQuestion.findOne({});

    // Find the topic by its ID
    // const topic = mcqQuestion.topics.id(topicId);
    const topicIndex = mcqQuestion.topics.findIndex((topic) =>
      topic._id.equals(topicId)
    );
    if (topicIndex === -1) {
      return res.status(404).json({ message: "Topic not found" });
    }
    console.log(topicIndex);

    mcqQuestion.topics.splice(topicIndex, 1);

    await mcqQuestion.save();

    res.json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error("Error deleting topic:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the topic" });
  }
};
const delete_subtopic = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const subtopicId = req.params.topicId;
    const findtopic = req.body.topic;

    // Find the MCQQuestion document
    const mcqQuestion = await MCQQuestion.findOne({});

    if (!mcqQuestion) {
      return res
        .status(404)
        .json({ message: "MCQQuestion document not found" });
    }

    // Find the topic by its ID
    // Find the topic by its name
    const topic = mcqQuestion.topics.find((topic) => topic.name === findtopic);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Find the subtopic index by its ID
    const subtopicIndex = topic.subtopics.findIndex((subtopic) =>
      subtopic._id.equals(subtopicId)
    );

    if (subtopicIndex === -1) {
      return res.status(404).json({ message: "Subtopic not found" });
    }

    // Remove the subtopic using the index
    topic.subtopics.splice(subtopicIndex, 1);

    // Save the updated document
    await mcqQuestion.save();
    res.json({ message: "Subtopic deleted successfully" });
  } catch (error) {
    console.error("Error deleting topic:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the topic" });
  }
};

const delete_question = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionIndex, index, subtopicIndex } = req.body;
    MCQQuestion.findOne({
      "topics._id": id,
      "topics.subtopics._id": subtopicIndex,
    })
      .then((doc) => {
        if (!doc) {
          res.json("Document not found.");
          return;
        }

        // Find the specific question within the subtopic
        // const subtopic = doc.topics[0].subtopics.id(subtopicIndex);
        // const question = subtopic.questions.id(questionIndex);

        // if (!question) {
        //   console.error("Question not found.");
        //   return;
        // }

        // // Remove the question from the subtopic's questions array
        // subtopic.questions.pull(question);

        // const correctOptionIndices = subtopic.correctOptionIndices;
        // if (index >= 0 && index < correctOptionIndices.length) {
        //   correctOptionIndices.splice(index, 1);
        // }
        // console.log(correctOptionIndices);
        // Save the updated document
        let foundSubtopic = null;
        let foundQuestion = null;

        // Loop through topics to find the correct one
        for (const topic of doc.topics) {
          foundSubtopic = topic.subtopics.id(subtopicIndex);
          if (foundSubtopic) {
            foundQuestion = foundSubtopic.questions.id(questionIndex);
            if (foundQuestion) {
              break; // Exit the loop once the correct question is found
            }
          }
        }
        if (!foundSubtopic || !foundQuestion) {
          res.json("Subtopic or question not found.");
          return;
        }

        // Remove the question from the subtopic's questions array
        foundSubtopic.questions.pull(foundQuestion);

        const correctOptionIndices = foundSubtopic.correctOptionIndices;
        if (index >= 0 && index < correctOptionIndices.length) {
          correctOptionIndices.splice(index, 1);
        }
        return doc.save();
      })
      .then(() => {
        res.json("Question deleted successfully.");
      })
      .catch((err) => {
        res.json("Error:", err);
      });
  } catch (error) {
    console.log(error);
  }
};

const update_topic = async (req, res) => {
  try {
    console.log(req.body);
    const { topic, id } = req.body;
    const mcqQuestion = await MCQQuestion.findOne({});

    if (!mcqQuestion) {
      return res
        .status(404)
        .json({ message: "MCQQuestion document not found" });
    }
    const findtopic = mcqQuestion.topics.id(id);

    if (!findtopic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    console.log(findtopic);
  } catch (error) {
    console.error("Error deleting topic:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the topic" });
  }
};
const update_subtopic = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.error("Error deleting topic:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the topic" });
  }
};

const get_all_subtopic_que = async (req, res) => {
  try {
    const topicId = req.params.id;
    const mcqQuestion = await MCQQuestion.findOne({});

    if (!mcqQuestion) {
      return res
        .status(404)
        .json({ message: "MCQQuestion document not found" });
    }

    // Find the topic by its ID
    const topic = mcqQuestion.topics.id(topicId);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Create an array of subtopics along with their questions
    const subtopicsWithQuestions = topic.subtopics.map((subtopic) => ({
      name: subtopic.name,
      subtopic_icon: subtopic.subtopic_icon,
      correctOptionIndices: subtopic.correctOptionIndices,
      questions: subtopic.questions,
      _id: subtopic._id,
    }));
    res.json({
      topic: topic.name,
      topic_icon: topic.topic_icon,
      subtopicsWithQuestions,
    });
  } catch (error) {
    console.log(error);
  }
};

const update_full = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTopicData = req.body;
    const mcqQuestion = await MCQQuestion.findOne({});
    if (!mcqQuestion) {
      return res
        .status(404)
        .json({ message: "MCQQuestion document not found" });
    }
    const topic = mcqQuestion.topics.id(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    topic.name = updatedTopicData.name || topic.name;
    topic.topic_icon = updatedTopicData.topic_icon || topic.topic_icon;
    topic.subtopics = updatedTopicData.subtopicsWithQuestions;
    await mcqQuestion.save();

    return res.json(topic);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  get_topic,
  get_specific_subtopic,
  delete_topic,
  delete_subtopic,
  delete_question,
  update_topic,
  update_subtopic,
  get_all_subtopic_que,
  update_full,
};
