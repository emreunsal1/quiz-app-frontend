import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "./../../context";
import { useInterval } from "./../../hooks/timer";

export default function WaitingRoom() {
  const [isStart, setIsStart] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [isanswer, setIsAnswer] = useState(false);
  const [result, setResult] = useState(null);
  const [scoreList, setScoreList] = useState([]);
  const { username } = useParams();

  const onEnd = () => {
    setIsStart(false);
  };

  const { timer, setTimer } = useInterval(onEnd);

  const socket = useSocket();
  useEffect(() => {
    socket.on("question", (data) => {
      console.log(data);
      setQuestion(data);
      setTimer(data.time);
      if (data) {
        setIsStart(true);
        setIsAnswer(false);
      }
    });
    socket.on("result", (data) => setResult(data));
    socket.on("gameEnded", (data) => setScoreList(data));
    return () => socket.removeAllListeners();
  }, []);

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
      {timer}
      {!isStart && <p>hoşgeldin {username} hocanın sınavı başlatması bekleniyor</p>}
      {isStart && (
        <div>
          soru 1 :
          {!isanswer && (
            <ul>
              <li>{questions.question}</li>
              {questions.options.map((option) => (
                <li>
                  {option.optionsContent} <input type="radio" name="option" onClick={() => sendAnswer(option)} />
                </li>
              ))}
            </ul>
          )}
          {result !== null && <div>{result ? "cevabınız doğru efenim" : "cevabınız yanlış efenim"}</div>}
        </div>
      )}
    </div>
  );
}
