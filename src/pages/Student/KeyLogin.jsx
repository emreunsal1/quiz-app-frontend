import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "../../context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function KeyLogin() {
  const [loginKey, setLoginKey] = useState("6220baf5a9cc131e400ee20a");
  const [userName, setUserName] = useState("");
  const socket = useSocket();
  const history = useHistory();

  const buttonOnclick = () => {
    socket.emit("joinRoom", { name: userName, roomKey: loginKey });
    socket.on("errorMessage", (message) => {
      console.log(message);
    });
    socket.on("isLogin", (data) => {
      if (data) {
        history.push(`/waitingRoom/${userName}`);
      }
    });
  };

  return (
    <div>
      <input placeholder="key login" value={loginKey} onChange={(e) => setLoginKey(e.target.value)}></input>
      <input placeholder="User Name" onChange={(e) => setUserName(e.target.value)}></input>
      <button onClick={buttonOnclick}>Login</button>
    </div>
  );
}
