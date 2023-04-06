const mongoose = require("mongoose");

const UserRecordingSchema = new mongoose.Schema(
  {
    quiz_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    students: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        driveLink: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserRecordingModel = mongoose.model("UserRecording", UserRecordingSchema);
module.exports = UserRecordingModel;
