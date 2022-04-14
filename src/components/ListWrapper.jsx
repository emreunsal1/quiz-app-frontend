import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getList } from "../functions/axiosFunctions";
import CreateListPopup from "./CreateListPopup";
import ListCard from "./ListCard";
import { deleteListToDatabase } from "./../functions/axiosFunctions";

export default function QuestionList() {
  const [listInfo, setListInfo] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  useEffect(() => {
    refreshList();
    const socket = io("ws://localhost:3001");
  }, []);

  const refreshList = async () => {
    console.log("çalıştı ");
    const response = await getList();
    setListInfo(response);
  };

  const deleteSelected = async () => {
    if (deleteList.length > 0) {
      await deleteListToDatabase(deleteList);
    }
    refreshList();
    setDeleteList([]);
  };

  return (
    <div>
      <div onClick={() => setIsPopup(true)}>Add Create List</div>
      {deleteList.length > 0 && <button onClick={() => deleteSelected()}>Sil</button>}
      <ul id="ul">
        {listInfo.map((list, index) => (
          <ListCard key={index} list={list} setDeleteList={setDeleteList} refreshList={refreshList} deleteList={deleteList} />
        ))}
      </ul>
      <div className="createPopup">{isPopup && <CreateListPopup onCreate={refreshList} popup={setIsPopup} />}</div>
    </div>
  );
}
