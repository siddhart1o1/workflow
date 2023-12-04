const router = require("express").Router();

const {
  get_topic,
  get_specific_subtopic,
  delete_topic,
  delete_subtopic,
  update_topic,
  update_subtopic,
  get_all_subtopic_que,
  update_full,
  delete_question,
} = require("../controllers/topic_subtopics_controllers");
const auth = require("../middleware/auth");

router.route("/get").get(get_topic);
router.route("/get/:topic").get(get_specific_subtopic);
router.route("/topic-delete/:topicId").delete(auth, delete_topic);
router.route("/subtopic-delete/:topicId").post(auth, delete_subtopic);
router.route("/delete-question/:id").post(delete_question);
router.route("/topic-update").patch(update_topic);
router.route("/topic-subtopic").patch(update_subtopic);
router.route("/list-all-subtopic-questions/:id").get(get_all_subtopic_que);
router.route("/update-whole/:id").put(update_full);

module.exports = router;
