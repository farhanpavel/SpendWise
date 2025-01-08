const mongoose = require("mongoose");
const express = require("express");
const limitSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },

  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});
module.exports = { limitSchema };
