import React from "react";
import { useHistory } from "react-router-dom";

export default function ListCard({ list }) {
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
    </div>
  );
}
