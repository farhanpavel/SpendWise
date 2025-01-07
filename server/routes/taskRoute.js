const express = require("express");
const { taskGet, taskPost } = require("../controllers/taskController");

const taskRouter = express.Router();
taskRouter.get("/", taskGet);
taskRouter.post("/", taskPost);

module.exports = taskRouter;
