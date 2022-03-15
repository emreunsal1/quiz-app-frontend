import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ListCard({ list, setDeleteList, deleteList }) {
  const history = useHistory();
  const addDeleteList = (e) => {
    if (e.target.checked) {
      return setDeleteList([...deleteList, list._id]);
    }
    const removeList = deleteList.filter((id) => id !== list._id);
    return setDeleteList(removeList);
  };

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
        <input type={"checkbox"} onChange={addDeleteList} />
      </li>
    </div>
  );
}
