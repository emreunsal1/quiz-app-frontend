import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

function Socket() {
  const [teacName, setTeacName] = useState("");
  const [teachPassword, setTeachPassword] = useState("");
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:3001/");
    socket.current.on("studentJoined", (data) => {});
    socket.current.on("roomCreated", (data) => {
      console.log("roomCreated", data);
    });
  }, []);

  const buttonOnClick = async () => {
    socket.current.emit("joinRoom", {
      name: name,
      roomKey: roomId,
    });
    socket.current.emit(roomId, io.to(data.roomKey).emit("detail", await fetcDetails()));
  };

  const requestAxios = () => {
    socket.current.emit("createRoom", {
      roomKey: "123456",
    });
  };

  return (
    <div className="App">
      <div className="teach-login">
        <h2>Öğretmen girişi </h2>
        <input id="teach-name" placeholder="nmae" onChange={(e) => setTeacName(e.target.value)} />
        <input id="password" placeholder="password" onChange={(e) => setTeachPassword(e.target.value)} />
        <button id="SLogin-button" onClick={requestAxios}>
          Login
        </button>
      </div>
      <div className="student">
        <h2>öğrenci girişi </h2>
        <input id="student-name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input id="room-id" placeholder="room id" onChange={(e) => setRoomId(e.target.value)} />
        <button id="SLogin-button" onClick={buttonOnClick}>
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
