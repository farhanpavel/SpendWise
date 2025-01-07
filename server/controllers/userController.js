const mongoose = require("mongoose");

const { userSchema } = require("../models/userSchema");
const User = mongoose.model("user", userSchema);
const userGet = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json("Error on user get request");
  }
};

const userPost = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json("Error on user post request");
  }
};

module.exports = {
  userGet,
  userPost,
};
