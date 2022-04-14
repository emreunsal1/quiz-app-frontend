import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context";
import { getQuestionToDatabase } from "../../functions/axiosFunctions";
import { useInterval } from "./../../hooks/timer";
import Timer from "../../components/Timer";
import { Button, Typography } from "antd";
import UserList from "./../../components/UserList";
import AnswerAnlysis from "./../../components/AnswerAnlysis";

export default function QuizMain() {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { listid } = useParams();
  const socket = useSocket();
  const [questionCount, setQuestionCount] = useState(null);
  const [endQuestion, setEndQuestion] = useState(false);
  const [answerAnlys, setAnswerAnlys] = useState([]);
  const isQuizFinished = questions.length - 1 == questionCount;

  const listener = function (data) {
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
    socket.on("answerInfo", (data) => {
      setAnswerAnlys((state) => [...state, data]);
    });
    socket.on("question", (data) => {});
    socket.on("scoreTable", (data) => {
      setUsers(data.sort((a, b) => b.score - a.score));
    });
    return () => socket.removeAllListeners();
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
    setQuestionCount(questionCount + 1);
  };

  const endQuiz = () => {
    if (users.length > 0) {
      return socket.emit("disconnectedRoom", true);
    }
    console.log("odada kimse yok askım");
  };

  return (
    <div>
      <Timer time={timer} />

      {questionCount === null && (
        <>
          <Typography>Kullanıcılar Bekleniyor</Typography>
          <UserList userList={users} isScore={false} />
          <Button onClick={startQuizButton} disabled={!questions.length || !users.length}>
            Sınavı Başlat
          </Button>
        </>
      )}
      {endQuestion && (
        <div>
          <Button onClick={isQuizFinished ? endQuiz : nextQuestionButton}> {isQuizFinished ? "Sınavı Birit" : "Next Question"}</Button>
          <UserList userList={users} isScore={true} />
          {endQuestion && <AnswerAnlysis options={questions[questionCount].options} answers={answerAnlys} />}
        </div>
      )}
    </div>
  );
}
