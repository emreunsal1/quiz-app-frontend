import React from "react";

export default function QuestionsCard({ question }) {
  return (
    <div>
      <li>{question.question}</li>
    </div>
  );
}
