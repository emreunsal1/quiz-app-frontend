import axios from "axios";
import { getToken, removeToken } from "./storage";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});
instance.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.authorization = "Bearer " + token;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401) {
      removeToken();
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export const userLoginController = async (username, password) => {
  try {
    const response = await instance.post("/auth/login", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const createNewUser = async (username, password) => {
  try {
    const response = await instance.post("/auth/register", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getList = async () => {
  const response = await instance.get("/list");
  console.log(response.data);
  return response.data;
};

export const createList = async (listName) => {
  const response = await instance.post("/list/new", {
    name: listName,
  });
  return response.data;
};

export const deleteListToDatabase = async (listId) => {
  const response = await instance.delete(`/list/delete/${listId}`);
  return true;
};

export const createQestionToDatabase = async (question) => {
  const response = await instance.post("/question/add", {
    question: question,
  });
  return response.data;
};

export const deleteQuestionsToDatabase = async (questionsId) => {
  console.log(questionsId);
  const response = await instance.delete(`/question/delete/${questionsId}`);
  console.log(response);
};

export const getQuestionToDatabase = async (listId) => {
  const response = await instance.get(`/question/${listId}`);
  return response.data;
};
