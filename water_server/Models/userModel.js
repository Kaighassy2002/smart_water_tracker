const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String
});

const Users = mongoose.model("users",userSchema)

module.exports = Users