const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    const token = header.split(" ")[1];
    const verify = await jwt.verify(token, process.env.JWT);
    if (verify) {
      req.user = verify;
    }
    // console.log(verify);
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = auth;
