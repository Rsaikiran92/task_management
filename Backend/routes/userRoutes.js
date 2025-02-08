const express = require("express");
const userRouter = express.Router();
const {
  getAllUser,
  getUserById,
  removeUser,
  loginUser,
  registerUser,
} = require("../controllers/userController");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", removeUser);

module.exports = userRouter;
