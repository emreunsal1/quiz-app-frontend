import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionToDatabase } from "../functions/axiosFunctions";
import CreateQestion from "./CreateQestion";
import QuestionsCard from "./QuestionsCard";

export default function QuestionWrapper({}) {
  const [questions, setQuestions] = useState([]);
  const [isAddQuestions, setIsAddQuestions] = useState(false);
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
      <ul>
        {questions.map((question) => (
          <QuestionsCard question={question} />
        ))}
      </ul>
      <div onClick={() => setIsAddQuestions(true)}>Add Question</div>
      <div>{isAddQuestions && <CreateQestion listid={listid} />}</div>
    </div>
  );
}
