const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Disconnected");
  });
app.listen(PORT, () => {
  console.log(`App is Listening On Port ${PORT}`);
});
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("hello");
});
