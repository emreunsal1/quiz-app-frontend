import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function KeyLogin() {
  const [loginKey, setLoginKey] = useState("");
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.on("connection", (data) => {});
  }, []);

  const buttonOnclick = () => {
    socket.current.emit("joinRoom", loginKey);
    socket.current.on("cevap", (data) => console.log(data));
    socket.current.on("cevap1", (data) => console.log("cevap1 :" + data));
  };
  return (
    <div>
      <input placeholder="key login" onChange={(e) => setLoginKey(e.target.value)}></input>
      <button onClick={buttonOnclick}>Login</button>
      <button
        onClick={() => {
          socket.current.emit("cevap1", "cevap");
        }}
      >
        refresh
      </button>
    </div>
  );
}
