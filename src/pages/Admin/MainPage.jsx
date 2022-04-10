import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import QuestionList from "./../../components/ListWrapper";

export default function MainPage() {
  return (
    <div>
      <Header />
      <QuestionList />
    </div>
  );
}
