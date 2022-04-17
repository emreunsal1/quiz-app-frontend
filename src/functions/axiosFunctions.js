import axios from "axios";
import { io } from "socket.io-client";
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
  return response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

export const createList = async (listName, description) => {
  const response = await instance.post("/list/", {
    name: listName,
    description: description,
  });
  return response;
};

export const deleteListToDatabase = async (listId) => {
  await instance.delete(`/list/${listId}`);
  return true;
};

export const createQestionToDatabase = async (question) => {
  const response = await instance.post("/question/add", {
    question: question,
  });
  return response.data;
};

export const deleteQuestionsToDatabase = async (questionsId) => {
  const response = await instance.delete(`/question/delete/${questionsId}`);
};

export const getQuestionToDatabase = async (listId) => {
  const response = await instance.get(`/question/${listId}`);
  return response.data;
};

export const editListInfo = async (listId, title, description) => {
  const response = await instance.put(`/list/${listId}`, {
    title: title,
    description: description,
  });
  return response.data;
};
