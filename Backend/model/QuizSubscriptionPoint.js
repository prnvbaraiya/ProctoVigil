const mongoose = require("mongoose");

const QuizSubscriptionPointSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizPoint: {
      type: Number,
      default: 0,
    },
    aiAnalyzation: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const QuizSubscriptionPointModel = mongoose.model(
  "QuizSubscriptionPoint",
  QuizSubscriptionPointSchema
);
module.exports = QuizSubscriptionPointModel;
