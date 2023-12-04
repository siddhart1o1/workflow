const Message = require("../models/Message_model");

const add_mssg = async (req, res) => {
  try {
    const new_mssg = await Message.create(req.body);
    res.json(new_mssg);
  } catch (error) {
    console.log(error);
  }
};

const get_mssg = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
};

const delete_mssg = async (req, res) => {
  try {
    const { mssg_id } = req.body;
    const deleted = await Message.findByIdAndDelete({ _id: mssg_id });
    res.json({ mssg: "Message deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { add_mssg, get_mssg, delete_mssg };
