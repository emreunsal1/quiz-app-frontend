import React, { useState, useEffect } from "react";
import { createList } from "../functions/axiosFunctions";
import { Input, Button, Modal, Popover } from "antd";

export default function CreateListPopup({ setPopup, popupOnCreate }) {
  const [listName, setlistName] = useState("");
  const [listDescription, setListDescription] = useState("Description");
  const [popOver, setPopOver] = useState(false);
  const addCreateList = async () => {
    const response = await createList(listName, listDescription);
    popupOnCreate(response);
    setPopOver(true);
  };
  useEffect(() => {
    if (popOver) {
      setTimeout(() => {
        setPopOver(false);
      }, 2000);
    }
  }, [popOver]);

  return (
    <div>
      <Modal
        visible={true}
        onCancel={() => setPopup(false)}
        title="Add New List"
        footer={[
          <Button key="back" onClick={() => setPopup(false)}>
            Cancel
          </Button>,
          <Popover content={"Completed"} title="Title" trigger="click" visible={popOver} placement={"bottomLeft"}>
            <Button type="primary" onClick={() => addCreateList()}>
              Add
            </Button>
          </Popover>,
        ]}
      >
        <Input placeholder="List Name" style={{ marginBottom: "10px" }} onChange={(e) => setlistName(e.target.value)}></Input>
        <Input value={listDescription} onChange={(e) => setListDescription(e.target.value)}></Input>
      </Modal>
    </div>
  );
}
