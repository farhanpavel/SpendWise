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
    type: Date,
    default: Date.now,
  },
});
module.exports = { limitSchema };
