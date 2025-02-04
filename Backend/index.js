const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRouter");
const { taskRouter } = require("./routes/taskRouter");

const app = express();

app.use(express.json());
app.use("/", userRouter);
app.use("/", taskRouter);

app.get("/", (req, res) => {
  res.send("welcome to server");
});

app.listen(8080, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://saikiran92rk:isUMj3HVHNYOgA23@cluster0.f6wkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to db");
  } catch (error) {
    console.error("not connected to db");
  }
  console.log("server started in 8080 port");
});
