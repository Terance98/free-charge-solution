const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  date: Date,
  description: String,
  withdraw: Number,
  deposit: Number,
  balance: { type: Number, min: 1000 },
});

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  account_number: Number,
  account_details: [accountSchema],
});

module.exports = mongoose.model("User", userSchema);
