import React, { useState, useEffect } from "react";
import { getList } from "../functions/axiosFunctions";
import CreateListPopup from "./CreateListPopup";
import ListCard from "./ListCard";

export default function QuestionList() {
  const [listInfo, setListInfo] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  useEffect(() => {
    listResponse();
  }, []);

  const listResponse = async () => {
    const response = await getList();
    setListInfo(response);
  };

  return (
    <div>
      <ul id="ul">
        {listInfo.map((list, index) => (
          <ListCard key={index} list={list} />
        ))}
        <li onClick={() => setIsPopup(true)}>Add Create List</li>
      </ul>
      <div className="createPopup">{isPopup && <CreateListPopup renderList={listResponse} />}</div>
    </div>
  );
}
