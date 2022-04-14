import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Button, Card, Checkbox, Input, Space } from "antd";
import { EditOutlined, DeleteOutlined, SaveTwoTone } from "@ant-design/icons";
import { deleteListToDatabase, editListInfo } from "./../functions/axiosFunctions";

const { Meta } = Card;

export default function ListCard({ list, setDeleteList, deleteList, refreshList }) {
  const [isEdit, setIsEdit] = useState(false);
  const [listTitle, setListTitle] = useState(list.name);
  const [listDescription, setListDescription] = useState(list.description);
  const history = useHistory();

  const addDeleteList = (e) => {
    if (e.target.checked) {
      return setDeleteList([...deleteList, list._id]);
    }
    const removeList = deleteList.filter((id) => id !== list._id);
    return setDeleteList(removeList);
  };

  const updateListInfo = async () => {
    await editListInfo(list._id, listTitle, listDescription);
    setIsEdit(false);
  };

  return (
    <div>
      <div className="card">
        <Card
          style={{ width: 300 }}
          cover={
            <img
              style={{ cursor: "pointer" }}
              alt="example"
              src="/image/card.jpg"
              onClick={() => {
                history.push(`/admin/questions/${list._id}`);
              }}
            />
          }
          actions={[
            <Checkbox onChange={addDeleteList}></Checkbox>,
            isEdit ? <SaveTwoTone key="save" onClick={updateListInfo} /> : <EditOutlined key="edit" onClick={() => setIsEdit(true)} />,

            <DeleteOutlined
              style={{ color: "red" }}
              key="delete"
              onClick={async () => {
                await deleteListToDatabase(list._id);
                refreshList();
              }}
            />,
          ]}
        >
          {!isEdit && (
            <Meta
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(`/admin/questions/${list._id}`);
              }}
              title={listTitle}
              description={listDescription}
            />
          )}
          {isEdit && (
            <div>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input placeholder="Title" style={{ width: "100%" }} value={listTitle} onChange={(e) => setListTitle(e.target.value)} />
                <Input placeholder="Title" value={listDescription} onChange={(e) => setListDescription(e.target.value)} />
              </Space>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
