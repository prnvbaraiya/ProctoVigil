const mongoose = require("mongoose");

const PaymentCourseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courses: {
      type: Array,
      default: [],
    },
    paymentMethodData: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentCourseModel = mongoose.model("PaymentCourse", PaymentCourseSchema);
module.exports = PaymentCourseModel;
