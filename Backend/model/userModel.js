const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
  date: { type: Date, default: Date.now },
});

const userModel = mongoose.model("users", userSchema);

exports.userModel = userModel;
