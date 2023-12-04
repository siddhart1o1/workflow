const EventSchema = require("../models/events");

const add_event = async (req, res) => {
  try {
    const { title, date_time } = req.body;
    const selectedDateTime = new Date(date_time);
    const new_date = selectedDateTime.toDateString();
    const new_time = selectedDateTime.toLocaleTimeString();
    const new_event = await EventSchema.create({
      author: req.user.email,
      title,
      date: new_date,
      time: new_time,
    });
    res.status(200).json({ mssg: "Event Created", new_event });
  } catch (error) {
    console.log(error);
  }
};

const get_events = async (req, res) => {
  try {
    const events = await EventSchema.find({ author: req.user.email });
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
  }
};

const edit_events = async (req, res) => {
  try {
    const { id } = req.body;
    const edited = await EventSchema.updateOne({ _id: id }, { status: true });
    res.json({ message: "OK" });
  } catch (error) {
    res.json(error);
  }
};

const delete_event = async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await EventSchema.deleteOne({ _id: id });
    res.json({ message: "OK" });
  } catch (error) {}
};

module.exports = { add_event, get_events, edit_events, delete_event };
