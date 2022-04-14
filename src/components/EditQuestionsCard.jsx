import React from "react";

export default function QuestionsCard({ question, deleteQuestion, setDeleteQuestion }) {
  const addDeleteList = (e) => {
    if (e.target.checked) {
      return setDeleteQuestion([...deleteQuestion, question._id]);
    }
    const removeList = deleteQuestion.filter((id) => id !== question._id);
    return setDeleteQuestion(removeList);
  };

  return (
    <div>
      <li>
        {question.question}
        <input type={"checkbox"} onChange={(e) => addDeleteList(e)}></input>
      </li>
      {question.options.map((option) => {
        return <li>{option.optionsContent}</li>;
      })}
    </div>
  );
}
