import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "./../../context";

export default function WaitingRoom() {
  const [isStart, setIsStart] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [isanswer, setIsAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState(null);
  const { username } = useParams();
  let count = 0;

  const socket = useSocket();

  socket.on("question", (data) => {
    setQuestion(data);
    count = data.time;
    const intervalId = setInterval(() => {
      console.log(count);
      setTimer(count);
      count = count - 1;
      if (count === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
    if (data) {
      setIsStart(true);
      setIsAnswer(false);
    }
  });

  socket.on("result", (data) => setResult(data));

  const sendAnswer = (answer) => {
    setResult(null);
    const answerInfo = {
      answer: answer,
      timer: timer,
    };
    socket.emit("answer", answerInfo);
    setIsAnswer(true);
  };

  return (
    <div>
      <p style={{ display: !isStart ? "block" : "none" }}>hoşgeldin {username} hocanın sınavı başlatması bekleniyor</p>
      <div style={{ display: !isStart ? "none" : "block" }}>
        soru 1 :
        <ul style={{ display: isanswer ? "none" : "block" }}>
          {isStart && <li>{questions.question}</li>}
          {isStart &&
            questions.options.map((option) => (
              <li>
                {option.optionsContent} <input type={"radio"} name="option" onClick={() => sendAnswer(option)} />
              </li>
            ))}
        </ul>
        <div style={{ display: result !== null ? "block" : "none" }}>
          {result === true ? "cevabınız doğru efenim" : "cevabınız yanlış efenim"}
        </div>
      </div>
    </div>
  );
}
