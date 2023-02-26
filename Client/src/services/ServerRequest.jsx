import axios from "axios";
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
  return await axios(config);
};

const User = {
  getUsers: async () => {
    return sendRequest("get", "users");
  },
  getStudents: async () => {
    return sendRequest("get", "users");
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
    console.log(data);
    return sendRequest("delete", "quiz", data);
  },
};

export { User, QuizService };
