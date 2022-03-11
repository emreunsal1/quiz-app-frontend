import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ListCard({ list, setDeleteList, deleteList }) {
  const addDeleteList = () => {
    const isOnTheList = deleteList.filter((id) => {
      if (id === list._id) {
        return list._id;
      }
    });
    console.log(isOnTheList);
    if (isOnTheList.length === 0) {
      return setDeleteList([...deleteList, list._id]);
    }
    console.log("burada");
    const removeList = deleteList.filter((id) => id !== list._id);
    return setDeleteList(removeList);
  };
  const history = useHistory();
  return (
    <div>
      <li
        onClick={() => {
          history.push(`/admin/questions/${list._id}`);
        }}
      >
        {list.name}
      </li>
      <li>
        <input
          type={"checkbox"}
          onChange={() => {
            addDeleteList();
          }}
        />
      </li>
    </div>
  );
}
