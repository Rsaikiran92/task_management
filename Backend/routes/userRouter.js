const express = require("express");
const { userModel } = require("../model/userModel");
var jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/user", async (req, res) => {
  try {
    var token = jwt.sign({ email: req.body.email }, "shhhhh");
    let user = new userModel(req.body);
    user.token = token;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ error: "failed to create account" });
  }
});

exports.userRouter = userRouter;
