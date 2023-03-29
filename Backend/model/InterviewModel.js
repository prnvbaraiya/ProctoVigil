const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
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
    },
    duration: {
      type: Number,
    },
    studentNames: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        interviewTime: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const InterviewModel = mongoose.model("Interview", InterviewSchema);
module.exports = InterviewModel;
