import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context";
import { getQuestionToDatabase } from "../../functions/axiosFunctions";
import { SocketContext } from "./../../context";

export default function QuizMain() {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { listid } = useParams();
  const socket = useSocket();
  const [questionCount, setQuestionCount] = useState(null);
  const [timer, setTimer] = useState(null);

  const listener = function (data) {
    setUsers(data);
  };

  useEffect(() => {
    socket.emit("createRoom", listid);
    socket.on("userInfo", listener);
    fetchQuestions();
    socket.on("question", (data) => {
      console.log("questions", data);
    });
    socket.on("scoreTable", (data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (questions.length - 1 < questionCount) {
      return console.log("soru bitmitir");
    }
    if (questions.length > 0) {
      setTimer(questions[questionCount].time);
      socket.emit("showQuestions", questions[questionCount]);
    }
  }, [questionCount]);

  useEffect(() => {
    if (timer === null) {
      return;
    }
    if (timer === 0) {
      setTimer(null);
      socket.emit("questionend", true);
      return;
    }
    const intervalId = setInterval(() => {
      console.log(timer);
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  const fetchQuestions = async () => {
    const questionsResponse = await getQuestionToDatabase(listid);
    setQuestions(questionsResponse);
  };

  const startQuizButton = async () => {
    setQuestionCount(0);
  };

  const nextQuestionButton = () => {
    setQuestionCount(questionCount + 1);
  };

  return (
    <div>
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
    </div>
  );
}
