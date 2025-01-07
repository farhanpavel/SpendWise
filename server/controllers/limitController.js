const mongoose = require("mongoose");

const { limitSchema } = require("../models/limitSchema");
const Limit = mongoose.model("limit", limitSchema);
const limitGet = async (req, res) => {
  try {
    const limitData = await Limit.find();
    res.status(200).json(limitData);
  } catch (err) {
    res.status(500).json("Error on limit get request");
  }
};

const limitPost = async (req, res) => {
  try {
    const { category, date } = req.body;

    const existingLimit = await Limit.findOne({ category, date });
    if (existingLimit) {
      return res
        .status(400)
        .json({ message: "Category already set for the selected day" });
    }

    const limitData = await Limit.create(req.body);
    res.status(200).json(limitData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error on limit post request", error: err.message });
  }
};

module.exports = {
  limitGet,
  limitPost,
};