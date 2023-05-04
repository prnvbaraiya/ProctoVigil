require("dotenv").config();

const ERROR_CODE = 500;
const SUCCESS_CODE = 202;

const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || "";
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || "";
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || "";
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || "";

const videoStoringPath = "storage";
const driveFolderName = "Procto Vigil";

const plans = [
  {
    id: "c4a4363f-1128-43d0-ba32-5d0132f37302",
    title: "Online Proctorign System",
    points: 5,
    price: "600",
    data: { quizPoint: 5 },
    description:
      "By online Proctoirng you can take exams from anywhere with student being anywhere in the world. Take your exams outside of just a classroom with help this product. This system will allow you to add tests as and customize them as your need and proctor your students from anywhere.",
  },
  {
    id: "549d961b-1f07-46fa-b7d6-5ff94d188465",
    title: "Online Proctorign System",
    points: 10,
    data: { quizPoint: 10 },
    price: "1000",
    description:
      "By online Proctoirng you can take exams from anywhere with student being anywhere in the world. Take your exams outside of just a classroom with help this product. This system will allow you to add tests as and customize them as your need and proctor your students from anywhere.",
  },
  {
    id: "603f8af0-694c-49ce-a7cf-a8489843122f",
    title: "AI Analyzation",
    price: "1999",
    data: { aiAnalyzation: true },
    description:
      "This AI Analyzation will help you analyze candidates recordings for potential cheating. Get access for 30 days with one purchase.",
  },
];

constants = {
  ERROR_CODE,
  SUCCESS_CODE,
  driveClientId,
  driveClientSecret,
  driveRedirectUri,
  driveRefreshToken,
  videoStoringPath,
  driveFolderName,
  plans,
};

module.exports = constants;
