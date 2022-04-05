import React, { useState } from "react";
import {} from "react/cjs/react.production.min";
import { createList } from "../functions/axiosFunctions";

export default function CreateListPopup({ onCreate }) {
  const [listName, setlistName] = useState("");
  const addCreateList = async () => {
    const response = await createList(listName);
    onCreate();
  };
  return (
    <div>
      <input placeholder="List Name" onChange={(e) => setlistName(e.target.value)}></input>
      <button onClick={() => addCreateList()}>Done</button>
    </div>
  );
}
