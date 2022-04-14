import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateQestion from "./CreateQestion";
import QuestionsCard from "./EditQuestionsCard";
import { getQuestionToDatabase, deleteQuestionsToDatabase } from "./../functions/axiosFunctions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function QuestionWrapper({}) {
  const [questions, setQuestions] = useState([]);
  const [deleteQuestion, setDeleteQuestion] = useState([]);
  const [isAddQuestions, setIsAddQuestions] = useState(false);
  const { listid } = useParams();
  const history = useHistory();
  useEffect(() => {}, [deleteQuestion]);

  const getQuestions = async () => {
    const response = await getQuestionToDatabase(listid);
    setQuestions(response);
  };

  const deleteButtonOnclick = async () => {
    const response = await deleteQuestionsToDatabase(deleteQuestion);
  };

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div>
      <button onClick={deleteButtonOnclick}>delete</button>
      <button onClick={() => history.push(`/quiz/${listid}`)}>Start Quiz</button>
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
