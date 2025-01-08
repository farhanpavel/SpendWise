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
const taskGetByCategory = async (req, res) => {
  try {
    const taskData = await Task.find({
      category: req.params.name,
      date: req.params.date,
    });
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json("Error on user get request");
  }
};
const taskGetByDate = async (req, res) => {
  try {
    const taskData = await Task.find({
      date: req.params.date,
    });
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json("Error on user get request");
  }
};
const taskGetById = async (req, res) => {
  try {
    const taskData = await Task.findOne({
      _id: req.params.id,
    });
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
const taskPut = async (req, res) => {
  try {
    const taskData = await Task.updateOne(
      { _id: req.params.id },
      {
        $set: {
          amount: req.body.amount,
          purpose: req.body.purpose,
        },
      }
    );
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json("Error on user Put request");
  }
};
const taskDelete = async (req, res) => {
  try {
    const taskData = await Task.deleteOne({ _id: req.params.id });
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json("Error on user Delete request");
  }
};

module.exports = {
  taskGet,
  taskPost,
  taskGetByCategory,
  taskGetByDate,
  taskPut,
  taskDelete,
  taskGetById,
};
