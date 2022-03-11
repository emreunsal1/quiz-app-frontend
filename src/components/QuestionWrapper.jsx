import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionToDatabase } from "../functions/axiosFunctions";
import QuestionsCard from "./QuestionsCard";

export default function QuestionWrapper({}) {
  const [questions, setQuestions] = useState([]);
  const { listid } = useParams();

  const getQuestions = async () => {
    const response = await getQuestionToDatabase(listid);
    setQuestions(response);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div>
      {questions.map((question) => (
        <QuestionsCard question={question} />
      ))}
    </div>
  );
}
