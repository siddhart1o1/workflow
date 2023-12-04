const Chat = require("../models/Chat_model");

const new_chat = async (req, res) => {
  try {
    const existingChat = await Chat.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    if (existingChat) {
      res.status(200).json(existingChat);
    } else {
      const new_convo = await Chat.create({
        members: [req.body.senderId, req.body.receiverId],
      });
      res.json(new_convo);
    }
  } catch (error) {
    console.log(error);
  }
};

const get_chat = async (req, res) => {
  try {
    const userId = req.user.id;
    const convo = await Chat.find({
      members: { $in: [userId] },
    });
    // const convo = await Chat.distinct("members", { members: userId });
    res.json(convo);
  } catch (error) {
    console.log(error);
  }
};
const delete_chat = async (req, res) => {
  try {
    const { chat_id } = req.body;
    const deleted = await Chat.findByIdAndDelete({ _id: chat_id });
    res.json({ mssg: "Chat deleted", deleted });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { new_chat, get_chat, delete_chat };
