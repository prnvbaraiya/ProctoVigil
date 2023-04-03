import axios from "axios";
import auth from "../auth/auth";
import { SERVER_LINK } from "../common/constants";

const sendRequest = async (type, link, data = null) => {
  const config = {
    method: type,
    url: SERVER_LINK + link,
    headers: {
      Authorization: auth.getToken(),
    },
    ...(data && { data }),
  };
  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    alert("Server: " + err.message);
    console.log("PRNV AXIOS ERROR:", err);
  }
};

const UserService = {
  get: async () => {
    return sendRequest("get", "user");
  },
  getStudents: async () => {
    return sendRequest("get", "student");
  },
  find: async (data) => {
    return sendRequest("post", "user/find", data);
  },
  set: async (data) => {
    return sendRequest("post", "user", data);
  },
  setStudents: async (data) => {
    return sendRequest("post", "users", data);
  },
  update: async (data) => {
    return sendRequest("put", "user", data);
  },
  delete: async (data) => {
    return sendRequest("delete", "user", data);
  },
  deleteUsers: async (data) => {
    return sendRequest("delete", "users", data);
  },
};

const QuizService = {
  get: () => {
    return sendRequest("get", "quiz");
  },
  getById: (id) => {
    return sendRequest("get", "quiz/" + id);
  },
  getByUserId: (id) => {
    return sendRequest("get", "quiz/user/" + id);
  },
  set: (data) => {
    return sendRequest("post", "quiz", data);
  },
  update: (data) => {
    return sendRequest("put", "quiz", data);
  },
  delete: (data) => {
    return sendRequest("delete", "quiz", data);
  },
};

const InterviewService = {
  get: () => {
    return sendRequest("get", "interview");
  },
  getById: (id) => {
    return sendRequest("get", "interview/" + id);
  },
  getByUserId: (id) => {
    return sendRequest("get", "interview/user/" + id);
  },
  set: (data) => {
    return sendRequest("post", "interview", data);
  },
  update: (data) => {
    return sendRequest("put", "interview", data);
  },
  delete: (data) => {
    return sendRequest("delete", "interview", data);
  },
};

const QuizResultService = {
  get: () => {
    return sendRequest("get", "quiz-result");
  },
  getById: (id) => {
    return sendRequest("get", "quiz-result/" + id);
  },
  set: (data) => {
    return sendRequest("post", "quiz-result", data);
  },
  update: (data) => {
    return sendRequest("put", "quiz-result", data);
  },
  deleteUserResponse: (data) => {
    return sendRequest("delete", "quiz-result/student", data);
  },
  sendMail: (data) => {
    return sendRequest("post", "quiz-result/send-mail", data);
  },
};

const FeedbackService = {
  get: () => {
    return sendRequest("get", "feedback");
  },
  getById: (id) => {
    return sendRequest("get", "feedback/" + id);
  },
  set: (data) => {
    return sendRequest("post", "feedback", data);
  },
};

const UserRecordingService = {
  set: async (data) => {
    const type = "post";
    const link = "user-recording";

    const config = {
      method: type,
      url: SERVER_LINK + link,
      headers: {
        Authorization: auth.getToken(),
      },
      data,
    };

    try {
      const res = await axios(config);
      return res;
    } catch (err) {
      // alert("Server Error:", JSON.stringify(err));
      console.log("PRNV AXIOS ERROR:", err);
    }
  },
  get: async () => {
    return sendRequest("get", "user-recording");
  },
  getFile: async (data) => {
    return sendRequest("post", "user-recording/file-path", data);
  },
};

const JWTService = {
  generateToken: (data) => {
    return sendRequest("post", "generateToken", data);
  },
};

export {
  UserService,
  QuizService,
  InterviewService,
  QuizResultService,
  FeedbackService,
  UserRecordingService,
  JWTService,
};
