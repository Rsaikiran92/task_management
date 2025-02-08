const express = require("express");
const taskRouter = express.Router();
const authMiddleware = require("../middleware/authenticate.middleware");
const {
  findTask,
  createNewTask,
  updateTask,
  removeTask,
} = require("../controllers/taskController");

taskRouter.use(authMiddleware);
taskRouter.get("/",findTask)
taskRouter.post("/",createNewTask);
taskRouter.patch("/:id",updateTask)
taskRouter.delete("/:id",removeTask);

module.exports = taskRouter;
