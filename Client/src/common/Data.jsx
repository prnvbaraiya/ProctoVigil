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
  {
    href: "/stream",
    icon: <LiveTvIcon fontSize="small" />,
    title: "Stream",
  },
  {
    href: "/phase",
    icon: <AutorenewIcon fontSize="small" />,
    title: "Change Phase",
  },
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
    href: "/quiz",
    icon: <LibraryBooksIcon fontSize="small" />,
    title: "Quiz",
  },
  {
    href: "/stream",
    icon: <LiveTvIcon fontSize="small" />,
    title: "Stream",
  },
  {
    href: "/phase",
    icon: <AutorenewIcon fontSize="small" />,
    title: "Change Phase",
  },
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
