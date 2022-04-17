import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Button, Card, Checkbox, Input, Space, Col } from "antd";
import { EditOutlined, DeleteOutlined, SaveTwoTone, PlayCircleTwoTone } from "@ant-design/icons";
import { deleteListToDatabase, editListInfo } from "./../functions/axiosFunctions";

const { Meta } = Card;
export default function ListCard({ list, setDeleteList, deleteList, onOpenSelect, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [listTitle, setListTitle] = useState(list.name);
  const [listDescription, setListDescription] = useState(list.description);
  const [oldStates, setOldStates] = useState({ listTitle, listDescription });
  const history = useHistory();

  useEffect(() => {
    setListTitle(list.name);
    setListDescription(list.description);
  }, [list]);

  const addDeleteList = (e) => {
    if (e.target.checked) {
      return setDeleteList([...deleteList, list._id]);
    }
    const removeList = deleteList.filter((id) => id !== list._id);
    return setDeleteList(removeList);
  };

  const updateListInfo = async () => {
    await editListInfo(list._id, listTitle, listDescription);
    setOldStates({ listTitle, listDescription });
    setIsEdit(false);
  };

  const isChanged = listTitle !== oldStates.listTitle || listDescription !== oldStates.listDescription;

  return (
    <Col className="gutter-row" span={8}>
      <div>
        <div className="card">
          <Card
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
              onOpenSelect ? (
                <Checkbox onChange={addDeleteList}></Checkbox>
              ) : (
                <PlayCircleTwoTone onClick={() => history.push(`/quiz/${list._id}`)} />
              ),
              isEdit ? (
                <SaveTwoTone
                  key="save"
                  style={{ cursor: isChanged ? "pointer" : "cancel" }}
                  twoToneColor={isChanged ? null : "#b1b1b1"}
                  onClick={isChanged ? updateListInfo : () => {}}
                />
              ) : (
                <EditOutlined key="edit" onClick={() => setIsEdit(true)} />
              ),

              <DeleteOutlined
                style={{ color: "red" }}
                key="delete"
                onClick={() => {
                  const isOkay = confirm("Are you sure about deleting this list?");
                  if (isOkay) {
                    deleteListToDatabase(list._id);
                    onDelete(list._id);
                  }
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
    </Col>
  );
}
