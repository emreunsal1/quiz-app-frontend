import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getList } from "../functions/axiosFunctions";
import CreateListPopup from "./CreateListPopup";
import ListCard from "./ListCard";
import { deleteListToDatabase } from "./../functions/axiosFunctions";
import { loginSocket } from "./../functions/socketFunctions";

export default function QuestionList() {
  const [listInfo, setListInfo] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  useEffect(() => {
    listResponse();
    const socket = io("ws://localhost:3001");
    socket.on("ahmet", (data) => console.log(data));
  }, []);

  const listResponse = async () => {
    const response = await getList();
    setListInfo(response);
  };

  const deleteSelected = async () => {
    await deleteListToDatabase(deleteList);
    listResponse();
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
      <div className="createPopup">{isPopup && <CreateListPopup onCreate={listResponse} />}</div>
    </div>
  );
}
