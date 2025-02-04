const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required:true },
  date: { type: Date, default: Date.now() },
  userId: String,
});

const taskModel = mongoose.model("tasks", taskSchema);

exports.taskModel = taskModel;
