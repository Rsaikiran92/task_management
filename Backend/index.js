const express = require("express");
const connection = require("./configs/db");
require("dotenv").config();
const cors = require("cors");


const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

app.use("/user", require("./routes/userRoutes"));
app.use("/task", require("./routes/taskRoutes"));

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Trouble connecting to the DB");
    console.log(err);
  }
});
