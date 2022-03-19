import { io } from "socket.io-client";

export const loginSocket = (quizId) => {
  const socket = io("ws://localhost:3001");
  socket.emit("createRoom", quizId);
  socket.on("cevap", (data) => console.log(data));
  socket.on("cevap1", (data) => console.log("cevap1 :" + data));
};
