import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { getList } from "./../functions/axiosFunctions";

export default function QuestionList() {
  const [listInfo, setListInfo] = useState([]);
  useEffect(() => {
    listResponse();
  }, []);

  const listResponse = async () => {
    const response = await getList();
    setListInfo(response);
    console.log(response);
  };

  return (
    <div>
      <ul id="ul">
        {listInfo.map((list) => (
          <li>{list.name}</li>
        ))}
      </ul>
    </div>
  );
}
