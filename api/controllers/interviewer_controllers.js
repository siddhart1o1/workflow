const Test_model = require("../models/Test_model");
const User = require("../models/User_schema");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

const scoreboard = async (req, res) => {
  try {
    if (req.user.role !== "Interviewer") {
      return res
        .status(400)
        .json({ message: "Not authorized to access this route" });
    }
    try {
      const result = await Test_model.aggregate([
        {
          $group: {
            _id: "$test_by",
            avgScore: { $avg: "$score" },
            maxScore: { $max: "$score" },
            minScore: { $min: "$score" },
            testCount: { $sum: 1 },
          },
        },
        {
          $sort: { avgScore: -1 },
        },
        {
          $lookup: {
            from: "users", // Change "users" to your actual collection name for users
            localField: "_id",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $project: {
            userId: "$_id",
            userName: "$userDetails.name", // Change "name" to the actual field name for user's name
            userEmail: "$userDetails.email",
            avgScore: 1,
            maxScore: 1,
            minScore: 1,
            testCount: 1,
            _id: 0,
          },
        },
      ]);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Error finding users by average score:", err);
      return res.status(400).json({ error: err.message });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const invite = async (req, res) => {
  const { email } = req.body;
  const ifmail = await User.findOne({ email: email });
  if (ifmail) {
    return res.status(400).send({
      msg: "User already exist with this email",
    });
  } else {
    // const token = tokenForInvitation({ email, role });
    const file = "./view/email_invitation.ejs";
    const subject = "Invitation For Registration";
    const message = { email: email };
    sendEmail(email, file, subject, message);
    return res.status(200).send({ msg: "Email sent successfully!" });
  }
};

const sendEmail = (email, file, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: process.env.SERVICE, //comment this line if you use custom server/domain
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    ejs.renderFile(file, message, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: process.env.MAIL_USERNAME,
          to: email,
          subject: subject,
          html: data,
        };
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            return console.log(err);
          } else {
            res.send("Message %s sent: %s", info.messageId, info.response);
            return;
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { scoreboard, invite };
