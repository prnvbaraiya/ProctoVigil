const mongoose = require("mongoose");
const QuizModel = require("./QuizModel");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("remove", async function (next) {
  try {
    await QuizModel.deleteMany({ author: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
