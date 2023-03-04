const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 32,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    personName: {
      type: Array,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
    phase: {
      type: String,
      required: true,
      default: "init",
    },
  },
  { timestamps: true }
);

const QuizModel = mongoose.model("Quiz", QuizSchema);
module.exports = QuizModel;
