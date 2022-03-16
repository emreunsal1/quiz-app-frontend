import React, { useState } from "react";
import { createQestionToDatabase } from "../functions/axiosFunctions";

export default function CreateQestion({ listid }) {
  const [questions, setQuestions] = useState([]);

  const addQestion = async (event) => {
    event.preventDefault();
    const form = event.target;
    const newQuestion = {
      listId: listid,
      question: form.question.value,
      options: [
        {
          optionsContent: form.options1.value,
          correct: form.option1Check.checked,
        },
        {
          optionsContent: form.options2.value,
          correct: form.option2Check.checked,
        },
        {
          optionsContent: form.options3.value,
          correct: form.option3Check.checked,
        },
        {
          optionsContent: form.options4.value,
          correct: form.option4Check.checked,
        },
      ],
      time: form.questionTime.value,
    };
    const response = await createQestionToDatabase(newQuestion);
    console.log(response);
  };
  return (
    <div>
      <form onSubmit={(e) => addQestion(e)}>
        <input placeholder="Question" name="question" />
        <ul>
          <li>
            <input placeholder="Options 1" name={"options1"}></input>
            <input name="option1Check" onChange={(e) => console.log(e.target.checked)} type={"checkbox"} />
          </li>
          <li>
            <input placeholder="Options 2" name={"options2"}></input>
            <input name="option2Check" type={"checkbox"} />
          </li>
          <li>
            <input placeholder="Options 3" name={"options3"}></input>
            <input name="option3Check" type={"checkbox"} />
          </li>
          <li>
            <input placeholder="Options 4" name={"options4"}></input>
            <input name="option4Check" type={"checkbox"} />
          </li>
        </ul>
        <select name="questionTime">
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
