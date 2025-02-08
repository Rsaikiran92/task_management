const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
require("dotenv").config();


const registerUser = async (req, res) => {
  {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

const loginUser = async (req, res) => {
  {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.header("Authorization", token).send({ token });
  }
};

//  getAllUser
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Get user by Id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the user." });
  }
};

// DELETE REQUEST
const removeUser = async (req, res) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The user" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  removeUser,
  loginUser,
  registerUser
};
