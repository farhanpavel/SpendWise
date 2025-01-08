const express = require("express");
const {
  taskGet,
  taskPost,
  taskGetByCategory,
  taskGetByDate,
  taskPut,
  taskDelete,
  taskGetById,
} = require("../controllers/taskController");

const taskRouter = express.Router();
taskRouter.get("/", taskGet);
taskRouter.put("/:id", taskPut);
taskRouter.delete("/:id", taskDelete);
taskRouter.post("/", taskPost);
taskRouter.get("/:name/:date", taskGetByCategory);
taskRouter.get("/data/all/:date", taskGetByDate);
taskRouter.get("/data/alldata/id/:id", taskGetById);
module.exports = taskRouter;
