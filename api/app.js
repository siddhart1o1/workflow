const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const connect = require("./connect/connect_db");
const auth_routes = require("./routes/auth_routes");
const question_routes = require("./routes/questions_routes");
const user_routes = require("./routes/user_routes");
const interviewer_routes = require("./routes/interviewer_routes");
const topic_subtopics_routes = require("./routes/topic_subtopic_routes");
const blog_routes = require("./routes/blog_routes");
const event_routes = require("./routes/event_routes");
const chat_routes = require("./routes/chat_routes");
const mssg_routes = require("./routes/mssg_routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: [
      "https://react-helmet.ibrcloud.com",
      "http://localhost:5173",
      "https://interview-prep-red.vercel.app",
    ],
  })
);

app.use("/api/v1/interview-prep/auth", auth_routes);
app.use("/api/v1/interview-prep/questions", question_routes);
app.use("/api/v1/interview-prep/user", user_routes);
app.use("/api/v1/interview-prep/interviewer", interviewer_routes);
app.use("/api/v1/interview-prep/topic-subtopic", topic_subtopics_routes);
app.use("/api/v1/interview-prep/blog", blog_routes);
app.use("/api/v1/interview-prep/event", event_routes);
app.use("/api/v1/interview-prep/chat", chat_routes);
app.use("/api/v1/interview-prep/mssg", mssg_routes);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`app listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
