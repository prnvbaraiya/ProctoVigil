import Mongoose from "mongoose";

const QuizSchema = new Mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const QuizModel = Mongoose.model("Quiz", QuizSchema);
export default QuizModel;
