const mongoose = require("mongoose");

const { taskSchema } = require("../models/taskSchema");
const Task = mongoose.model("task", taskSchema);
const taskGet = async (req, res) => {
  try {
    const taskData = await Task.find();
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json("Error on user get request");
  }
};

const taskPost = async (req, res) => {
  try {
    const taskData = await Task.create(req.body);
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json("Error on user post request");
  }
};

module.exports = {
  taskGet,
  taskPost,
};
