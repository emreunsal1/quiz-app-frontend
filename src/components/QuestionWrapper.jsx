import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateQestion from "./CreateQestion";
import QuestionsCard from "./QuestionsCard";
import { getQuestionToDatabase, deleteQuestionsToDatabase } from "./../functions/axiosFunctions";
import { loginSocket } from "./../functions/socketFunctions";

export default function QuestionWrapper({}) {
  const [questions, setQuestions] = useState([]);
  const [deleteQuestion, setDeleteQuestion] = useState([]);
  const [isAddQuestions, setIsAddQuestions] = useState(false);
  const { listid } = useParams();
  useEffect(() => {
    console.log(deleteQuestion);
  }, [deleteQuestion]);

  const getQuestions = async () => {
    const response = await getQuestionToDatabase(listid);
    setQuestions(response);
  };

  const deleteButtonOnclick = async () => {
    const response = await deleteQuestionsToDatabase(deleteQuestion);
  };

  const startButtonOnClick = async () => {
    loginSocket(listid);
  };

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div>
      <button onClick={deleteButtonOnclick}>delete</button>
      <button onClick={startButtonOnClick}>Start Quiz</button>
      <ul>
        {questions.map((question) => (
          <QuestionsCard key={question._id} question={question} deleteQuestion={deleteQuestion} setDeleteQuestion={setDeleteQuestion} />
        ))}
      </ul>
      <div onClick={() => setIsAddQuestions(true)}>Add Question</div>
      <div>{isAddQuestions && <CreateQestion listid={listid} />}</div>
    </div>
  );
}
