import React from "react";
import { useState, useEffect } from "react";

export default function AnswerAnlysis({ options, answers }) {
  const [_options, setOptions] = useState({});

  useEffect(() => {
    let aa = {};
    options.forEach((option) => {
      console.log(option);
      const bb = answers.filter((answer) => option.optionsContent === answer.optionsContent);
      aa[option.optionsContent] = bb.length;
    });
    setOptions(aa);
  }, []);

  return (
    <div>
      <ul>
        {Object.keys(_options).map((key, index) => (
          <li key={index}>
            {key} {_options[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}
