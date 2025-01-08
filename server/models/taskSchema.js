const mongoose = require("mongoose");
const express = require("express");
const taskSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});
module.exports = { taskSchema };
