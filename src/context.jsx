import { createContext, useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const socket = io("ws://localhost:3001");

export const useSocket = () => {
  return useContext(SocketContext);
};
