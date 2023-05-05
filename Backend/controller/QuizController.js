const {
  QuizResultModel,
  QuizModel,
  UserModel,
  UserRecordingModel,
  InterviewModel,
  QuizSubscriptionPoint,
} = require("../model/model.js");
const { constants } = require("../utils/index");

const ERROR_CODE = constants.ERROR_CODE;
const SUCCESS_CODE = constants.SUCCESS_CODE;

const Quiz = {
  quizDelete: async (quizIds) => {
    try {
      const userRec = await UserRecordingModel.deleteMany({
        quiz_id: { $in: quizIds },
      });
      const quizRes = await QuizResultModel.deleteMany({
        quiz_id: { $in: quizIds },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  add: async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.author });
    const data = { ...req.body, author: user._id };
    var quizPoints = await QuizSubscriptionPoint.findOne({
      user_id: user._id,
    });
    quizPoints.quizPoint = quizPoints.quizPoint - 1;
    await quizPoints.save();
    try {
      await QuizModel.create(data);
      return res.status(SUCCESS_CODE).send("Quiz Created Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      // const quizzes = await QuizModel.find({ startDate: { $gt: Date.now() } })
      const quizzes = await QuizModel.find()
        .sort({ name: 1 })
        .populate({
          path: "author",
          select: "firstName lastName",
        })
        .populate({
          path: "studentNames",
          select: "username",
        });
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const quiz = await QuizModel.findById(id)
        .populate("author", "firstName lastName")
        .populate("studentNames", "username");
      return res.status(SUCCESS_CODE).send(quiz);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const quizzes = await QuizModel.find({ studentNames: id }).populate(
        "author",
        "firstName lastName email"
      );
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      await QuizModel.findByIdAndUpdate(data._id, data);
      return res.status(SUCCESS_CODE).send("Quiz Updated Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const data = await QuizModel.findByIdAndDelete(req.body.id);
      Quiz.quizDelete([req.body.id]);
      return res.status(SUCCESS_CODE).send("Quiz Deleted Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
};

const TeacherQuiz = {
  quizDelete: async (quizIds) => {
    try {
      const userRec = await UserRecordingModel.deleteMany({
        quiz_id: { $in: quizIds },
      });
      const quizRes = await QuizResultModel.deleteMany({
        quiz_id: { $in: quizIds },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  add: async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.author });
    const data = { ...req.body, author: user._id };
    var quizPoints = await QuizSubscriptionPoint.findOne({
      user_id: user._id,
    });
    console.log(quizPoints);
    try {
      await QuizModel.create(data);
      return res.status(SUCCESS_CODE).send("Quiz Created Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      const teacherId = req.params.userId;
      // const quizzes = await QuizModel.find({ startDate: { $gt: Date.now() } })
      const quizzes = await QuizModel.find({ author: teacherId })
        .sort({ name: 1 })
        .populate({
          path: "author",
          select: "firstName lastName",
        })
        .populate({
          path: "studentNames",
          select: "username",
        });
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const quiz = await QuizModel.findById(id)
        .populate("author", "firstName lastName")
        .populate("studentNames", "username");
      return res.status(SUCCESS_CODE).send(quiz);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const quizzes = await QuizModel.find({ studentNames: id }).populate(
        "author",
        "name email"
      );
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      await QuizModel.findByIdAndUpdate(data._id, data);
      return res.status(SUCCESS_CODE).send("Quiz Updated Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const data = await QuizModel.findByIdAndDelete(req.body.id);
      Quiz.quizDelete([req.body.id]);
      return res.status(SUCCESS_CODE).send("Quiz Deleted Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
};

const Interview = {
  interviewDelete: async (quizIds) => {
    try {
      const userRec = await UserRecordingModel.deleteMany({
        quiz_id: { $in: quizIds },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  add: async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.author });
    const data = { ...req.body, author: user._id };
    try {
      await InterviewModel.create(data);
      return res.status(SUCCESS_CODE).send("Interview Created Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      // const quizzes = await QuizModel.find({ startDate: { $gt: Date.now() } })
      const interviews = await InterviewModel.find()
        .sort({ name: 1 })
        .populate({
          path: "author",
          select: "firstName lastName",
        })
        .populate({
          path: "studentNames.user_id",
          select: "username",
        });
      return res.status(SUCCESS_CODE).send(interviews);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const interview = await InterviewModel.findById(id)
        .populate({
          path: "author",
          select: "firstName lastName",
        })
        .populate({
          path: "studentNames.user_id",
          select: "username",
        });
      return res.status(SUCCESS_CODE).send(interview);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const interviews = await InterviewModel.find({
        "studentNames.user_id": id,
      }).populate("author", "firstName lastName");
      return res.status(SUCCESS_CODE).send(interviews);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      await InterviewModel.findByIdAndUpdate(data._id, data);
      return res.status(SUCCESS_CODE).send("Interview Updated Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const data = await InterviewModel.findByIdAndDelete(req.body.id);
      Interview.interviewDelete([req.body.id]);
      return res.status(SUCCESS_CODE).send("Interview Deleted Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
};

const QuizResult = {
  add: async (req, res) => {
    try {
      const { quiz_id, totalMarks, students } = req.body;

      // Find the quiz result document by QuizId
      let quizResult = await QuizResultModel.findOne({ quiz_id });

      // If the document does not exist, create a new one
      if (!quizResult) {
        quizResult = new QuizResultModel({ quiz_id, totalMarks });
      }

      // Iterate through the students and add or update the quiz result
      const {
        username,
        answerKey,
        studentAnswer,
        obtainedMarks,
        warningCount,
      } = students;

      // Find the user by username
      const user = await UserModel.findOne({ username });

      if (user) {
        // Check if the student already has a quiz result in the document
        const existingStudent = quizResult.students.find(
          (s) => s.user.toString() === user._id.toString()
        );

        if (existingStudent) {
          // Update the existing quiz result
          existingStudent.answerKey = answerKey;
          existingStudent.studentAnswer = studentAnswer;
          existingStudent.obtainedMarks = obtainedMarks;
          existingStudent.warningCount = warningCount;
        } else {
          // Add a new quiz result for the student
          quizResult.students.push({
            user: user._id,
            answerKey,
            studentAnswer,
            obtainedMarks,
            warningCount,
          });
        }
      }

      await QuizModel.updateOne(
        { _id: quiz_id },
        { $pull: { studentNames: user._id } }
      );

      // Save the quiz result document
      await quizResult.save();

      res.status(SUCCESS_CODE).send("Quiz result added successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      const quizzes = await QuizResultModel.find().populate({
        path: "quiz_id",
        select: "name",
      });
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const quiz = await QuizResultModel.findOne({ quiz_id: id }).populate({
        path: "students.user",
        select: "username firstName lastName",
      });
      return res.status(SUCCESS_CODE).send(quiz);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  sendResultMail: async (req, res) => {
    try {
      const quizResults = await QuizResultModel.findOne(req.body)
        .populate("students.user", "username firstName lastName email")
        .populate("quiz_id", "name");

      const { totalMarks, students } = quizResults;

      for (const { user, obtainedMarks } of students) {
        MailingSystem.sendMail({
          to: user.email,
          subject: "Result Notification",
          template: "exam-result",
          context: {
            name: `${user.firstName} ${user.lastName}`,
            QuizTitle: quizResults.quiz_id.name,
            obtainedMarks,
            totalMarks,
          },
        });
      }

      return res.status(SUCCESS_CODE).send(quizResults);
    } catch (err) {
      console.error(err);
      return res.status(ERROR_CODE).send(`There is some error: ${err}`);
    }
  },
  updateMarks: async (req, res) => {
    const { quiz_id, user_id, obtainedMarks } = req.body;
    try {
      quizres = await QuizResultModel.findOne({
        quiz_id,
      });
      for (var i = 0; i < quizres.students.length; i++) {
        if (quizres.students[i].user.toString() === user_id) {
          quizres.students[i].obtainedMarks = obtainedMarks;
        }
      }
      quizres.save();
      return res.status(SUCCESS_CODE).send("Marks Updated Successfully");
    } catch (err) {
      console.log(err);
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const quizResults = await QuizResultModel.findOne({
        quiz_id: req.body.quiz_id,
      });

      quizResults.students = quizResults.students.filter(
        (item) => item.user.toString() !== req.body._id
      );
      await quizResults.save();

      return res
        .status(SUCCESS_CODE)
        .send("User Response Removed Successfully");
    } catch (err) {
      console.error(err);
      return res.status(ERROR_CODE).send(`There is some error: ${err}`);
    }
  },
};

module.exports = { Quiz, TeacherQuiz, Interview, QuizResult };
