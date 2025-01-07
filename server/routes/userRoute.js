const express = require("express");
const { userGet, userPost } = require("../controllers/userController");

const userRouter = express.Router();
userRouter.get("/", userGet);
userRouter.post("/", userPost);

module.exports = userRouter;
