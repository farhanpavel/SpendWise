const express = require("express");
const {
  limitGet,
  limitPost,
  limitGetByCategory,
  limitGetByDate,
} = require("../controllers/limitController");

const limitRouter = express.Router();
limitRouter.get("/", limitGet);
limitRouter.post("/", limitPost);
limitRouter.get("/:name/:date", limitGetByCategory);
limitRouter.get("/data/all/:date", limitGetByDate);
module.exports = limitRouter;
