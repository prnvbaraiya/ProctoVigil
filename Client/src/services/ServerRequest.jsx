import axios from "axios";
import { Navigate } from "react-router-dom";
import auth from "../auth/auth";
import { SERVER_LINK } from "../variables/constants";

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
    console.log(err.response.status);
  }
};

const UserService = {
  get: async () => {
    return sendRequest("get", "user");
  },
  getStudents: async () => {
    return sendRequest("get", "student");
  },
  getById: async (id) => {
    return sendRequest("get", "user/" + id);
  },
  set: async (data) => {
    return sendRequest("post", "user", data);
  },
  update: async (data) => {
    return sendRequest("put", "user", data);
  },
  delete: async (data) => {
    return sendRequest("delete", "user", data);
  },
};

const QuizService = {
  get: () => {
    return sendRequest("get", "quiz");
  },
  getById: (id) => {
    return sendRequest("get", "quiz/" + id);
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

const JWTService = {
  generateToken: (data) => {
    return sendRequest("post", "generateToken", data);
  },
};

export { UserService, QuizService, JWTService };
