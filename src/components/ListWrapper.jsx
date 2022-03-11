import React, { useState, useEffect } from "react";
import { getList } from "../functions/axiosFunctions";
import CreateListPopup from "./CreateListPopup";
import ListCard from "./ListCard";
import { deleteListToDatabase } from "./../functions/axiosFunctions";

export default function QuestionList() {
  const [listInfo, setListInfo] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  useEffect(() => {
    listResponse();
  }, []);
  useEffect(() => {
    console.log(deleteList);
  }, [deleteList]);

  const listResponse = async () => {
    const response = await getList();
    setListInfo(response);
  };

  const deleteSelected = async () => {
    console.log(deleteList);
    const respnose = await deleteListToDatabase(deleteList);
  };

  return (
    <div>
      <button onClick={() => deleteSelected()}>Sil</button>
      <ul id="ul">
        {listInfo.map((list, index) => (
          <ListCard key={index} list={list} setDeleteList={setDeleteList} deleteList={deleteList} />
        ))}
        <li onClick={() => setIsPopup(true)}>Add Create List</li>
      </ul>
      <div className="createPopup">{isPopup && <CreateListPopup renderList={listResponse} />}</div>
    </div>
  );
}
