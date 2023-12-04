const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
  },
  content: {
    type: String,
    trim: true,
  },
  conversationId: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
