const { QuizSubscriptionPoint, PaymentCourse } = require("../model/model.js");
const { constants } = require("../utils/index.js");

const ERROR_CODE = constants.ERROR_CODE;
const SUCCESS_CODE = constants.SUCCESS_CODE;
const plans = constants.plans;

const TeacherUser = {
  register: async (req, res) => {
    try {
      const data = req.body;
      const tmp = await QuizSubscriptionPoint.create(data);
      return res
        .status(SUCCESS_CODE)
        .send("Quiz Subscription Point Added Successfully");
    } catch (err) {
      return res
        .status(ERROR_CODE)
        .send("Quiz Subscription Point Adding Error: " + err);
    }
  },
  getByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      var quizPoints = await QuizSubscriptionPoint.findOne({
        user_id: id,
      }).populate("user_id", "firstName lastName email");
      if (!quizPoints || quizPoints.length == 0) {
        quizPoints = await QuizSubscriptionPoint.create({ user_id: id });
      }
      return res.status(SUCCESS_CODE).send(quizPoints);
    } catch (err) {
      console.log(err);
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      const tmp = await QuizSubscriptionPoint.findByIdAndUpdate(data._id, data);
      if (!tmp) {
        await QuizSubscriptionPoint.create(data);
      }
      return res
        .status(SUCCESS_CODE)
        .send("Quiz Subscription Point Updated Successfully");
    } catch (err) {
      console.log(err);
      return res
        .status(ERROR_CODE)
        .send("Quiz Subscription Point Update Error: " + err);
    }
  },
};

const QuizSubscriptionPayment = {
  register: async (req, res) => {
    try {
      const data = req.body;
      const tmp = await PaymentCourse.create(data);
      for (let course of data.courses) {
        let planId = course.id;
        const plan = plans.find((p) => p.id === planId);
        const quizPoints = await QuizSubscriptionPoint.findOne({
          user_id: data.user_id,
        });
        plan.data.quizPoint = plan.data.quizPoint || 0 + quizPoints.quizPoint;
        await QuizSubscriptionPoint.findByIdAndUpdate(
          quizPoints._id,
          plan.data
        );
      }
      return res
        .status(SUCCESS_CODE)
        .send("Quiz Subscription Payment Updated Successfully");
    } catch (err) {
      console.log(err);
      return res
        .status(ERROR_CODE)
        .send("Quiz Subscription Payment Update Error: " + err);
    }
  },
};

module.exports = { TeacherUser, QuizSubscriptionPayment };
