import React, { useState } from "react";
import {} from "react/cjs/react.production.min";
import { createList } from "../functions/axiosFunctions";

export default function CreateListPopup({ onCreate, popup }) {
  const [listName, setlistName] = useState("");
  const [listDescription, setListDescription] = useState("Description");
  const addCreateList = async () => {
    const response = await createList(listName, listDescription);
    onCreate();
    popup(false);
  };
  return (
    <div>
      <input placeholder="List Name" onChange={(e) => setlistName(e.target.value)}></input>
      <input value={listDescription} onChange={(e) => setListDescription(e.target.value)}></input>
      <button onClick={() => addCreateList()}>Done</button>
    </div>
  );
}
