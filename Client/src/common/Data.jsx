import React from "react";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import PaymentsIcon from "@mui/icons-material/Payments";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const ERROR_CODE = 500;
export const SUCCESS_CODE = 202;

export const userRoles = [
  { title: "Admin", value: "admin" },
  { title: "Teacher", value: "teacher" },
  { title: "Student", value: "student" },
];

export const adminSidebarItems = [
  {
    href: "/dashboard",
    icon: <SignalCellularAltIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/payment-records",
    icon: <ReceiptIcon fontSize="small" />,
    title: "Payment Records",
  },
  {
    href: "/user",
    icon: <PersonIcon fontSize="small" />,
    title: "User",
  },
  {
    href: "/quiz",
    icon: <LibraryBooksIcon fontSize="small" />,
    title: "Quiz",
  },
  {
    href: "/interview",
    icon: <VideoChatIcon fontSize="small" />,
    title: "Interview",
  },
  // {
  //   href: "/subscriptionPlan",
  //   icon: <VideoChatIcon fontSize="small" />,
  //   title: "Subscription Plans",
  // },
  {
    href: "/stream",
    icon: <LiveTvIcon fontSize="small" />,
    title: "Stream",
  },
  // {
  //   href: "/phase",
  //   icon: <AutorenewIcon fontSize="small" />,
  //   title: "Change Phase",
  // },
  {
    href: "/result",
    icon: <EmojiEventsIcon fontSize="small" />,
    title: "Result",
  },
  {
    href: "/recording",
    icon: <VideoLibraryIcon fontSize="small" />,
    title: "Recording",
  },
  {
    href: "/ai-analyzer",
    icon: <PersonIcon fontSize="small" />,
    title: "AI Analyzer",
  },
  {
    href: "/feedback",
    icon: <InsertEmoticonIcon fontSize="small" />,
    title: "Feedback",
  },
  {
    href: "/settings",
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
  },
];

export const teacherSidebarItems = [
  {
    href: "/dashboard",
    icon: <SignalCellularAltIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/user",
    icon: <PersonIcon fontSize="small" />,
    title: "Student",
  },
  {
    href: "/payment-history",
    icon: <PaymentIcon fontSize="small" />,
    title: "Payment History",
  },
  {
    href: "/quiz",
    icon: <LibraryBooksIcon fontSize="small" />,
    title: "Quiz",
  },
  {
    href: "/interview",
    icon: <VideoChatIcon fontSize="small" />,
    title: "Interview",
  },
  {
    href: "/stream",
    icon: <LiveTvIcon fontSize="small" />,
    title: "Stream",
  },
  // {
  //   href: "/phase",
  //   icon: <AutorenewIcon fontSize="small" />,
  //   title: "Change Phase",
  // },
  {
    href: "/result",
    icon: <EmojiEventsIcon fontSize="small" />,
    title: "Result",
  },
  {
    href: "/recording",
    icon: <VideoLibraryIcon fontSize="small" />,
    title: "Recording",
  },
  {
    href: "/ai-analyzer",
    icon: <PersonIcon fontSize="small" />,
    title: "AI Analyzer",
    require: "aiAnalyzation",
  },
  {
    href: "/payment",
    icon: <PaymentsIcon fontSize="small" />,
    title: "Payment",
  },
  {
    href: "/settings",
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
  },
];

export const homeMenuItem = [
  { title: "Home", link: "/" },
  { title: "Quiz", link: "/quiz" },
  { title: "Interviews", link: "/interview" },
  { title: "About Us", link: "/about-us" },
  { title: "Contact Us", link: "/contact-us" },
  // { title: "Test Page", link: "/test" },
];

export const adminMenuItem = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "setting", link: "admin/settings" },
];

export const teacherMenuItem = [
  { title: "Dashboard", link: "/teacher/dashboard" },
  { title: "setting", link: "teacher/settings" },
];

export const userMenuItem = [];

export const quizPhase = [
  { value: "init", title: "Initial" },
  { value: "start", title: "Start" },
  { value: "end", title: "End" },
  { value: "result", title: "Result" },
];

export const questionTypes = [
  { value: "singleChoice", title: "Single Choice" },
  { value: "multipleChoice", title: "Multiple Choice" },
  { value: "boolean", title: "True or False" },
];

export const plans = [
  {
    id: "c4a4363f-1128-43d0-ba32-5d0132f37302",
    title: "Online Proctorign System",
    points: 5,
    price: "600",
    description:
      "By online Proctoirng you can take exams from anywhere with student being anywhere in the world. Take your exams outside of just a classroom with help this product. This system will allow you to add tests as and customize them as your need and proctor your students from anywhere.",
  },
  {
    id: "549d961b-1f07-46fa-b7d6-5ff94d188465",
    title: "Online Proctorign System",
    points: 10,
    price: "1000",
    description:
      "By online Proctoirng you can take exams from anywhere with student being anywhere in the world. Take your exams outside of just a classroom with help this product. This system will allow you to add tests as and customize them as your need and proctor your students from anywhere.",
    addOns: [
      {
        id: "603f8af0-694c-49ce-a7cf-a8489843122f",
        title: "AI Analyzation",
        price: "1999",
        description:
          "This AI Analyzation will help you analyze candidates recordings for potential cheating. Get access for 30 days with one purchase.",
      },
    ],
  },
];
