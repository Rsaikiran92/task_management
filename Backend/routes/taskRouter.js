const express = require("express");
const { taskModel } = require("../model/taskModel");


const taskRouter = express.Router();

taskRouter.post("/task", async (req, res) => {
  try {
    const task = new taskModel(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.get("/task", async (req, res) => {
  try {
    const task = await taskModel.find({ userId: req.body.userId });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.patch("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, ...updateData } = req.body;
    const task = await taskModel.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

exports.taskRouter = taskRouter;
