import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserList from "../../components/UserList";
import { useSocket } from "./../../context";
import { useInterval } from "./../../hooks/timer";

export default function WaitingRoom() {
  const [isStart, setIsStart] = useState(false);
  const [question, setQuestion] = useState(null);
  const [isanswer, setIsAnswer] = useState(false);
  const [result, setResult] = useState(null);
  const [scoreList, setScoreList] = useState(null);
  const { username } = useParams();
  const history = useHistory();

  const onEnd = () => {
    setIsStart(false);
  };

  const { timer, setTimer } = useInterval(onEnd);

  const socket = useSocket();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      return history.push("/keylogin");
    }
    sessionStorage.setItem("isLoggedIn", true);
    socket.on("question", (data) => {
      setResult(null);
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
      {!scoreList && (
        <>
          {timer}
          {!isStart && !question && <p>hoşgeldin {username} hocanın sınavı başlatması bekleniyor</p>}
          {isStart && (
            <div>
              soru 1 :
              {!isanswer && (
                <ul>
                  <li>{question.question}</li>
                  {question.options.map((option) => (
                    <li>
                      {option.optionsContent} <input type="radio" name="option" onClick={() => sendAnswer(option)} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
      {result !== null && <div>{result ? "cevabınız doğru efenim" : "cevabınız yanlış efenim"}</div>}
      {scoreList && <UserList userList={scoreList} isScore />}
    </div>
  );
}
