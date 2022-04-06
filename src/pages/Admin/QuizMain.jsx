import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context";
import { getQuestionToDatabase } from "../../functions/axiosFunctions";
import { SocketContext } from "./../../context";
import { useInterval } from "./../../hooks/timer";

export default function QuizMain() {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { listid } = useParams();
  const socket = useSocket();
  const [questionCount, setQuestionCount] = useState(null);
  const [endQuestion, setEndQuestion] = useState(false);

  const listener = function (data) {
    console.log(data);
    setUsers(data);
  };
  const onEnd = () => {
    setEndQuestion(true);
    socket.emit("questionend", true);
  };
  const { timer, setTimer } = useInterval(onEnd);
  useEffect(() => {
    fetchQuestions();
    socket.emit("createRoom", listid);
    socket.on("userInfo", listener);
    socket.on("question", (data) => {
      console.log("questions", data);
    });
    socket.on("scoreTable", (data) => {
      setUsers(data.sort((a, b) => b.score - a.score));
    });
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setEndQuestion(false);
      setTimer(questions[questionCount].time);
      socket.emit("showQuestions", questions[questionCount]);
    }
  }, [questionCount]);

  const fetchQuestions = async () => {
    const questionsResponse = await getQuestionToDatabase(listid);
    setQuestions(questionsResponse);
  };

  const startQuizButton = async () => {
    setQuestionCount(0);
  };

  const nextQuestionButton = () => {
    if (questions.length - 1 < questionCount) {
      return setEndQuestion(true);
    }
    setQuestionCount(questionCount + 1);
  };

  const endQuiz = () => {
    if (users.length > 0) {
      setUsers([]);
      return socket.emit("disconnectedRoom", true);
    }
    console.log("odada kimse yok askım");
  };

  return (
    <div>
      {timer}
      <button onClick={endQuiz}>Sınavı bitir</button>
      burasi öğretmen socket açtı
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
      <button disabled={!questions.length} onClick={startQuizButton}>
        sınavı başlat
      </button>
      <button onClick={nextQuestionButton}>Sonraki soru</button>
      <div style={{ display: endQuestion ? "block" : "none" }}>
        <ul>
          {endQuestion &&
            users.map((user) => {
              return (
                <li>
                  {user.name}
                  <br />
                  {user.score}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
