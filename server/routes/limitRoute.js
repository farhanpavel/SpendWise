const express = require("express");
const { limitGet, limitPost } = require("../controllers/limitController");

const limitRouter = express.Router();
limitRouter.get("/", limitGet);
limitRouter.post("/", limitPost);

module.exports = limitRouter;
