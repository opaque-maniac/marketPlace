const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const StaffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

StaffSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (error, encrypted) {
    user.password = encrypted;
    next();
  });
});

module.exports = mongoose.model("Staff", StaffSchema);
