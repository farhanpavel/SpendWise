const express = require("express");
const {
  taskGet,
  taskPost,
  taskGetByCategory,
  taskGetByDate,
} = require("../controllers/taskController");

const taskRouter = express.Router();
taskRouter.get("/", taskGet);
taskRouter.post("/", taskPost);
taskRouter.get("/:name/:date", taskGetByCategory);
taskRouter.get("/data/all/:date", taskGetByDate);

module.exports = taskRouter;
