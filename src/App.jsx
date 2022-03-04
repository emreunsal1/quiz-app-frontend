import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function App() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const socket = useRef();
  useEffect(() => {
    socket.current = io("http://localhost:3001/");
    socket.current.on("info", (data) => {
      console.log(data);
    });
  }, []);

  const buttonOnClick = () => {
    socket.current.emit("info", {
      name: name,
      roomKey: roomId,
    });
  };

  return (
    <div className="App">
      <h2>öğrenci girişi </h2>
      <input
        id="student-name"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        id="room-id"
        placeholder="room id"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button id="SLogin-button" onClick={buttonOnClick}>
        Login
      </button>
    </div>
  );
}

export default App;
