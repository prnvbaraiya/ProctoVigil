const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requied: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      requied: true,
    },
    subject: {
      type: String,
      requied: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);
module.exports = FeedbackModel;
