const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema(
  {
    QuizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    students: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        answerKey: [],
        studentAnswer: [],
        totalMarks: Number,
      },
    ],
  },
  { timestamps: true }
);

const QuizResultModel = mongoose.model("QuizResult", QuizResultSchema);
module.exports = QuizResultModel;
