import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateQestion from "./CreateQestion";
import QuestionsCard from "./QuestionsCard";
import { getQuestionToDatabase, deleteQuestionsToDatabase } from "./../functions/axiosFunctions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Table } from "antd";

export default function QuestionWrapper({}) {
  const [questions, setQuestions] = useState([]);
  const [deleteQuestion, setDeleteQuestion] = useState([]);
  const [isAddQuestions, setIsAddQuestions] = useState(false);
  const { listid } = useParams();
  const history = useHistory();

  const getQuestions = async () => {
    const response = await getQuestionToDatabase(listid);
    setQuestions(response);
  };

  const multipleDeleteButtonOnclick = async () => {
    await deleteQuestionsToDatabase(deleteQuestion);
    const newList = questions.filter((question) => !deleteQuestion.includes(question._id));
    setQuestions(newList);
    setDeleteQuestion([]);
  };

  const deleteOneQuestion = async (questionId) => {
    await deleteQuestionsToDatabase(questionId);
    const newList = questions.filter((question) => question._id !== questionId);
    setQuestions(newList);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div>
      <button onClick={multipleDeleteButtonOnclick}>delete</button>
      <button onClick={() => history.push(`/quiz/${listid}`)}>Start Quiz</button>
      <QuestionsCard
        questions={questions}
        deleteQuestion={deleteQuestion}
        setDeleteQuestion={setDeleteQuestion}
        deleteOneQuestion={deleteOneQuestion}
      />
      <div onClick={() => setIsAddQuestions(true)}>Add Question</div>
      <div>{isAddQuestions && <CreateQestion listid={listid} />}</div>
    </div>
  );
}
