const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      //only has single field
      type: String,
      required: true,
      unique: true,
      trim: true, //to avoide spaces
      minlength: 3, //has to be 3 charecters in the username
    },
  },
  {
    timestamps: true, //to know when it was created and modified
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
